//your JS code here.

const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// restore progress
let userAnswers =
  JSON.parse(sessionStorage.getItem("progress")) || [];

// restore score
const savedScore = localStorage.getItem("score");

if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of 5.`;
}

// save progress
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

// render questions
function renderQuestions() {

  questionsElement.innerHTML = "";

  for (let i = 0; i < questions.length; i++) {

    const question = questions[i];

    // question container div
    const questionDiv = document.createElement("div");

    // question text
    const questionText = document.createElement("p");

    questionText.textContent = question.question;

    questionDiv.appendChild(questionText);

    // options
    for (let j = 0; j < question.choices.length; j++) {

      const choice = question.choices[j];

      const label = document.createElement("label");

      const radio = document.createElement("input");

      radio.type = "radio";

      radio.name = `question-${i}`;

      radio.value = choice;

      // restore checked answer
      if (userAnswers[i] === choice) {
        radio.checked = true;
      }

      // save answer
      radio.addEventListener("change", function () {

        userAnswers[i] = choice;

        saveProgress();
      });

      label.appendChild(radio);

      label.appendChild(document.createTextNode(choice));

      questionDiv.appendChild(label);
    }

    questionsElement.appendChild(questionDiv);
  }
}

// submit button
submitButton.addEventListener("click", function () {

  const score = calculateScore();

  scoreElement.textContent =
    `Your score is ${score} out of 5.`;

  localStorage.setItem("score", score);
});

// render all questions
renderQuestions();