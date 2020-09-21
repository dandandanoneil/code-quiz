// Grab & name elements from index.html
const instructions = document.getElementById("instructions");
const startBtn = document.getElementById("start-button");
const highScoresButton = document.getElementById("high-scores-button");
const buttons = document.querySelector("#buttons");
const timer = document.getElementById("timer");
const questionCard = document.querySelector(".question-card");
const choices = document.querySelector("#choices");
const submitButton = document.querySelector("#submit");
const resultMessage = document.querySelector("#result-message");
const progressBar = document.querySelector(".progress-bar");


// Set up the variables we'll use in the timer
let timeLeft;
// Set the question number at -1 so that the first time nextQuestion() is called, it will use the question at position [0]
let qNumber = -1;

// Array of questions for the quiz. Each question is an object with a question string, choices array, and answer string as keys. Answer is the correct answer, choices are the other wrong answers. This list will be shuffled at the start of the quiz, and the possible answers will be shuffled before that question is displayed
let questionsArr = [
    {
        question: "Where do we put a JavaScript <script> tag?",
        choices: ["The <head> section", "The <body> section"],
        answer: "Either the <head> or <body> sections"
    },
    {
        question: "What is the correct way to link to an external JavaScript file?",
        choices: ["<script href=\"script.js\">", "<script \"script.js\">", "<script> script.js </script>"],
        answer: "<script src=\"script.js\">"
    },
    {
        question: "What is correct when writing a comment in JavaScript?",
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


// Start Button listener
buttons.addEventListener("click", function(event) {
    let buttonID = event.target.id;
    
    if(buttonID === "start-button") {
        startQuiz();
    }
    if(buttonID === "clear-button") {
        if(confirm("Are you sure you want to clear all the accumulated high scores?")) {
            console.log("scores cleared")
        }
    } 
});

// Quiz choices button listener
choices.addEventListener("click", function(event) {
    let userChoice = event.target.textContent;
    let answer = questionsArr[qNumber].answer;

    console.log(userChoice, answer);

    if(userChoice == answer) {
        rightAnswer();
    } else {
        wrongAnswer();
    }
});

// Submit button listener
submitButton.addEventListener("click", function(event) {
    console.log("score submitted");
});

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

    // Shuffle the questions, then call nextQuestion to display the first question & its choices
    questionsArr.sort(() => Math.random() - 0.5);
    nextQuestion();
}

function nextQuestion() {
    // Start with the first question at questionsArr[0] (becasue questionNumber was set globally as -1 when the page loaded)
    qNumber ++;
    // Check to make sure we haven't run out of questions
    if (qNumber >= questionsArr.length) { 
        endGame("You answered all the questions!");
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

function rightAnswer() {
    console.log("You got question number", (qNumber + 1), "correct");
    nextQuestion();
}

function wrongAnswer() {
    console.log("You got question number", (qNumber + 1), "wrong");
    console.log(timeLeft);
    timeLeft -= 10;
    console.log(timeLeft);
    nextQuestion();
}

function endGame(endMessage) {
    question.classList.add("d-none");
    timer.classList.add("d-none");
    progressBar.classList.add("d-none");
    questionCard.removeChild(choices);

    // Create elements to announce their score & ask for their initials & append them to the questionCard element
    let score = document.createElement("h5");
    score.textContent = "Your final score is " + timeLeft;
    score.classList.add("m-2");
    questionCard.append(score);

    let initialsInput = document.createElement("input");
    initialsInput.type = "text";
    initialsInput.placeholder = "Enter your initials"
    initialsInput.classList.add("m-2");
    questionCard.append(initialsInput)

    submitButton.classList.remove("d-none");
    submitButton.classList.add("m-2");

    // Create a string for their score & add it in the correct position to the scores array in localStorage, or create a new scores array
    // Save that scores list back to localStorage
    console.log("the game is over");
}