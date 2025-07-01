// Quiz data
const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "Hyperlinking Text Management Language"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: "CSS"
  },
  {
    question: "Which is not a JavaScript framework?",
    options: ["Python Script", "JQuery", "Django", "NodeJS"],
    answer: "Django"
  },
  {
    question: "Which tag is used to create a hyperlink in HTML?",
    options: ["<a>", "<link>", "<href>", "<hyperlink>"],
    answer: "<a>"
  }
];

// Get DOM elements
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const restartBtn = document.getElementById("restart-btn");
const timerEl = document.getElementById("time-remaining");

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 10;

// Load question
function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  q.options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option-btn");
    button.addEventListener("click", () => selectOption(button, option));
    optionsEl.appendChild(button);
  });
  nextBtn.disabled = true;
  startTimer();
}

// Start countdown timer
function startTimer() {
  clearInterval(timer);
  timeLeft = 10;
  timerEl.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      autoMove();
    }
  }, 1000);
}

// Handle option selection
function selectOption(button, selected) {
  clearInterval(timer);
  const q = quizData[currentQuestion];
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === q.answer) {
      btn.classList.add("correct");
    }
    if (btn.textContent === selected && selected !== q.answer) {
      btn.classList.add("wrong");
    }
  });
  if (selected === q.answer) {
    score++;
  }
  nextBtn.disabled = false;
}

// Auto move when time runs out
function autoMove() {
  const q = quizData[currentQuestion];
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === q.answer) {
      btn.classList.add("correct");
    }
  });
  nextBtn.disabled = false;
}

// Next question
nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

// Show final result
function showResult() {
  document.getElementById("quiz").style.display = "none";
  resultEl.textContent = `You scored ${score} out of ${quizData.length}!`;
  restartBtn.style.display = "inline-block";
}

// Restart quiz
restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  document.getElementById("quiz").style.display = "block";
  resultEl.textContent = "";
  restartBtn.style.display = "none";
  loadQuestion();
});

// Initialize
loadQuestion();
