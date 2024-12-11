const {GoogleGenerativeAI} = require('@google/generative-ai');
require('dotenv').config();
const attachAI = (req) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY');
  req.ai = {gemini: genAI}
}
module.exports = { attachAI }