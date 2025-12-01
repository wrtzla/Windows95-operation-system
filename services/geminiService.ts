import { GoogleGenAI } from "@google/genai";

// Initialize the client with the API key from environment variables
// The build process (Vite) will replace process.env.API_KEY with the actual value
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey: apiKey });

export const generateChatResponse = async (
  prompt: string, 
  history: { role: 'user' | 'model'; parts: { text: string }[] }[]
): Promise<string> => {
  // Check if API key is missing
  if (!apiKey) {
    return "Error: API_KEY is missing.\n\nIf you are running this on Vercel, go to Settings > Environment Variables and add a variable named 'API_KEY' with your Google Gemini API key.\n\nIf running locally, create a .env file with API_KEY=your_key_here.";
  }

  try {
    const model = 'gemini-2.5-flash';
    
    const chat = ai.chats.create({
      model: model,
      history: history,
      config: {
        systemInstruction: "You are an intelligent assistant running inside a Windows 95 simulation. Keep your answers concise, helpful, and occasionally make a retro computer reference.",
      }
    });

    const result = await chat.sendMessage({ message: prompt });
    return result.text || "Error: No response text generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: Unable to connect to the Gemini network service. Please check your network connection and API usage limits.";
  }
};