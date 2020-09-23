// Grab & name elements from index.html
const header = document.getElementById("header");
const instructions = document.getElementById("instructions");
const startButton = document.getElementById("start-button");
const highScoresButton = document.getElementById("high-scores-button");
const timer = document.getElementById("timer");
const questionCard = document.getElementById("question-card");
const question = document.getElementById("question");
const choices = document.getElementById("choices");
const submitButton = document.getElementById("submit");
const retakeButton = document.getElementById("retake");
const resultMessage = document.getElementById("result-message");
const progressDiv = document.querySelector(".progress");
const progressBar = document.querySelector(".progress-bar");


// Set up the variables we'll use in the timer
let timeLeft;
let interval;
let timerDisplay;

// Set the question number at -1 so that the first time nextQuestion() is called, it will use the question at position [0]
let qNumber = -1;

// Array of question objects for the quiz.
let questionsArr = [
    {
        question: "In what section do we put a <script> tag?",
        choices: ["<head>", "<body>"],
        answer: "Either <head> or <body>"
    },
    {
        question: "What is the correct way to link to an external JavaScript file?",
        choices: ["<script href=\"script.js\">", "script =  \"script.js\"", "<script> script.js </script>"],
        answer: "<script src=\"script.js\">"
    },
    {
        question: "Which is a comment in JavaScript?",
        choices: ["*/ Comment \\*", "<!-- Comment -->"],
        answer: "// Comment"
    },
    {
        question: "What buttons would you expect to see in a confirm box?",
        choices: ["\"Okay\"", "\"Yes\" and \"No\"", "A text box, \"Cancel\" and \"Okay\""],
        answer: "\"Cancel\" and \"Okay\""
    },
    {
        question: "What is the correct way to call a function?",
        choices: ["myFunction.call()", "call myFunction", "function myFunction()"],
        answer: "myFunction()"
    },
    {
        question: "Which of these means NOT equal in JavaScript?",
        choices: ["?=?", "==", "==="],
        answer: "!="
    },
    {
        question: "Which of these means equal in JavaScript?",
        choices: ["?=?", "!=", ">="],
        answer: "==="
    },
    {
        question: "What is the correct way to write an array in JavaScript?",
        choices: ["('one', 'two', three')", "{'one', 'two', three'}"],
        answer: "['one', 'two', three']"
    },
    {
        question: "What is the correct way to start an if statement?",
        choices: ["if index = 0, then", "if {index = 0}", "if index > 0, then", "if [index > 0]"],
        answer: "if (index > 0)"
    },
    {
        question: "What is the correct way to start a while loop?",
        choices: ["while index > 0, then", "while {index > 0}", "while [index > 0]"],
        answer: "while (index > 0)"
    },
    {
        question: "What is the correct way to start a for loop?",
        choices: ["for i = 0, i < 10, i++", "for (i < 10)", "for i = 0, while [i < 10], i++"],
        answer: "for (i = 0; i < 10; i++)"
    }
];


// Called when the user hits 'submit' on their score
function saveScore() {
    let input = document.querySelector("#input");
    let initials = input.value.toUpperCase();

    // Convert the initials and score into an object    
    let newScore = {userName:initials, userScore:timeLeft.toString()};
    
    // Get high scores from localStorage and convert to an array
    let highScores = JSON.parse(localStorage.getItem("scores"));
    if(highScores === null) { highScores = []; }

    highScores.push(newScore);

    // Resort the array by score, descending, and save to localStorage
    highScores.sort(function compare(a, b) {
        return parseInt(b.userScore) - parseInt(a.userScore);
    });
    localStorage.setItem("scores", JSON.stringify(highScores));

    // Redirect to the high scores page
    window.location.href = "high-scores.html";
}

function startQuiz() {
    // Hide the instructions, and the 'start' and 'view high scores' buttons
    header.classList.add("d-none");
    instructions.innerText = " ";
    startButton.classList.add("d-none");
    highScoresButton.classList.add("d-none");
    progressDiv.classList.remove("d-none");
    
    // Show timer & start timer
    timer.classList.add("w-50","border","bg-warning", "text-white", "rounded", "text-center","mb-3");
    timeLeft = 90;
    startTimer();
    
    // Shuffle the questions, then call nextQuestion to display the first question & its choices
    questionsArr.sort(() => Math.random() - 0.5);
    nextQuestion();
}

