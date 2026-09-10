const joke=document.getElementById("jokeBtn")
const tip=document.getElementById("tipBtn")
const motivation=document.getElementById("motivationBtn")
const result=document.getElementById("response")
joke.addEventListener("click", async () => {
    result.textContect="Generate Joke..."
    try{
        const response=await axios.get("/joke");
        result.innerHTML=marked.parse(response.data.joke);
    }catch(error){
        console.error("Error:", error)
        result.textContet="Unable to generate joke.."
    }
})
motivation.addEventListener("click", async()=>{
    result.textContent="Generate Motivation Quote...,"
    try{
        const response=await axios.get("/motivation");
        result.innerHTML=marked.parse(response.data.motivation);
    }catch(error){
        console.error("Error:", error)
        result.textContext="Unable to generate Motivation Quote"
    }
})
tip.addEventListener("click", async ()=>{
    result.textContent="Generate Tip for day..."
    try{
        const response=await axios.get("/tip");
        result.innerHTML=marked.parse(response.data.tip);
    }catch(error){
        console.error("Error:", error)
        result.textContent="Unable to generate Tip."
    }
})