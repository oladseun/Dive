import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Vercel cron configuration (e.g. daily at 8AM)
// vercel.json: { "crons": [{ "path": "/api/cron/reminders", "schedule": "0 8 * * *" }] }

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy');

export async function GET(request: Request) {
  // Validate cron secret to prevent unauthorized access
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}` && process.env.NODE_ENV === 'production') {
    return new Response('Unauthorized', { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // Must use service role to bypass RLS
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // 1. Fetch upcoming tasks (due in the next 7 days) that are NOT complete
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    const { data: tasks, error: tasksError } = await supabase
      .from('tasks')
      .select('id, title, due_date, opportunity_id, user_id')
      .eq('is_complete', false)
      .gte('due_date', today.toISOString())
      .lte('due_date', nextWeek.toISOString());

    if (tasksError) throw tasksError;

    const sentReminders = [];

    // Group tasks by user to minimize queries (simplified for MVP)
    for (const task of tasks || []) {
      // 2. Fetch user notification preferences
      const { data: user } = await supabase
        .from('users')
        .select('email, name, notification_pref, whatsapp_number, tier')
        .eq('id', task.user_id)
        .single();

      if (!user) continue;

      const pref = user.notification_pref;
      if (pref === 'none') continue;

      const daysUntilDue = Math.ceil((new Date(task.due_date).getTime() - today.getTime()) / (1000 * 3600 * 24));
      
      // Only remind on specific days (7 days, 3 days, 1 day)
      if (![7, 3, 1].includes(daysUntilDue)) continue;

      // 3. Send Email if preference allows
      if (pref === 'email' || pref === 'both') {
        if (process.env.RESEND_API_KEY) {
          await resend.emails.send({
            from: 'Dive Reminders <reminders@dive.so>',
            to: user.email,
            subject: `Action Required: "${task.title}" is due in ${daysUntilDue} days!`,
            html: `
              <h2>Hello ${user.name},</h2>
              <p>This is a reminder that your task <strong>${task.title}</strong> is due on ${new Date(task.due_date).toLocaleDateString()}.</p>
              <p>Log in to your Dive workspace to complete it.</p>
              <br/>
              <p>Happy Applying,<br/>The Dive Team</p>
            `,
          });
          sentReminders.push({ type: 'email', userId: user.email, task: task.title });
        } else {
          console.log(`[DRY RUN] Would send email to ${user.email} for task: ${task.title}`);
        }
      }

      // 4. Send WhatsApp if preference allows (Mocked for MVP)
      if (user.tier === 'pro' && (pref === 'whatsapp' || pref === 'both')) {
        if (user.whatsapp_number) {
          console.log(`[WHATSAPP MOCK] Sending WhatsApp to ${user.whatsapp_number}: "Task ${task.title} due in ${daysUntilDue} days!"`);
          sentReminders.push({ type: 'whatsapp', userId: user.whatsapp_number, task: task.title });
        }
      }
    }

    return NextResponse.json({ success: true, processed: tasks?.length || 0, sent: sentReminders.length, log: sentReminders });
  } catch (error: any) {
    console.error('Cron Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
