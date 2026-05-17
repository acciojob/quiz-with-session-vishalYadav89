const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// get saved progress from session storage
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// show previous score if exists
const savedScore = localStorage.getItem("score");

if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of 5.`;
}

// save selected answers
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

// submit button event
submitButton.addEventListener("click", function () {

  const finalScore = calculateScore();

  scoreElement.textContent = `Your score is ${finalScore} out of 5.`;

  // store score in local storage
  localStorage.setItem("score", finalScore);
});

// Display the quiz questions and choices
function renderQuestions() {

  for (let i = 0; i < questions.length; i++) {

    const question = questions[i];

    const questionElement = document.createElement("div");

    const questionText = document.createElement("p");

    questionText.textContent = question.question;

    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {

      const choice = question.choices[j];

      const choiceElement = document.createElement("input");

      choiceElement.setAttribute("type", "radio");

      choiceElement.setAttribute("name", `question-${i}`);

      choiceElement.setAttribute("value", choice);

      // restore checked answer
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }

      // save answer on change
      choiceElement.addEventListener("change", function () {

        userAnswers[i] = choice;

        saveProgress();
      });

      const choiceText = document.createTextNode(choice);

      questionElement.appendChild(choiceElement);

      questionElement.appendChild(choiceText);
    }

    questionsElement.appendChild(questionElement);
  }
}

renderQuestions();