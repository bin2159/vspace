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


const claudeAiController = async (req, res) => {
  try {
    // Extract prompt from request body
    const { prompt } = req.body;
    const { claude } = req.ai;

    // Validate prompt
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Send prompt to Claude
    const response = await claude.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }]
    });

    // Send back the AI's response
    res.json({
      success: true,
      response: response.content[0].text.trim()
    });
  } catch (error) {
    console.error('Error processing Claude request:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to process request'
    });
  }
};
const openAiController = async (req, res) => {
  try {
    // Extract prompt from request body
    const { prompt } = req.body;
    const { openai } = req.ai;

    // Validate prompt
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Send prompt to OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    // Send back the AI's response
    res.json({
      success: true,
      response: completion.choices[0].message.content.trim()
    });
  } catch (error) {
    console.error('Error processing OpenAI request:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to process request'
    });
  }
};

const defaultAiController = (req, res) => {
  res.send(`Response from ${req.params.ai} AI`);
};
router.post('/ask', (req, res, next) => {
  const { ai } = req.body;

  switch (ai.toLowerCase()) {
    case 'gemini':
      geminiController(req, res);
      break;
    case 'openai':
      openAiController(req, res);
      break;
    case 'claude':
      claudeAiController(req, res);
      break;
    default:
      defaultAiController(req, res);
      break;
  }
});

module.exports = router;