export const TWILIO_WHATSAPP_FROM = process.env.TWILIO_WHATSAPP_FROM!

export function twilioClient() {
  const twilio = require('twilio')
  return twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
}
