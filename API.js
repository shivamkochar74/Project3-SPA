document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        { question: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
        { question: "What is the square root of 16?", options: ["3", "4", "5"], answer: "4" },
        { question: "If the area of a square is 36 sq. units, what is the length of one side?", options: ["6", "7", "8"], answer: "6" },
        { question: "What is 10 minus 5?", options: ["4", "5", "6"], answer: "5" },
        { question: "Solve for x: 3x + 5 = 11", options: ["1", "2", "3"], answer: "2" }
    ];

    let currentQuestionIndex = 0;
    let selectedOption = null;
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const submitButton = document.getElementById("submit");
    const quizContainer = document.getElementById("quiz-container");

    function loadQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        optionsElement.innerHTML = "";
        currentQuestion.options.forEach(option => {
            const li = document.createElement("li");
            li.textContent = option;
            li.onclick = () => selectOption(option);
            optionsElement.appendChild(li);
        });
        selectedOption = null;
    }

    function selectOption(option) {
        selectedOption = option;
        optionsElement.querySelectorAll("li").forEach(li => {
            li.style.backgroundColor = option === li.textContent ? "#e0e0e0" : "";
        });
    }

    function showFeedbackMessage(message) {
        alert(message);
    }

    submitButton.onclick = () => {
        if (selectedOption === null) {
            alert("Please select an option!");
            return;
        }

        if (selectedOption === questions[currentQuestionIndex].answer) {
            showFeedbackMessage("Brilliant! That's correct.");
            setTimeout(() => {
                moveToNextQuestion();
            }, 1000);
        } else {
            showFeedbackMessage("Try again!");
        }
    };

    function moveToNextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            finishQuiz();
        }
    }

    function finishQuiz() {
        console.log("Quiz finished");
        questionElement.style.display = "none";
        optionsElement.style.display = "none";
        submitButton.style.display = "none";

        const resetButton = document.createElement("button");
        resetButton.textContent = "Restart Quiz";
        resetButton.onclick = resetQuiz;
        quizContainer.appendChild(resetButton);
    }

    function resetQuiz() {
        currentQuestionIndex = 0;
        loadQuestion();
        questionElement.style.display = "";
        optionsElement.style.display = "";
        submitButton.style.display = "";
        this.remove();
    }

    loadQuestion();
});
