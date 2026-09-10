const form = document.getElementById("questionform");
const questionInput = document.getElementById("question");
const answer = document.getElementById("answer");
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const question = questionInput.value;
    if (!question.trim()) {
        answer.textContent = "Please enter a question.";
        return;
    }
    answer.textContent = "Loading...";
    try {
        const response = await axios.post("/ask", {
            question: question
        });
        answer.innerHTML = marked.parse(response.data.answer);
    } catch (error) {
        console.log(error);
        answer.textContent = "Something went wrong.";
    }
});

