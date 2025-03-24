// routes/courses.js
const express = require('express');
const router = express.Router();
const geminiService = require('../geminiService'); 

router.post('/recommendations', async (req, res) => {
    const { text } = req.body;

    /* if (!userInterests || !courseList || !Array.isArray(courseList)) {
        return res.status(400).json({ error: "userInterests y courseList (array) son requeridos." });
    } */

    try {
        const recommendations = await geminiService.generateCourseRecommendations(text);
        res.json({ recommendations });
    } catch (error) {
        console.error("Error en la ruta /recommendations:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
});

module.exports = router;