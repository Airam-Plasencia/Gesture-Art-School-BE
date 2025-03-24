// geminiService.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

const MODEL_NAME = "gemini-2.0-flash";
const API_KEY = process.env.GOOGLE_GEMINI_API_KEY; // ¡Reemplaza con tu API Key real!

const genAI = new GoogleGenerativeAI(API_KEY);

async function generateCourseRecommendations(text) {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const prompt = `genera una lista detallada de 3 líneas como máximo de la información escrita ${text}`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Formatear la respuesta como un array de strings
        const recommendationsArray = text.split('\n').filter(line => line.trim() !== '');
        return recommendationsArray;

    } catch (error) {
        console.error("Error al generar recomendaciones:", error);
        return []; // Devuelve un array vacío en caso de error
    }
}


module.exports = { generateCourseRecommendations };