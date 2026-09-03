import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/ask", async (req, res) => {
    try{
    const question = req.body.question;

    const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
        {
            contents: [
                {
                    parts: [
                        {
                            text:`Answer this question in 1-5 short and simple sentences: ${question}`
                        }
                    ]
                }
            ]
        },
        {
            headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": process.env.GEMINI_API_KEY
            }
        }
    );

    const answer = response.data.candidates[0].content.parts[0].text;

    res.json({
        answer: answer
    });
} catch(error){
    console.log("Gemini Error:", error.response?.data||error.message);
    res.status(500).json({
        error:"something went wrong"
    })
}
})
    

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});