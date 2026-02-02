import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Always initialize with process.env.API_KEY directly to ensure the latest key from selection dialog is used.
export const getGeminiAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates an AI summary of medical data for doctors.
 */
export async function getMedicalSummary(patientData: string): Promise<string> {
  const ai = getGeminiAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze the following patient data and provide a concise medical summary for a doctor's quick review. Highlight critical risks. Data: ${patientData}`,
    config: {
      temperature: 0.7,
      // Removed maxOutputTokens to avoid blocking due to reaching max tokens without thinkingBudget.
    }
  });
  // Use the .text property directly to access generated content.
  return response.text || 'No summary available.';
}

/**
 * Edits a patient profile image using Gemini 2.5 Flash Image.
 */
export async function editMedicalImage(base64Image: string, prompt: string): Promise<string | null> {
  const ai = getGeminiAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
        { text: prompt }
      ]
    }
  });

  // Iterate through all response parts to find the inlineData part as per guidelines.
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
}

/**
 * Generates a health card visual representation using Gemini 3 Pro Image.
 */
export async function generateHealthPoster(prompt: string, size: '1K' | '2K' | '4K'): Promise<string | null> {
  const ai = getGeminiAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: {
      parts: [{ text: `Create a clean, professional medical ID card illustration for: ${prompt}. Minimalistic and high-tech.` }]
    },
    config: {
      imageConfig: {
        aspectRatio: '1:1',
        imageSize: size
      }
    }
  });

  // Iterate through all response parts to find the inlineData part.
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
}