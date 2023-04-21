const startScreen = document.querySelector("#start-screen")
const startButton = document.querySelector("#start-button")
const questionScreen = document.querySelector("#question-screen")
const questionSection = document.querySelector("#questions")
const timer = document.querySelector("#timer")
const gameOverSection = document.querySelector("#game-over")
const finalScore = document.querySelector("#score")
const initialInput = document.querySelector("#initials")
const submitButton = document.querySelector("#submit-button ")
const highScoresScreen = document.querySelector("#high-scores")
const goBackButton = document.querySelector("#go-back")
const clearButton = document.querySelector("#clear-high-scores")
const finalControl = document.querySelector("#final-control")
let currentQuestion = 0
let seconds = 75
let score = 0


function timerExpired (){
    seconds = seconds - 1
    timer.innerHTML = seconds
    checkGameOver()
}
// single = is assignment evaluator
var questions = [
    {
        question: "The condition in an if/else statement is enclosed with ________.",
        answers: ["commas", "curly brackets", "quotes", "parenthesis"],
        correctAnswer: "parenthesis"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        correctAnswer: "console.log"
    },
    {
        question: "Which process do you use to download information for class?",
        answers: ["git pull", "for loop", "git push", "git -m"],
        correctAnswer: "git pull"
    }
]


startButton.addEventListener("click", function(){
   startScreen.classList.add("hide")
   interval = setInterval(timerExpired, 1000)
   displayQuestion()
})

function displayQuestion () {
    questionSection.innerHTML = ""
    var question = questionScreen.querySelector("h2")
    question.textContent = questions[currentQuestion].question
    for (let i = 0; i < 4; i++) {
        var button = document.createElement("button")
        button.textContent = questions[currentQuestion].answers[i]
        button.value = questions[currentQuestion].answers[i]
        button.addEventListener("click", function(){
            if (this.textContent == questions[currentQuestion].correctAnswer) {
                display.innerHTML = "Correct! YOU TOTALLY ROCK!"
                console.log("correct answer complete")
                // score = score + 10
            }
            else {
                seconds = seconds - 10
                timer.innerHTML = seconds
                display.innerHTML = "WRONG! GO BACK AND STUDY!"
            }
            //this is referring to the button 
            currentQuestion ++
            checkGameOver()
        })
        questionSection.appendChild(button)
    }
}
const highScores = JSON.parse(localStorage.getItem("highScores")) || []
//pikes allow for null(shorthand way to set default value if first doesn't exist)
highScores.sort(function(a , b){
   return b.score - a.score
})
//anonymous is for functions not used other places
//subtracting to find the order

function checkGameOver (){
    //check the score, right or wrong
    if( currentQuestion == questions.length || seconds == 0){
        clearInterval(interval)
        questionSection.innerHTML = ""
        display.innerHTML = ""
        timer.innerHTML = 0
        finalScore.innerHTML = seconds
        for (let i = 0; i < highScores.length; i++) {
         const li = document.createElement("li")
         li.innerHTML = `${highScores[i].initials}: ${highScores[i].score}`
         //string interpolation(template literals), creating a string using other variables inside of it
        //$ and curly braces allow you to inject a string value into the variables
         highScoresScreen.appendChild(li)  
         //appendChild is a method on html element where you add  
        }
//function i need to repurpose(don't want to show high scores until i enter initials)
        gameOverSection.classList.remove("hide")
        finalControl.classList.remove("hide")
    }
    displayQuestion()
    // clear interval turns off the game......
}
//display 
function showHighScores(){
    console.log(initialInput.value)
    highScores.push({
      score: seconds,
       initials: initialInput.value 
    })
    localStorage.setItem("highScores", JSON.stringify(highScores))
     const li = document.createElement("li")
     //"li" is the tag list for an item
     li.innerHTML = `${initialInput.value}: ${seconds}`
         highScoresScreen.appendChild(li)
         
    //show or build a button that will realod the page : window.location.reload()
    //show or build a button that clear scores (clear localstorage)
}
submitButton.addEventListener("click", showHighScores)

goBackButton.addEventListener("click", function(){
    location.reload()
})

clearButton.addEventListener("click", function(){
    localStorage.clear()
    highScoresScreen.innerHTML=""
})
// go back button 
//get information out of the text box. need two new variables, one for initials input text box and submit button
//add click event listener to submit button(gives info on what i want to happen)

//interval code and code for wrong answer, i need to check and see if timer gets to zero. to end the game