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

function saveHighScore() {
  timerEl.textContent = time;
  var scoreInfo = {
    initials: initialsEl.value,
    score: time,
  };
  localStorage.setItem("quiz data", JSON.stringify(scoreInfo));
  
  var scoreList = document.createElement("li")

}
