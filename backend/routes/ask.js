import express from 'express'
import AIController from '../controller/ai.js'
const router = express.Router()

const defaultAiController = (req, res) => {
  res.send(`Response from ${req.params.ai} AI`);
};
router.post('/ask',async (req, res, next) => {
  const ai = new AIController()
  const { ai:selectedAi} = req.body;
  let result = ''
  switch (selectedAi.toLowerCase()) {
    case 'gemini':
      result = await ai.geminiController(req, res);
      break;
    case 'openai':
      result = await ai.openAIController(req, res);
      break;
    case 'claude':
      result = await ai.claudeController(req, res);
      break;
    default:
      defaultAiController(req, res);
      break;
  }
  if(result.success === false){
    res.status(500).json(result)
  }
  res.json(result)
});

export default router