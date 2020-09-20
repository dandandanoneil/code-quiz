// Grab & name elements from high-scores.html
const scoreList = document.querySelector("#score-list");

// Grab & name the buttons  
const clearButton = document.querySelector("#clear-button");

// Dummy scores in localStorage for testing
localStorage.setItem("scores", JSON.stringify(["example zero", "example one", "example two"]));

// Initial code to load high scores
renderScoreList()

function renderScoreList() {    
    // Get high scores from localStorage and convert to an array
    let highScores = JSON.parse(localStorage.getItem("scores"));
    if(highScores === null) { highScores = []; }

    // Clear the scoreList element
    scoreList.innerHTML = "";

    // Create list of high scores in scoreList element
    if(highScores === []) { 
        for (let i = 0; i < 10; i++) {
            let score = document.createElement("div");
            score.innerText = ((i + 1) + ". ???")
            scoreList.appendChild(score)
        }
    } else {
        for (let i = 0; i < highScores.length; i++) {
            let score = document.createElement("div");
            score.innerText = ((i + 1) + ". " + highScores[i])
            scoreList.appendChild(score)
        }
        // If there are less than 10 high scores, add empty numbered lines
        if(highScores.length < 10) {
            for (let i = highScores.length; i < 10; i++) {
                let score = document.createElement("div");
                score.innerText = ((i + 1) + ". ???")
                scoreList.appendChild(score)
            }    
        }
    }
}

// Clear Button Code
clearButton.addEventListener("click", function() {
    if(confirm("Are you sure you want to clear all the accumulated high scores?")) {
        console.log("scores cleared");
        localStorage.setItem("scores", JSON.stringify( [] ));
        renderScoreList();
    }
});
