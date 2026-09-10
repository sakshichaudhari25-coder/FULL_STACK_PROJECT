// import express from "express"
// import cors from  "cors"
// import {GoogleGenAI} from "@google/genai"
// import dotenv from "dotenv"

// dotenv.config()

// const app=express()

// app.use(cors())
// app.use(express.json())

// app.use(express.static("public"))

// const ai=new GoogleGenAI({
//     apiKey:process.env.GEMINI_API_KEY
// })
// app.post("/journal-prompt", async (req, res)=>{
//     try{

//         const {mood}=req.body

//         const response=await ai.models.generateContent({
//             model: "gemini-2.5-flash",
//             contents: `Write one short, encouraging journal promt for someone whi is feeling ${mood}.`
//         })
//         res.json({
//             journalPrompt: response.text
//         });
//     } catch (error){
//         console.error("Gemini error:", error)

//         res.status(500).json({
//             error:"Unable to ggenerate journal prompt"
//         })

//     }
// })

// app.listen(3000, ()=> {
//     console.log("Server running on http://localhost:3000");
    
// })



import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

console.log(
    process.env.GEMINI_API_KEY
        ? "API KEY FOUND"
        : "API KEY NOT FOUND"
);

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.post("/journal-prompt", async (req, res) => {

    console.log("Request received");

    try {

        const { mood } = req.body;

        console.log("Mood:", mood);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Write one short, encouraging journal prompt for someone who is feeling ${mood}.`
        });

        console.log("Gemini response received");

        res.json({
            prompt: response.text
        });

    } catch (error) {

        console.error("GEMINI ERROR:", error);

        res.status(500).json({
            error: error.message
        });
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});