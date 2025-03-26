// geminiService.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

const MODEL_NAME = "gemini-2.0-flash";
const API_KEY = process.env.GOOGLE_GEMINI_API_KEY; // ¡Reemplaza con tu API Key real!

const genAI = new GoogleGenerativeAI(API_KEY);

async function generateCourseRecommendations(text) {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const prompt = `genera una lista detallada de 3 líneas como máximo de la información escrita ${text}, además formatea la respuesta con salto de línea (\\n) para separar párrafos y listas, usa (-) para las listas en lugar de asterisco (*)`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let responseText = response.text();

        // Dividir el texto en párrafos
        let paragraphs = responseText.split('\n\n').filter(paragraph => paragraph.trim() !== '');

        // Eliminar los símbolos ** y ordenar alfabéticamente
        const orderedParagraphs = paragraphs.map(paragraph => {
            let trimmedParagraph = paragraph.trim();
            if (trimmedParagraph.startsWith('**')) {
                return trimmedParagraph.substring(2).trim(); // Eliminar los dos asteriscos
            } else {
                return trimmedParagraph;
            }
        }).sort();

        // Reconstruir la respuesta con los párrafos ordenados
        let orderedResponse = orderedParagraphs.join('\n\n');

        return orderedResponse;

    } catch (error) {
        console.error("Error al generar recomendaciones:", error);
        return ""; // Devuelve un string vacío en caso de error
    }
}

module.exports = { generateCourseRecommendations };