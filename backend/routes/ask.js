import express from 'express'
import AIController from '../controller/ai.js'
const router = express.Router()

const defaultAiController = (req, res) => {
  res.send(`Response from ${req.params.ai} AI`);
};
router.post('/ask', (req, res, next) => {
  const ai = new AIController()
  const { ai:selectedAi} = req.body;
  switch (selectedAi.toLowerCase()) {
    case 'gemini':
      ai.geminiController(req, res);
      break;
    case 'openai':
      ai.openAIController(req, res);
      break;
    case 'claude':
      ai.claudeController(req, res);
      break;
    default:
      defaultAiController(req, res);
      break;
  }
});

export default router