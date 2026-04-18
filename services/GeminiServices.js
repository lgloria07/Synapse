import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyD_2CW4tub-LtWfNDoxFNj7Z5EtvzLT_o0");

// Configuramos el modelo para que SIEMPRE responda en formato JSON
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.5-flash",
  generationConfig: { responseMimeType: "application/json" } 
});

export const generarContenidoEducativo = async (tema) => {
  const prompt = `
    Genera material educativo sobre el tema: "${tema}".
    Responde estrictamente con el siguiente esquema JSON:
    
    {
      "resumen": "Contenido detallado en formato Markdown",
      "quiz": [
        {
          "pregunta": "Texto de la pregunta",
          "opciones": [
            { "texto": "Opción A", "correcta": false },
            { "texto": "Opción B", "correcta": true },
            { "texto": "Opción C", "correcta": false },
            { "texto": "Opción D", "correcta": false }
          ]
        }
      ],
    }
  `;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return JSON.parse(response.text());
};