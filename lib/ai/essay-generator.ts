export async function generateEssayDraft(taskTitle: string, opportunity: any, userProfile: any) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000))

  const titleLower = taskTitle.toLowerCase()
  const isEssay = titleLower.includes('essay') || titleLower.includes('statement') || titleLower.includes('proposal')
  
  if (isEssay) {
    return `# 📝 Draft: ${taskTitle}

**Target:** ${opportunity?.title || 'Opportunity'}
**Applicant:** ${userProfile?.name || 'Applicant'} (${userProfile?.education_level || 'Student'}, ${userProfile?.country || 'Global'})

---

## 1. Introduction (The Hook)
*Start with a compelling story that connects your background in ${userProfile?.interest_tags?.[0] || 'your field'} to the core mission of this ${opportunity?.type || 'opportunity'}.*
- Highlight a key moment that sparked your interest.
- State clearly why you are applying.

## 2. Academic & Professional Journey
*Explain how your experience has prepared you for this.*
- Discuss your time studying/working in ${userProfile?.country || 'your region'}.
- Mention a specific challenge you overcame.

## 3. The "Why this ${opportunity?.type || 'opportunity'}?" Section
*This is crucial. The reviewers want to know why YOU are a fit for THEM.*
- Align your goals with their requirements: ${Array.isArray(opportunity?.requirements) ? opportunity.requirements[0] : 'innovation and leadership'}.
- Detail how the funding/network will accelerate your career.

## 4. Conclusion & Future Impact
*Leave a lasting impression.*
- Summarize your long-term vision.
- End with a strong closing statement about your commitment to giving back.

---
💡 *AI Tip: Don't forget to review the specific guidelines on the opportunity's official page before finalizing!*
`
  } else {
    return `Subject: Recommendation Request - ${opportunity?.title || 'Opportunity'}

Dear [Professor/Manager Name],

I hope this email finds you well.

I am writing to you because I am currently applying for the **${opportunity?.title || 'Opportunity'}** and I am gathering my application materials. Given our work together on [Project/Class Name], I was hoping you might be willing to write a strong letter of recommendation on my behalf.

This ${opportunity?.type || 'opportunity'} is particularly important to me because [insert short reason related to your goals in ${userProfile?.interest_tags?.[0] || 'your field'}].

The deadline for submission is **${opportunity?.deadline ? new Date(opportunity.deadline).toLocaleDateString() : 'coming up soon'}**. 

I have attached my current resume and a brief outline of the key points the selection committee is looking for. Please let me know if you would be comfortable supporting my application. I completely understand if you do not have the time right now.

Thank you so much for your time and guidance!

Best regards,
${userProfile?.name || 'Your Name'}
`
  }
}
