// const mood=document.getElementById("mood")
// const btn=document.getElementById("generateBtn")
// const result=document.getElementById("result")

// btn.addEventListener("click", async () => {
//     const selectMood=mood.value;

//     if (!selectMood){
//         result.textContent="Please Select Your mood first";
//         return;
//     }
//     result.textContent="Generating your journal prompt..."

//     try{
//         const response=await axios.post("/journal-prompt", {
//             mood:selectMood
//         })
//         result.textContent=response.data.journalPrompt;
//     }catch (error){
//         console.error("Error: ",error)

//         if (error.response){
//             result.textContent=error.response.data.error;
//         }else{
//             result.textContent="Something went wrong, Please try again..."
//         }
        
//     }
    
// })


    

const mood = document.getElementById("mood");
const btn = document.getElementById("generateBtn");
const result = document.getElementById("result");
const prompt = document.getElementById("prompt");

btn.addEventListener("click", async () => {

    const selectedMood = mood.value;

    if (!selectedMood) {
        result.style.display = "block";
        prompt.textContent = "Please select your mood first.";
        return;
    }

    result.style.display = "block";
    prompt.textContent = "Generating your journal prompt...";

    try {

        const response = await fetch("/journal-prompt", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                mood: selectedMood
            })
        });

        const data = await response.json();

        console.log("DATA FROM SERVER:", data);

        if (!response.ok) {
            throw new Error(data.error);
        }

        prompt.innerHTML =marked.parse(data.journalPrompt);

    } catch (error) {

        console.error("ERROR:", error);

        prompt.textContent = error.message;
    }
});