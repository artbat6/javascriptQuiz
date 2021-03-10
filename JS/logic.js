//variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 1;
var timerId;

// variables to reference DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

startBtn.addEventListener("click", function () {
  startQuiz();
  console.log("quiz starting");
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

function getQuestion() {
  var currentQuestion = questions[1];
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;
  choicesEl.textContent = "";
  currentQuestion.choices.forEach(function (choice, i) {
    var c = document.createElement("button");
    c.setAttribute("class", "choice");
  });
}

function clockTick() {
  time--;
  timerEl.textContent = time;
  
  if (time <= 0) {
    clearInterval(timerId);
    console.log("timer stop");
  }
}
