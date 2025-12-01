
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

export const generateWebPage = async (url: string): Promise<string> => {
  if (!apiKey) {
    return "<h1 style='color: red; font-family: sans-serif; text-align: center;'>Error: API_KEY Missing</h1><p align='center'>Please configure your Gemini API Key to browse the simulated web.</p>";
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `You are a web server from 1995. The user is requesting the URL: "${url}".
    
    If the URL looks like a search query or a question, treat it as a search engine result page.
    If it is a specific domain (e.g. microsoft.com, apple.com), generate a fictional 1990s version of that homepage.
    
    Rules:
    1. Output ONLY valid HTML code for the content of the <body> tag. Do NOT include <head>, <body>, or <html> tags.
    2. Use inline CSS styles for a retro 90s look (bright colors, basic fonts like Times New Roman or Courier).
    3. Use <center>, <marquee>, <blink>, <hr>, and <table> tags freely.
    4. Make it fun and nostalgic.
    5. Ensure all links <a href="..."> just point to "#" or fake relative paths.
    6. If it's a search, list 3-5 fictional 90s-themed results.
    
    Generate the HTML now.`;

    const result = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    
    return result.text || "<center><h1>404 Not Found</h1><p>The server did not respond.</p></center>";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "<center><h1>Connection Error</h1><p>Could not dial into the host.</p></center>";
  }
};