import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config({ path: './.env' });
const GOOGLE_API_KEY= "AIzaSyDeo24ShkkObY6IvUpfSDbr1wNd5JO3cTA"

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

// Configuramos el modelo para que SIEMPRE responda en formato JSON
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.5-flash",
  generationConfig: { responseMimeType: "application/json" } 
});

export const generarContenidoEducativo = async (tema) => {
  const prompt = `
    Genera material educativo sobre el tema: "${tema}".

    IMPORTANTE:
    - Responde SOLO en JSON válido
    - NO agregues texto extra
    - NO cambies la estructura

    Formato EXACTO:

    {
      "resumen": "Texto en markdown",
      "quiz": [
        {
          "pregunta": "Texto",
          "opciones": [
            { "texto": "Opción A", "correcta": false },
            { "texto": "Opción B", "correcta": true },
            { "texto": "Opción C", "correcta": false },
            { "texto": "Opción D", "correcta": false }
          ]
        }
      ]
    }
    `;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  try {
    return JSON.parse(response.text());
  } catch (error) {
    console.log("Error parseando JSON:", response.text());
    throw error;
}
};