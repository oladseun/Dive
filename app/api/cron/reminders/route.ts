import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { generateIcsString } from "@/lib/calendar";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    // 1. Verify authorization (optional but recommended for cron jobs)
    const authHeader = request.headers.get("authorization");
    if (
      process.env.CRON_SECRET &&
      authHeader !== `Bearer ${process.env.CRON_SECRET}`
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    // Use the service role key to intelligently query across users in backgrounds jobs
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const resend = new Resend(process.env.RESEND_API_KEY);

    // 2. Find opportunities with deadlines exactly 3 days from now
    const today = new Date();
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(today.getDate() + 3);
    const threeDaysStr = threeDaysFromNow.toISOString().split("T")[0]; // YYYY-MM-DD

    const { data: opportunities, error: oppError } = await supabase
      .from("opportunities")
      .select("*")
      .eq('is_active', true)
      .not("deadline", "is", null);

    if (oppError) throw oppError;

    // Filter to those due roughly in 3 days
    const upcomingOpps = opportunities.filter((opp: any) => {
      const oppDate = new Date(opp.deadline).toISOString().split("T")[0];
      return oppDate === threeDaysStr;
    });

    if (upcomingOpps.length === 0) {
      return NextResponse.json({ message: "No upcoming deadlines in 3 days." });
    }

    let emailsSent = 0;

    // 3. For each upcoming opportunity, find users who saved it
    for (const opp of upcomingOpps) {
      const { data: savedOpps } = await supabase
        .from("saved_opportunities")
        .select("user_id")
        .eq("opportunity_id", opp.id);

      if (!savedOpps || savedOpps.length === 0) continue;

      for (const saved of savedOpps) {
        const userId = saved.user_id;

        // 4. Check if they have completed all tasks for this opportunity
        const { data: tasks } = await supabase
          .from("tasks")
          .select("*")
          .eq("opportunity_id", opp.id)
          .eq("user_id", userId);

        if (!tasks || tasks.length === 0) continue;

        const isFullyComplete = tasks.every((task: any) => task.is_complete);

        if (!isFullyComplete) {
          // 5. Retrieve user email
          const { data: user } = await supabase
            .from("users")
            .select("email, name")
            .eq("id", userId)
            .single();

          if (!user?.email) continue;

          // 6. Generate ICS Attachment Content
          const icsContent = generateIcsString({
            title: `Deadline: ${opp.title}`,
            description: `Don't forget to submit your application for ${opp.title} on Dive Workspace!`,
            date: new Date(opp.deadline),
          });

          // 7. Send Reminder Email
          if (process.env.RESEND_API_KEY) {
            await resend.emails.send({
              from: "Dive Flight Ops <onboarding@resend.dev>", // Replace with verified domain in production
              to: [user.email],
              subject: `Action Required: 3 Days left for ${opp.title}`,
              html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                  <h2>Final Deadline Approaching! 🚀</h2>
                  <p>Hi ${user.name || 'there'},</p>
                  <p>The deadline for <strong>${opp.title}</strong> is exactly 3 days away!</p>
                  <p>Our records show that you haven't ticked off all your application tasks yet. Now is the perfect time to finalize your documents, tie up any loose ends, and submit!</p>
                  <p>I've attached a calendar invite to this email so you don't miss the launch window.</p>
                  <br/>
                  <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3002'}/dashboard/roadmaps/${opp.id}" 
                     style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                    Review Your Roadmap
                  </a>
                  <br/><br/>
                  <p style="font-size: 12px; color: #666;">- The Dive Platform Tracker</p>
                </div>
              `,
              attachments: [
                {
                  filename: "deadline_reminder.ics",
                  content: Buffer.from(icsContent) as any,
                },
              ],
            });
            emailsSent++;
          }
        }
      }
    }

    return NextResponse.json({ message: "Cron executed successfully", emailsSent });
  } catch (error: any) {
    console.error("Cron Reminder Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
