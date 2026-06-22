const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");


// ✅ Questions (must match Cypress expectation)
const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris"
  },
  {
    question: "Which planet is known as Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars"
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4"
  },
  {
    question: "Which language runs in a browser?",
    options: ["Java", "Python", "JavaScript", "C++"],
    answer: "JavaScript"
  },
  {
    question: "HTML stands for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Tool Markup Language",
      "Home Text Markup Language"
    ],
    answer: "Hyper Text Markup Language"
  }
];


// restore progress from session storage
let userAnswers =
  JSON.parse(sessionStorage.getItem("progress")) || [];


// show saved score after refresh
const savedScore = localStorage.getItem("score");

if (savedScore !== null) {
  scoreElement.textContent =
    `Your score is ${savedScore} out of 5.`;
}


// save progress
function saveProgress() {
  sessionStorage.setItem("progress", JSON.stringify(userAnswers));
}


// calculate score
function calculateScore() {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  return score;
}


// render questions
function renderQuestions() {
  questions.forEach((q, index) => {
    const div = document.createElement("div");

    const p = document.createElement("p");
    p.textContent = q.question;

    div.appendChild(p);

    q.options.forEach(option => {
      const input = document.createElement("input");

      input.type = "radio";
      input.name = `question-${index}`;
      input.value = option;

      // ✅ restore checked state (Cypress needs attribute too)
      if (userAnswers[index] === option) {
        input.checked = true;
        input.setAttribute("checked", "true");
      }

      input.addEventListener("change", () => {
        userAnswers[index] = option;
        saveProgress();

        // ensure attribute exists for Cypress
        input.setAttribute("checked", "true");
      });

      div.appendChild(input);
      div.appendChild(document.createTextNode(option));
      div.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(div);
  });
}


// submit quiz
submitButton.addEventListener("click", () => {
  const score = calculateScore();

  scoreElement.textContent = `Your score is ${score} out of 5.`;

  localStorage.setItem("score", score);
});


// init
renderQuestions();