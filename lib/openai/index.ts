import OpenAI from 'openai'

let openaiInstance: OpenAI | null = null

export function getOpenAI() {
  if (!process.env.OPENAI_API_KEY) return null
  
  if (!openaiInstance) {
    openaiInstance = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  }
  return openaiInstance
}

export const MODEL_CHAT = 'gpt-4o-mini'
export const MODEL_GENERATION = 'gpt-4o'

export const MAX_TOKENS = {
  companionChat: 500,
  essayOutline: 1000,
  essayReview: 2000,
} as const
