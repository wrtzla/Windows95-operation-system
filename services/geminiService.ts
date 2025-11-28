import { GoogleGenAI } from "@google/genai";

// Initialize the client with the API key from environment variables
// Note: In a real production app, ensure this is handled securely.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateChatResponse = async (
  prompt: string, 
  history: { role: 'user' | 'model'; parts: { text: string }[] }[]
): Promise<string> => {
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
    return "Error: Unable to connect to the Gemini network service.";
  }
};