// This script will include

// * Button actions:
//   - "Start" button on index.html will
//     ~ hide the start message, start button, and high scores button
//     ~ show the timer, question/answer card, and result message box
//     ~ start the timer and countdown
//     ~ start showing the question objects from the questions array
//   - "Clear Scores" button on high-scores.html will
//     ~ clear the array of high score objects
// * Timer
// * Questions array of question objects with right answer and wrong answer keys

let questionsArr = [
    {
        question: "Where do we put a JavaScript <script> tag?",
        choices: ["The <head> section", "The <body> section", "Either the <head> or <body> sections"],
        answer: "The <body> section"
    },
    {
        question: "What is the correct way to link to an external JavaScript file?",
        choices: ["<script src=\"script.js\">", "<script href=\"script.js\">", "<script \"script.js\">", "<script> script.js </script>"],
        answer: "<script src=\"script.js\">"
    },
    {
        question: "What is a correct way to write a comment in JavaScript?",
        choices: ["*/ Comment \\*", "<!-- Comment -->", "// Comment"],
        answer: "// Comment"
    },
    {
        question: "What is the correct way to write an alert in JavaScript?",
        choices: ["alert(\"Alert Message\")", "alert.message(\"Alert Message\")", "alert {\"Alert Message\"}", "alert[\"Alert Message\"]"],
        answer: "alert(\"Alert Message\")"
    },
    {
        question: "What buttons would you expect to see in a confirm box?",
        choices: ["\"Okay\"", "\"Cancel\" and \"Okay\"", "\"Yes\" and \"No\"", "A text box, \"Cancel\" and \"Okay\""],
        answer: "\"Cancel\" and \"Okay\""
    },
    {
        question: "What is the correct way to call a function?",
        choices: ["myFunction()", "call.myFunction()", "call myFunction{}", "call function myFunction()"],
        answer: "myFunction()"
    },
    {
        question: "Which of these means NOT equal in JavaScript?",
        choices: ["?=?", "!=", "==", "==="],
        answer: "!="
    },
    {
        question: "Which of these means equal in JavaScript?",
        choices: ["?=?", "!=", "==", ">="],
        answer: "=="
    },
    {
        question: "What is the correct way to write an array in JavaScript?",
        choices: ["let array = ['one', 'two', three']", "let array = ('one', 'two', three')", "let array = {'one', 'two', three'}"],
        answer: "let array = ['one', 'two', three']"
    },
    {
        question: "What is the correct way to start an if statement?",
        choices: ["if index>0, then", "if{index > 0}", "if index>0, then", "if(index > 0)", "if[index > 0]"],
        answer: "if(index > 0)"
    },
    {
        question: "What is the correct way to start a while loop?",
        choices: ["while index>0, then", "while{index > 0}", "while(index > 0)", "while[index > 0]"],
        answer: "while(index > 0)"
    },
    {
        question: "What is the correct way to start a for loop?",
        choices: ["for index = 0; index<10, index++", "for (index = 0) {index < 10}", "for (index = 0; index < 10)", "for index = 0; [index < 10]"],
        answer: "for (index = 0; index < 10; index++)"
    }
];

// First, grabbing elements from index.html
const startMessage = document.querySelector("#start-message");
const questionCard = document.querySelector("#question-card");
const resultMessage = document.querySelector("#result-message");
const progressBar = document.querySelector(".progress-bar");

// Then grabbing elements from high-scores.html
const scoreList = document.querySelector("#score-list");

// This will grab the buttons & choices divs so I can make an event listener that doesn't crash on one page
const buttons = document.querySelector("#buttons");
const choices = document.querySelector("#choices");

// Initial code to load high scores on high-scores.html
renderScoreList()

// Button Code (start button, clear scores)
buttons.addEventListener("click", function(event) {
    let buttonID = event.target.id;
    
    if(buttonID === "start-button") {
        renderQuiz();
    } else if(buttonID === "clear-button") {
        let confirmed = confirm("Are you sure you want to clear all the high scores?");
        if(confirmed) {
            console.log("scores cleared")
        }
    } 
});

// Choices Code
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

    quizMode();
    startQuiz();
}

function quizMode() { console.log("hide instructions, show timer, start timer"); }
function startQuiz() { 
    console.log("shuffle questions, add first question as #question text, shuffle question.answers, create answer buttons & add to 'buttons'");
}