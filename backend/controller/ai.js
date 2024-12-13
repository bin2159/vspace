import axios from 'axios'
import { LlamaModel, LlamaContext, LlamaChatSession } from 'node-llama-cpp'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { OpenAI } from 'openai'
import { Anthropic } from '@anthropic-ai/sdk'
import dotenv from 'dotenv'
dotenv.config() // Activate dotenv configuration


class AIController {
  constructor() {
    // Gemini Configuration
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY');

    // OpenAI Configuration
    this.openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY' });

    // Claude Configuration
    this.claudeAI = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY || 'YOUR_CLAUDE_API_KEY' });

    // Hugging Face Configuration
    this.huggingFaceClient = axios.create({
      baseURL: 'https://api-inference.huggingface.co/models/',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    // Cohere Configuration
    this.cohereClient = axios.create({
      baseURL: 'https://api.cohere.ai/v1/',
      headers: {
        'Authorization': `Bearer ${process.env.COHERE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    // Llama 2 Local Configuration (self-hosted)
    this.llamaModel = null;
    this.llamaContext = null;
    this.llamaSession = null;
  }

  /**
   * Hugging Face Text Generation Controller
   */
  huggingFaceController = async (req, res) => {
    try {
      const { prompt, model = 'gpt2' } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      const response = await this.huggingFaceClient.post(`${model}`, {
        inputs: prompt,
        parameters: {
          max_new_tokens: 250,
          temperature: 0.7
        }
      });

      res.json({
        success: true,
        response: response.data[0]?.generated_text || response.data[0]
      });
    } catch (error) {
      console.error('Hugging Face Error:', error);
      res.status(500).json({
        success: false,
        error: error.response?.data || error.message
      });
    }
  };

  /**
   * Cohere Text Generation Controller
   */
  cohereController = async (req, res) => {
    try {
      const { prompt, model = 'command' } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      const response = await this.cohereClient.post('/generate', {
        model: model,
        prompt: prompt,
        max_tokens: 300,
        temperature: 0.7,
        k: 0,
        p: 0.75
      });

      res.json({
        success: true,
        response: response.data.generations[0].text.trim()
      });
    } catch (error) {
      console.error('Cohere Error:', error);
      res.status(500).json({
        success: false,
        error: error.response?.data || error.message
      });
    }
  };

  /**
   * Llama 2 Local Initialization
   * @param {string} modelPath - Path to Llama 2 model file
   */
  initializeLlama = async (modelPath) => {
    try {
      // Initialize Llama model (requires local model file)
      this.llamaModel = await LlamaModel.loadModel(modelPath);
      this.llamaContext = new LlamaContext(this.llamaModel);
      this.llamaSession = new LlamaChatSession(this.llamaContext);
      console.log('Llama 2 model initialized successfully');
    } catch (error) {
      console.error('Llama 2 Initialization Error:', error);
      throw error;
    }
  };

  /**
   * Llama 2 Local Text Generation Controller
   */
  llamaController = async (req, res) => {
    try {
      if (!this.llamaSession) {
        return res.status(500).json({
          error: 'Llama model not initialized. Call initializeLlama first.'
        });
      }

      const { prompt } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      const response = await this.llamaSession.prompt(prompt, {
        temperature: 0.7,
        maxTokens: 300
      });

      res.json({
        success: true,
        response: response.trim()
      });
    } catch (error) {
      console.error('Llama 2 Error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };

  /**
   * Gemini Text Generation Controller
   */
  geminiController = async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      req.logger.info('Gemini Request:', { prompt , text});
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

  /**
   * Claude Text Generation Controller
   */
  claudeController = async (req, res) => {
    try {
      const { prompt } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      const response = await this.claudeAI.messages.create({
        model: "claude-3-haiku-20240307",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }]
      });

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

  /**
   * OpenAI Text Generation Controller
   */
  openAIController = async (req, res) => {
    try {
      const { prompt } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      const completion = await this.openAI.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      });

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

  /**
   * Unified AI Generation Router
   */
  unifiedAIController = async (req, res) => {
    const { provider = 'huggingface', prompt } = req.body;

    try {
      switch(provider.toLowerCase()) {
        case 'huggingface':
          return this.huggingFaceController(req, res);
        case 'cohere':
          return this.cohereController(req, res);
        case 'llama':
          return this.llamaController(req, res);
        case 'gemini':
          return this.geminiController(req, res);
        case 'claude':
          return this.claudeController(req, res);
        case 'openai':
          return this.openAIController(req, res);
        default:
          return res.status(400).json({
            error: 'Invalid AI provider. Choose from: huggingface, cohere, llama, gemini, claude, or openai'
          });
      }
    } catch (error) {
      console.error('Unified AI Error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };
}

export default AIController;