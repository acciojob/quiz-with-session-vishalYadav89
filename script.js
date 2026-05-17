//your JS code here.

const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// get saved answers from session storage
let userAnswers =
  JSON.parse(sessionStorage.getItem("progress")) || [];

// show saved score after refresh
const savedScore = localStorage.getItem("score");

if (savedScore !== null) {
  scoreElement.textContent =
    `Your score is ${savedScore} out of 5.`;
}

// save answers in session storage
function saveProgress() {

  sessionStorage.setItem(
    "progress",
    JSON.stringify(userAnswers)
  );
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

// Display the quiz questions and choices
function renderQuestions() {

  for (let i = 0; i < questions.length; i++) {

    const question = questions[i];

    const questionElement =
      document.createElement("div");

    const questionText =
      document.createTextNode(question.question);

    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {

      const choice = question.choices[j];

      const choiceElement =
        document.createElement("input");

      choiceElement.setAttribute("type", "radio");

      choiceElement.setAttribute(
        "name",
        `question-${i}`
      );

      choiceElement.setAttribute("value", choice);

      // restore checked answers
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }

      // save selected answer
      choiceElement.addEventListener(
        "change",
        function () {

          userAnswers[i] = choice;

          saveProgress();
        }
      );

      const choiceText =
        document.createTextNode(choice);

      questionElement.appendChild(choiceElement);

      questionElement.appendChild(choiceText);
    }

    questionsElement.appendChild(questionElement);
  }
}

// submit button
submitButton.addEventListener(
  "click",
  function () {

    const score = calculateScore();

    scoreElement.textContent =
      `Your score is ${score} out of 5.`;

    localStorage.setItem("score", score);
  }
);

renderQuestions();