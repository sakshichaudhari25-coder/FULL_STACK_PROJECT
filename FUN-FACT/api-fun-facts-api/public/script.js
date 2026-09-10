import { marked } from "marked";

const factButton = document.getElementById("factButton");
const factElement = document.getElementById("fact");

factButton.addEventListener("click", async () => {
    try {
        factElement.textContent = "Generating fun fact...";
        factButton.disabled = true;
        const response = await axios.get("/fun-fact");
        factElement.innerHTML =marked.parse (response.data.fact);
    } catch (error) {
        console.error("error:", error);
        factElement.textContent = "Sorry, unable to generate a fun fact.";
    } finally {
        factButton.disabled = false;
    }
});