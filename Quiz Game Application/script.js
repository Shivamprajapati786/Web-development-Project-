const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Madrid", "London", "Berlin"],
    answer: "Paris"
  },
  {
    question: "Which is the largest planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Jupiter"
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "Python", "C", "JavaScript"],
    answer: "JavaScript"
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const quizEl = document.getElementById("quiz");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");

function showQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach(option => {
    const div = document.createElement("div");
    div.textContent = option;
    div.classList.add("option");
    div.onclick = () => checkAnswer(option);
    optionsEl.appendChild(div);
  });
}

function checkAnswer(selected) {
  const correct = quizData[currentQuestion].answer;
  if (selected === correct) {
    score++;
  }
  disableOptions();
}

function disableOptions() {
  const allOptions = document.querySelectorAll(".option");
  allOptions.forEach(option => {
    option.onclick = null;
    if (option.textContent === quizData[currentQuestion].answer) {
      option.style.backgroundColor = "#90ee90"; // green
    } else {
      option.style.backgroundColor = "#f08080"; // red
    }
  });
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  quizEl.classList.add("hide");
  resultEl.classList.remove("hide");
  scoreEl.textContent = `${score} / ${quizData.length}`;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  quizEl.classList.remove("hide");
  resultEl.classList.add("hide");
  showQuestion();
}

// Initial call
showQuestion();
