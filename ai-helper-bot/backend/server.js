import express from "express"
import dotenv from "dotenv"
import cors from 'cors';
import { GoogleGenAI } from '@google/genai'
dotenv.config()
console.log(
  process.env.GEMINI_API_KEY ? "API key loaded" : "API key NOT loaded"
)

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static("../frontend"))
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})
app.get("/joke", async (req, res) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Tell me one short and funny joke"
        })
        res.json({
            joke: response.text
        });
    } catch (error) {
        console.error("Error", error)
        res.status(500).json({
            error: "Unable to generate Joke"
        })
    }
})

app.get("/motivation", async (req, res) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Give me one short motivational quote."
        })
        res.json({
            motivation: response.text
        })
    } catch (error) {
        console.error("Error:", error)
        res.status(500).json({
            error: "Unable to generate motivational Quote"
        })
    }
})

app.get("/tip", async (req, res) => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: "Give me one short useful tip of the day."
        })
        res.json({
            tip: response.text
        })
    } catch (error) {
        console.error("Error:", error)
        res.status(500).json({
            error: "Unable to generate tip of the Day."
        })
    }
})


    app.listen(5000, () => {
        console.log("server running on  http://localhost:5000");

    })