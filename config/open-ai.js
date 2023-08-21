import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';
dotenv.config();

// create config object
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// create api object
const openaiInstance = new OpenAIApi(configuration);

export default openaiInstance;
