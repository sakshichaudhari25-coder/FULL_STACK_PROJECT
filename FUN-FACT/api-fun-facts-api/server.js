import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 5000;

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.use(express.static("public"));

app.get("/fun-fact", async (req, res) => {

    try {

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Give me one short fun fact."
        });

        res.json({
            fact: response.text
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Unable to generate fun fact"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});