import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION_CHAT, SYSTEM_INSTRUCTION_WIFI, SYSTEM_INSTRUCTION_BILL, SYSTEM_INSTRUCTION_PREDICTOR, SYSTEM_INSTRUCTION_TROUBLESHOOTING } from '../constants';

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
  history: { role: "user" | "model"; text: string }[],
  newMessage: string
) => {
  const ai = getAI();
  const chat = ai.chats.create({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction: SYSTEM_INSTRUCTION_CHAT,
      temperature: 0.7,
    },
    history: history.map((h) => ({
      role: h.role,
      parts: [{ text: h.text }],
    })),
  });

  const result = await chat.sendMessageStream({ message: newMessage });
  return result;
};

export const analyzeRoomForWiFi = async (
  base64Image: string,
  mimeType: string
) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: mimeType,
            data: base64Image,
          },
        },
        {
          text: "Analizá esta imagen y dame un resumen breve: ¿dónde poner el router? ¿necesito Mesh? Un consejo principal.",
        },
      ],
    },
    config: {
      systemInstruction: SYSTEM_INSTRUCTION_WIFI,
    },
  });
  return response.text;
};

export const diagnoseModemIssue = async (
  base64Data: string,
  mimeType: string
) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: mimeType,
            data: base64Data,
          },
        },
        {
          text: "Analizá el estado de las luces del módem. Si hay problemas, dame un diagnóstico breve (2-3 líneas) y la solución principal en pasos cortos. Sé directo.",
        },
      ],
    },
  });
  return response.text;
};

export const analyzeBill = async (base64Image: string, mimeType: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: mimeType,
            data: base64Image,
          },
        },
        {
          text: "Analizá esta factura de Telecentro y dame un resumen breve. ¿Cuánto tengo que pagar? ¿Hay algo importante que deba saber?",
        },
      ],
    },
    config: {
      systemInstruction: SYSTEM_INSTRUCTION_BILL,
    },
  });
  return response.text;
};

export const predictNetworkIssues = async (historicalData: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: {
      parts: [
        {
          text: `Analizá estos datos y dame un resumen breve (máximo 6-8 líneas):

${historicalData}

Incluí:
- 2-3 problemas principales con probabilidad y cuándo
- Patrón detectado (ej: horas pico)
- Una recomendación concreta

Sé conciso y directo.`,
        },
      ],
    },
    config: {
      systemInstruction: SYSTEM_INSTRUCTION_PREDICTOR,
      temperature: 0.3, // Más determinístico para predicciones
    },
  });
  return response.text;
};

export const troubleshootNetworkIssue = async (issueData: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: {
      parts: [
        {
          text: `Analizá este problema y dame un diagnóstico breve (máximo 5-6 líneas):

${issueData}

Incluí:
- Problema identificado (una línea)
- Causa probable (una línea)
- Solución principal en 2-3 pasos cortos
- Si necesita soporte humano (solo si es necesario)

Sé conciso y priorizá soluciones automáticas.`,
        },
      ],
    },
    config: {
      systemInstruction: SYSTEM_INSTRUCTION_TROUBLESHOOTING,
      temperature: 0.2, // Muy determinístico para troubleshooting
    },
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