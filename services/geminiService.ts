
import { GoogleGenAI } from "@google/genai";

// FIX: Aligned with coding guidelines. Removed API key null checks, fallback key,
// and redundant checks within the getAIResponse function. The API key is
// assumed to be provided via environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = "Você é um assistente financeiro especialista em estratégias para ganhar dinheiro. Sua única função é fornecer conselhos, dicas e estratégias sobre como aumentar a renda e ganhar mais dinheiro. Se o usuário perguntar sobre qualquer outro tópico que não seja finanças ou ganhar dinheiro, recuse educadamente e lembre-o de que você só pode discutir sobre o tema. Seja direto e prestativo em suas respostas sobre finanças.";

export const getAIResponse = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "Desculpe, não consegui processar sua solicitação no momento. Tente novamente mais tarde.";
  }
};
