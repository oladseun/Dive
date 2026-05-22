export interface TargetedTask {
  title: string;
  day_number: number;
  notes?: string;
  link_url?: string;
}

/**
 * Mock AI Engine that reads an opportunity and generates targeted tasks.
 * In a real scenario, this would send a prompt to OpenAI/Gemini with the opportunity JSON
 * and request a structured JSON response of tasks.
 */
export async function generateTargetedTasks(opportunity: any): Promise<TargetedTask[]> {
  // Simulate AI delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const type = opportunity.type?.toLowerCase() || '';
  const requirements = opportunity.requirements || [];
  const reqText = requirements.join(' ').toLowerCase();

  // Base targeted tasks
  const tasks: TargetedTask[] = [];

  // Day 1: Targeted Analysis
  tasks.push({
    title: `Analyze ${opportunity.title} specific constraints`,
    day_number: 1,
    notes: `AI Note: This is a ${opportunity.type}. Focus your analysis on what makes this unique compared to standard applications.`,
  });

  // Dynamic additions based on Opportunity Type
  if (type.includes('scholarship')) {
    tasks.push({
      title: "Request Official Academic Transcripts",
      day_number: 2,
      notes: "AI Note: Universities typically take 3-5 days to process transcript requests. Do this immediately.",
    });
    tasks.push({
      title: "Draft Academic Statement of Purpose",
      day_number: 4,
      notes: "AI Note: Focus on your academic trajectory and how this scholarship bridges the gap.",
    });
  } else if (type.includes('grant')) {
    tasks.push({
      title: "Develop Initial Budget Proposal",
      day_number: 2,
      notes: "AI Note: Grants are heavily focused on ROI. Ensure your budget explicitly breaks down cost vs impact.",
    });
    tasks.push({
      title: "Draft Project Implementation Timeline",
      day_number: 4,
      notes: "AI Note: Grant committees want to see a realistic execution plan.",
    });
  } else if (type.includes('fellowship')) {
    tasks.push({
      title: "Define Leadership Impact Narrative",
      day_number: 2,
      notes: "AI Note: Fellowships look for future leaders. Frame your past experiences around community impact.",
    });
    tasks.push({
      title: "Gather Endorsement Letters from Mentors",
      day_number: 4,
      notes: "AI Note: Fellowship recommendations should focus on your character and leadership, not just academics.",
    });
  } else {
    // Fallback targeted tasks
    tasks.push({
      title: "Identify Core Narrative for Application",
      day_number: 2,
    });
    tasks.push({
      title: "Gather Required Supporting Documents",
      day_number: 4,
    });
  }

  // Dynamic additions based on Requirements Content
  if (reqText.includes('portfolio') || reqText.includes('github')) {
    tasks.push({
      title: "Compile and Refine Portfolio/GitHub",
      day_number: 6,
      notes: "AI Note: Ensure your best 3 projects are pinned and have clean README files.",
      link_url: "https://github.com",
    });
  }

  if (reqText.includes('video') || reqText.includes('pitch')) {
    tasks.push({
      title: "Script and Record Video Pitch",
      day_number: 7,
      notes: "AI Note: Keep it under 2 minutes. Good lighting and clear audio are more important than 4K video.",
    });
  }

  if (reqText.includes('recommendation') || reqText.includes('reference')) {
    tasks.push({
      title: "Send Follow-up to Recommenders",
      day_number: 9,
      notes: "AI Note: A polite nudge 5 days before the deadline increases completion rate by 80%.",
    });
  }

  // Final Steps
  tasks.push({
    title: "Peer Review and Proofreading",
    day_number: 12,
    notes: "AI Note: Have someone outside your field read the essay to ensure clarity.",
  });

  tasks.push({
    title: "Final Submission and Confirmation",
    day_number: 14,
    notes: "AI Note: Submit at least 24 hours before the deadline to avoid server crash issues.",
  });

  return tasks;
}
