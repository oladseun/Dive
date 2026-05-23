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

export async function reviewDocumentWithAI(documentText: string, opportunity: any, userProfile: any) {
  await new Promise(resolve => setTimeout(resolve, 2000))

  if (!documentText || documentText.trim().length === 0) {
    return "❌ Please paste the text of your document so I can review it."
  }

  return `### 🤖 AI Document Review

I've analyzed your document against the requirements for **${opportunity?.title || 'this opportunity'}**.

#### ✅ Strengths
- Your document aligns well with the general focus area of ${userProfile?.interest_tags?.[0] || 'your field'}.
- The format appears clean and readable.

#### ⚠️ Areas for Improvement
- **Specific Requirement Missing:** The opportunity mentions "${Array.isArray(opportunity?.requirements) ? opportunity.requirements[0] : 'demonstrated leadership'}", but this is not strongly highlighted in your text. Consider adding a dedicated section or bullet point addressing this.
- **Tone Check:** Ensure that your tone is confident but not boastful. Some phrases could be quantified (e.g., instead of "improved sales", use "improved sales by 20%").

*Disclaimer: This is an AI-generated review. Always double-check with a human mentor before final submission!*`
}

export async function getTaskAdvice(taskTitle: string, opportunity: any) {
  await new Promise(resolve => setTimeout(resolve, 1500))

  return `### 💡 AI Advice: ${taskTitle}

Here is a step-by-step guide to help you complete this task effectively for **${opportunity?.title || 'this opportunity'}**:

1. **Understand the Goal:** Read the official guidelines to see exactly what they expect for "${taskTitle}".
2. **Prepare Early:** Don't wait until the deadline (${opportunity?.deadline ? new Date(opportunity.deadline).toLocaleDateString() : 'which might be soon'}). 
3. **Double Check:** Make sure any related files are saved in PDF format unless otherwise specified.
4. **Final Step:** Mark this task as complete once you've thoroughly reviewed it.

*Need more help? Break this task down into smaller sub-tasks and tackle them one by one!*`
}
