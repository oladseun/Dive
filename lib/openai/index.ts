import OpenAI from 'openai'

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const MODEL_CHAT = 'gpt-4o-mini'
export const MODEL_GENERATION = 'gpt-4o'

export const MAX_TOKENS = {
  companionChat: 500,
  essayOutline: 1000,
  essayReview: 2000,
} as const
