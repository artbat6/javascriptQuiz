//variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 10;
var timerId;

// variables to reference DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var scoresEl = document.getElementById("hiScoreLink")

startBtn.addEventListener("click", function () {
  startQuiz();
});

function startQuiz() {
  //hide start screen
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");
  //reveal questions section
  questionsEl.removeAttribute("class");
  //start timer
  timerId = setInterval(clockTick, 1000);
  //show starting time
  timerEl.textContent = time;

  getQuestion();
}

// display question and 4 choices as buttons - iterate through the five questions

function choiceClick() {
  var answerChoice = this.value;
  if (answerChoice !== questions[currentQuestionIndex].answer) {
    time -= 15;
    if (time < 0) time = 0;
    timerEl.textContent = time;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;
  // lost here
  choicesEl.textContent = "";
  currentQuestion.choices.forEach(function (choice, i) {
    var c = document.createElement("button");
    c.setAttribute("value", choice);
    c.textContent = choice;
    c.onclick = choiceClick;
    choicesEl.append(c);
  });
}

function quizEnd() {
  clearInterval(timerId);
  var endEl = document.getElementById("end-screen");
  endEl.removeAttribute("class");

  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    quizEnd();
  }
}

submitBtn.addEventListener("click", function () {
  saveHighScore();
});

//_______________________________________________//

var scoreArray = [];

if (JSON.parse(localStorage.getItem("quizData")) !== null) {
  scoreArray = JSON.parse(localStorage.getItem("quizData"));
} 

function saveHighScore() {
  timerEl.textContent = time;
  var scoreInfo = {
    initials: initialsEl.value,
    score: time,
  };
  scoreArray.push(scoreInfo);
  localStorage.setItem("quizData", JSON.stringify(scoreArray));
}


function viewHighScores() {
  for (i = 0; i < scoreArray.length; i++){
    console.log("this is i");
    var listItem = document.createElement("li");
    //create a list item
    listItem.value = scoreArray[i].initials + " " + scoreArray[i].score;
    
  //give the list item a value (from score array)
    var listContainer = document.getElementById("score-list");
    //append li to ul
    listContainer.appendChild(listItem);
  }

}


scoresEl.addEventListener("click", function () {
  console.log("this is being called");
  viewHighScores();
  
});
//wrap quiz section in a div
//give that div an id
//wrap high score section in div
//give that div a different id
//in css reference high score section give it style display none
//we already have an event listener on the quiz section button
//when that button is clicked we are going to reference the high score section
//and give it a style of display block
//reference the quiz section and give it a style of display none
//repeat the process with opposite styles with return to quiz button





