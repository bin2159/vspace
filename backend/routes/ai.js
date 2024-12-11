const express = require('express');
const router = express.Router()
const geminiController = async (req, res) => {
  try {
    // Extract prompt from request body
    const { prompt } = req.body;
    const { gemini } = req.ai
    // Validate prompt
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Select the model (you can change to other Gemini models)
    const model = gemini.getGenerativeModel({ model: "gemini-pro"});

    // Send prompt to Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Send back the AI's response
    res.json({
      success: true,
      response: text
    });

  } catch (error) {
    console.error('Error processing Gemini request:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to process request'
    });
  }
};


const openAiController = (req, res) => {
  res.send('Response from OpenAI');
};

const defaultAiController = (req, res) => {
  res.send(`Response from ${req.params.ai} AI`);
};
router.post('/:ai', (req, res, next) => {
  const { ai } = req.params;

  switch (ai.toLowerCase()) {
    case 'gemini':
      geminiController(req, res);
      break;
    case 'openai':
      openAiController(req, res);
      break;
    default:
      defaultAiController(req, res);
      break;
  }
});

module.exports = router;