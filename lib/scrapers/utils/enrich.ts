import { getOpenAI, MODEL_CHAT } from '@/lib/openai'

export interface EnrichedData {
  tags: string[]
  requirements: string[]
  deadline: string | null
  region: string
  scamScore?: number
}

export async function enrichOpportunity(title: string, description: string): Promise<EnrichedData> {
  const openai = getOpenAI()
  if (!openai) {
    return fallbackEnrichment(title, description)
  }

  const prompt = `
    Extract structured data from the following scholarship/grant opportunity for students.
    
    Title: ${title}
    Description: ${description}
    
    Return a JSON object with:
    - tags: string[] (Strictly 3 tags: [Opportunity Type, Target Location, Major Keyword]. Example: ["Scholarship", "Global", "STEM"])
    - requirements: string[] (Max 5 most critical eligibility requirements as short clear sentences)
    - deadline: string | null (ISO 8601 format if found, otherwise null)
    - region: string (The specific primary region, e.g., "Nigeria", "USA", "Global")
    - scamScore: number (Score 0-10 on how likely it is to be a scam. 10 = definitely a scam. Look out for upfront application fees, generic @gmail.com emails, or unrealistic promises)
    
    Format the response as pure JSON.
  `

  try {
    const response = await openai.chat.completions.create({
      model: MODEL_CHAT,
      messages: [
        { role: 'system', content: 'You are a data extraction assistant for an educational opportunity platform. Always return valid JSON.' },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' },
    })

    const content = response.choices[0].message.content
    if (!content) throw new Error('Empty response from AI')

    const data = JSON.parse(content) as EnrichedData
    
    // Ensure tags are cleaned (remove # if AI added them)
    data.tags = data.tags.map(t => t.replace(/^#/, ''))
    
    return data
  } catch (error) {
    console.error('Error enriching opportunity with AI:', error)
    return fallbackEnrichment(title, description)
  }
}

function fallbackEnrichment(title: string, description: string): EnrichedData {
  const text = (title + ' ' + description).toLowerCase()
  const tags: string[] = []
  
  if (text.includes('stem') || text.includes('science') || text.includes('technology')) tags.push('#STEM')
  if (text.includes('nigeria')) tags.push('#Nigeria')
  if (text.includes('undergraduate') || text.includes('bachelor')) tags.push('#Undergraduate')
  if (text.includes('postgraduate') || text.includes('master') || text.includes('phd')) tags.push('#Postgraduate')
  if (text.includes('fully funded') || text.includes('full funding')) tags.push('#FullFunding')

  return {
    tags,
    requirements: ['Refer to source for full requirements.'],
    deadline: null,
    region: text.includes('nigeria') ? 'Nigeria' : 'Global',
    scamScore: 0,
  }
}