function retakeQuiz() {
    // Hide submit & retake buttons, show progress bar
    submitButton.classList.add("d-none");
    submitButton.classList.remove("m-2");
    retakeButton.classList.add("d-none");
    // Show progress bar, question, and choices
    progressDiv.classList.remove("d-none");
    question.classList.remove("d-none");
    choices.classList.remove("d-none");
    
    // Name and remove input & score announcement
    let input = document.getElementById("input");
    if (input) {
        questionCard.removeChild(input);
    }
    let result = document.getElementById("result");
    questionCard.removeChild(result);

    // Restart timer
    timeLeft = 90;
    timer.classList.remove("bg-danger");
    timer.classList.remove("bg-success");
    timer.classList.add("bg-warning");
    startTimer();
    
    // Shuffle the questions, then call nextQuestion to display the first question & its choices
    questionsArr.sort(() => Math.random() - 0.5);
    qNumber = -1;
    nextQuestion();
}

function startTimer() {
    renderTime();

    interval = setInterval(function() {
        timeLeft = timeLeft - 1;
        renderTime();
      }, 1000);
}

function renderTime() {
    if (timeLeft <= 0) {
        stopTimer();
        timeLeft = 0;
        endGame();
    }

    if(timeLeft >= 60) {
        timerDisplay = "0" + (Math.floor(timeLeft / 60)) + ":" ;
    } else {
        timerDisplay = "00: " ;
    }

    if((timeLeft % 60) >= 10) {
        timerDisplay += (timeLeft % 60);
    } else {
        timerDisplay += "0" + (timeLeft % 60);
    }

    timer.textContent = timerDisplay;
}

function stopTimer() {
    clearInterval(interval);
}

function nextQuestion() {
    // Start with the first question at questionsArr[0] (becasue questionNumber was set globally as -1 when the page loaded)
    qNumber ++;
    // Check to make sure we haven't run out of questions
    if (qNumber >= questionsArr.length) { 
        endGame();
        return;
    }
    // If not, display the question & set the question div's index to match
    question.textContent = questionsArr[qNumber].question;
    question.index = qNumber;
    
    // Create a new array of all the wrong choices, then add the correct answer and shuffle
    let answerArray = questionsArr[qNumber].choices;
    answerArray.push(questionsArr[qNumber].answer);
    answerArray.sort(() => Math.random() - 0.5);;
    
    // Clear the choices
    choices.innerHTML = "";
    
    // Loop through the answerArray creating buttons for each choice and adding them to the DOM
    for (let i = 0; i < answerArray.length; i++) {
        let newButton = document.createElement("button");
        newButton.innerText = answerArray[i];
        newButton.type = "button";
        newButton.classList.add("btn","btn-lg","btn-info")
        choices.appendChild(newButton);
    }

    // Set the progress bar to display their progress through the quiz
    progressBar.style = "width: " + ((qNumber + 1) / questionsArr.length * 100) + "%";
}

function endGame() {
    stopTimer();
    
    // Hide question, answers, and progress bar
    question.classList.add("d-none");
    choices.classList.add("d-none");
    progressDiv.classList.add("d-none");

    // Create element to announce their score & append to the questionCard element
    let result = document.createElement("h5");
    result.textContent = "Your final score is " + timeLeft + "!";
    result.id = "result";
    result.classList.add("m-2");
    questionCard.append(result);

    // Create element to ask for their initials & append to the questionCard element
    if (timeLeft > 0) {
        let initialsInput = document.createElement("input");
        initialsInput.type = "text";
        initialsInput.id = "input";
        initialsInput.placeholder = "Enter your initials"
        initialsInput.classList.add("m-2");
        questionCard.append(initialsInput)
    }

    // Show submit button & start button
    if (timeLeft > 0) {
        submitButton.classList.remove("d-none");
        submitButton.classList.add("m-2");
    }
    retakeButton.classList.remove("d-none");

    // Change timer color to reflect result
    if (timeLeft > 0) {
        timer.classList.remove("bg-warning");
        timer.classList.add("bg-success");
    } else {
        timer.classList.remove("bg-warning");
        timer.classList.add("bg-danger");
    }
}

// Quiz choices button listener
choices.addEventListener("click", function(event) {
    let userChoice = event.target.textContent;
    let answer = questionsArr[qNumber].answer;

    if(userChoice != answer) {
        timeLeft -= 15;
        renderTime();
    }
    nextQuestion();
});

startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", saveScore);
retakeButton.addEventListener("click", retakeQuiz);