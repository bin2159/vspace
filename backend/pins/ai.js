const {GoogleGenerativeAI} = require('@google/generative-ai');
const { OpenAI } = require("openai");
const { Anthropic } = require("@anthropic-ai/sdk");
require('dotenv').config();
const initAI = (req) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY');
  const openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || 'YOUR_GEMINI_API_KEY'})
  const claudeAI = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY || 'YOUR_GEMINI_API_KEY' })
  req.ai = {gemini: genAI, openai: openAI, claude: claudeAI}
}
module.exports = { initAI }