import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION_CHAT, SYSTEM_INSTRUCTION_WIFI, SYSTEM_INSTRUCTION_BILL } from '../constants';

// Helper to convert File/Blob to Base64
export const fileToGenerativePart = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove data url prefix (e.g. "data:image/jpeg;base64,")
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Initialize Gemini Client
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const chatWithGemini = async (
  history: { role: 'user' | 'model'; text: string }[],
  newMessage: string
) => {
  const ai = getAI();
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION_CHAT,
      temperature: 0.7,
    },
    history: history.map(h => ({
      role: h.role,
      parts: [{ text: h.text }]
    }))
  });

  const result = await chat.sendMessageStream({ message: newMessage });
  return result;
};

export const analyzeRoomForWiFi = async (base64Image: string, mimeType: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: mimeType,
            data: base64Image
          }
        },
        { text: "Analizá esta imagen para optimizar la señal WiFi de Telecentro. ¿Hay obstáculos? ¿Necesito Mesh? Sé breve y técnico." }
      ]
    },
    config: {
      systemInstruction: SYSTEM_INSTRUCTION_WIFI,
    }
  });
  return response.text;
};

export const diagnoseModemIssue = async (base64Data: string, mimeType: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: {
      parts: [
        {
          inlineData: {
             mimeType: mimeType,
             data: base64Data
          }
        },
        { text: "Actuá como un técnico de Telecentro. Analizá este video o imagen del módem. Identificá el estado de las luces (Power, DS, US, Online, WiFi). Si parpadean o están apagadas, indicá qué significa y dame una solución paso a paso para que recupere la conexión. Formato Markdown, sé claro y empático." }
      ]
    }
  });
  return response.text;
};

export const analyzeBill = async (base64Image: string, mimeType: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: mimeType,
            data: base64Image
          }
        },
        { text: "Explicame esta factura de Telecentro detalladamente. ¿Qué estoy pagando? ¿Hay algo inusual?" }
      ]
    },
    config: {
      systemInstruction: SYSTEM_INSTRUCTION_BILL,
    }
  });
  return response.text;
};

export const generateVeoVideo = async (prompt: string, imageBase64: string | null, imageMimeType: string | null) => {
  const ai = getAI();
  
  const modelParams: any = {
    model: 'veo-3.1-fast-generate-preview',
    config: {
      numberOfVideos: 1,
      resolution: '1080p',
      aspectRatio: '16:9'
    }
  };

  if (prompt) modelParams.prompt = prompt;
  
  if (imageBase64 && imageMimeType) {
    modelParams.image = {
      imageBytes: imageBase64,
      mimeType: imageMimeType
    };
  }

  let operation = await ai.models.generateVideos(modelParams);

  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({operation: operation});
  }

  if (operation.error) {
    throw new Error(operation.error.message || "Video generation failed");
  }

  const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!videoUri) {
    throw new Error("No video URI returned");
  }

  return `${videoUri}&key=${process.env.API_KEY}`;
};