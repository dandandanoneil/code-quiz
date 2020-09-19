// Grab & name elements from index.html
const instructions = document.getElementById("instructions");
const startBtn = document.getElementById("start-button");
const highScoresButton = document.getElementById("high-scores-button");
const timer = document.getElementById("timer");
const questionCard = document.querySelector("#question-card");
const resultMessage = document.querySelector("#result-message");
const progressBar = document.querySelector(".progress-bar");

// Grab & name elements from high-scores.html
const scoreList = document.querySelector("#score-list");

// Grab & name the buttons & choices divs from both so I can make an event listener that won't crash on one page
const buttons = document.querySelector("#buttons");
const choices = document.querySelector("#choices");

// Set up the variables we'll use in the timer on index.html
let timeLeft;

// Array of questions for the quiz. Each question is an object with a question string, choices array, and answer string as keys. Answer is the correct answer, choices are the other wrong answers. This list will be shuffled at the start of the quiz, and the possible answers will be shuffled before that question is displayed
let questionsArr = [
    {
        question: "Where do we put a JavaScript <script> tag?",
        choices: ["The <head> section", "Either the <head> or <body> sections"],
        answer: "The <body> section"
    },
    {
        question: "What is the correct way to link to an external JavaScript file?",
        choices: ["<script href=\"script.js\">", "<script \"script.js\">", "<script> script.js </script>"],
        answer: "<script src=\"script.js\">"
    },
    {
        question: "What is a correct way to write a comment in JavaScript?",
        choices: ["*/ Comment \\*", "<!-- Comment -->"],
        answer: "// Comment"
    },
    {
        question: "What is the correct way to write an alert in JavaScript?",
        choices: ["alert.message(\"Alert Message\")", "alert {\"Alert Message\"}", "alert[\"Alert Message\"]"],
        answer: "alert(\"Alert Message\")"
    },
    {
        question: "What buttons would you expect to see in a confirm box?",
        choices: ["\"Okay\"", "\"Yes\" and \"No\"", "A text box, \"Cancel\" and \"Okay\""],
        answer: "\"Cancel\" and \"Okay\""
    },
    {
        question: "What is the correct way to call a function?",
        choices: ["call.myFunction()", "call myFunction{}", "call function myFunction()"],
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
        answer: "=="
    },
    {
        question: "What is the correct way to write an array in JavaScript?",
        choices: ["let array = ('one', 'two', three')", "let array = {'one', 'two', three'}"],
        answer: "let array = ['one', 'two', three']"
    },
    {
        question: "What is the correct way to start an if statement?",
        choices: ["if index>0, then", "if{index > 0}", "if index>0, then", "if[index > 0]"],
        answer: "if(index > 0)"
    },
    {
        question: "What is the correct way to start a while loop?",
        choices: ["while index>0, then", "while{index > 0}", "while[index > 0]"],
        answer: "while(index > 0)"
    },
    {
        question: "What is the correct way to start a for loop?",
        choices: ["for index = 0, index < 10, index++", "for (index = 0) (index < 10) (index +)", "for index = 0; [index < 10]"],
        answer: "for (index = 0; index < 10; index++)"
    }
];


// Initial code to load high scores on high-scores.html - this won't do anything on index.html
renderScoreList()


// Start & Clear Button Code
buttons.addEventListener("click", function(event) {
    let buttonID = event.target.id;
    
    if(buttonID === "start-button") {
        renderQuiz();
    }
    if(buttonID === "clear-button") {
        if(confirm("Are you sure you want to clear all the accumulated high scores?")) {
            console.log("scores cleared")
        }
    } 
});

// Quiz choices Code
choices.addEventListener("click", function(event) {
    // Code to differentiate which button they clicked, whether it matches the correct answer, etc.
});


function renderScoreList() {
    let highScores = localStorage.getItem("scores");

    if(highScores == null) { 
        console.log("No high scores")
    } else {
        console.log(highScores);
    }
}

function renderQuiz() {
    console.log("render quiz");

    startQuiz();
}

function startQuiz() {
    // Hide the instructions, and the 'start' and 'view high scores' buttons
    instructions.innerText = " ";
    startBtn.classList.add("d-none");
    highScoresButton.classList.add("d-none");
    
    // Show timer & set time to 01:30
    timer.classList.add("display-4","w-25","border","border-warning","text-center","mb-3");
    timeLeft = 90;
    let timerDisplay = "0" + (Math.floor(timeLeft / 60)) + ": " ;
    if((timeLeft % 60) >= 10) {
        timerDisplay = timerDisplay + (timeLeft % 60);
    } else {
        timerDisplay += timerDisplay + "0" + (timeLeft % 60);
    }
    timer.textContent = timerDisplay;

    console.log("start timer");
    // Call a function to start the timer here? Maybe all that above code goes in the startTimer function?

    console.log("shuffle questions, add first question as #question text, shuffle question.answers, create answer buttons & add to 'buttons'");

    // Shuffle the questions
    questionsArr.sort(() => Math.random() - 0.5);;
    // Start with the first question at questionsArr[0], display the question & set the question div's index to match
    let qNumber = 0;
    question.textContent = questionsArr[qNumber].question;
    question.index = qNumber;

    // Create a new array of all the wrong choices, then add the correct answer and shuffle
    let answerArray = questionsArr[qNumber].choices;
    answerArray.push(questionsArr[qNumber].answer);
    answerArray.sort(() => Math.random() - 0.5);;

    // Loop through the answerArray creating buttons for each choice and adding them to the DOM
    for (let i = 0; i < answerArray.length; i++) {
        let newButton = document.createElement("button");
        newButton.innerText = answerArray[i];
        newButton.type = "button";
        newButton.classList.add("btn","btn-lg","btn-info")
        choices.appendChild(newButton);
    }
}