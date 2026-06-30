const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");


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



// Load previous progress
let userAnswers =
  JSON.parse(sessionStorage.getItem("progress")) || [];



// Load previous score
let oldScore = localStorage.getItem("score");

if (oldScore !== null) {
  scoreElement.textContent =
    `Your score is ${oldScore} out of 5.`;
}



// Save answers
function saveProgress() {

  sessionStorage.setItem(
    "progress",
    JSON.stringify(userAnswers)
  );

}



// Display questions
function displayQuestions() {

  questionsElement.innerHTML = "";


  questions.forEach((q, index) => {

    const div = document.createElement("div");


    const title = document.createElement("p");

    title.textContent =
      `${index + 1}. ${q.question}`;


    div.appendChild(title);



    q.options.forEach(option => {

      const input = document.createElement("input");

      input.type = "radio";
      input.name = "question" + index;
      input.value = option;


      if (userAnswers[index] === option) {

        input.checked = true;

      }



      input.addEventListener(
        "change",
        function() {

          userAnswers[index] = option;

          saveProgress();

        }
      );



      div.appendChild(input);

      div.appendChild(
        document.createTextNode(option)
      );

      div.appendChild(
        document.createElement("br")
      );

    });


    questionsElement.appendChild(div);

  });

}



// Calculate score
function calculateScore() {

  let score = 0;


  questions.forEach((q, index) => {

    if (userAnswers[index] === q.answer) {

      score++;

    }

  });


  return score;

}



// Submit
submitButton.addEventListener(
  "click",
  function() {

    const score = calculateScore();


    scoreElement.textContent =
      `Your score is ${score} out of 5.`;


    localStorage.setItem(
      "score",
      score
    );

  }
);



// Initial load
displayQuestions();