// your JS code here.

const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");


const questions = [
  {
    question: "1. What is HTML?",
    choices: ["Language", "Markup", "Database", "OS"],
    answer: "Markup"
  },
  {
    question: "2. What is CSS used for?",
    choices: ["Styling", "Logic", "Database", "Server"],
    answer: "Styling"
  },
  {
    question: "3. JavaScript is?",
    choices: ["Programming Language", "Browser", "OS", "Database"],
    answer: "Programming Language"
  },
  {
    question: "4. React is?",
    choices: ["Library", "Language", "Database", "Compiler"],
    answer: "Library"
  },
  {
    question: "5. Local storage stores data for?",
    choices: ["Temporary", "Permanent", "Only session", "None"],
    answer: "Permanent"
  }
];


// restore progress
let userAnswers =
  JSON.parse(sessionStorage.getItem("progress")) || [];


// restore score after refresh
const savedScore = localStorage.getItem("score");

if (savedScore !== null) {
  scoreElement.textContent =
    `Your score is ${savedScore} out of 5.`;
}


// save answers
function saveProgress() {

  sessionStorage.setItem(
    "progress",
    JSON.stringify(userAnswers)
  );
}


// calculate score
function calculateScore() {

  let score = 0;

  for(let i=0;i<questions.length;i++){

    if(userAnswers[i] === questions[i].answer){
      score++;
    }

  }

  return score;
}



// render quiz
function renderQuestions(){

  questions.forEach((question,index)=>{

    const div = document.createElement("div");

    div.innerHTML =
      `<p>${question.question}</p>`;


    question.choices.forEach(choice=>{


      const input = document.createElement("input");

      input.type="radio";
      input.name=`question-${index}`;
      input.value=choice;


      // restore checked option
      if(userAnswers[index]===choice){
        input.checked=true;
      }


      input.addEventListener("change",()=>{

        userAnswers[index]=choice;

        saveProgress();

      });


      div.appendChild(input);

      div.appendChild(
        document.createTextNode(choice)
      );

      div.appendChild(
        document.createElement("br")
      );

    });


    questionsElement.appendChild(div);

  });

}



// submit quiz
submitButton.addEventListener("click",()=>{


  const score = calculateScore();


  scoreElement.textContent =
    `Your score is ${score} out of 5.`;


  localStorage.setItem(
    "score",
    score
  );

});



renderQuestions();