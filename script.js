const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");


// Quiz data
const questions = [
  {
    question: "What is HTML?",
    options: [
      "Programming Language",
      "Markup Language",
      "Database",
      "Operating System"
    ],
    answer: "Markup Language"
  },

  {
    question: "CSS is used for?",
    options: [
      "Styling",
      "Logic",
      "Database",
      "Server"
    ],
    answer: "Styling"
  },

  {
    question: "JavaScript is a?",
    options: [
      "Programming Language",
      "Browser",
      "Database",
      "OS"
    ],
    answer: "Programming Language"
  },

  {
    question: "React is a?",
    options: [
      "Framework",
      "Library",
      "Database",
      "Language"
    ],
    answer: "Library"
  },

  {
    question: "Local Storage stores data?",
    options: [
      "Temporarily",
      "Permanently",
      "Only during session",
      "Never"
    ],
    answer: "Permanently"
  }
];



// Get previous answers
let userAnswers =
JSON.parse(sessionStorage.getItem("progress")) || [];


// Show previous score
let savedScore = localStorage.getItem("score");

if(savedScore !== null){

  scoreElement.innerText =
  `Your score is ${savedScore} out of 5.`;

}



// Save progress
function saveProgress(){

  sessionStorage.setItem(
    "progress",
    JSON.stringify(userAnswers)
  );

}



// Render questions
function renderQuestions(){


questions.forEach((item,index)=>{


  let div = document.createElement("div");


  let questionText =
  document.createElement("p");

  questionText.innerText =
  item.question;


  div.appendChild(questionText);



  item.options.forEach(option=>{


    let input =
    document.createElement("input");


    input.type="radio";

    input.name =
    `question-${index}`;

    input.value=option;



    // restore checked answer
    if(userAnswers[index]===option){

      input.checked=true;

    }



    input.addEventListener(
      "change",
      ()=>{


        userAnswers[index]=option;

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
function calculateScore(){

let score=0;


for(let i=0;i<questions.length;i++){


  if(userAnswers[i]===questions[i].answer){

    score++;

  }

}


return score;

}




// Submit quiz
submitButton.addEventListener(
"click",
()=>{


let score =
calculateScore();



scoreElement.innerText =
`Your score is ${score} out of 5.`;



localStorage.setItem(
"score",
score
);


});




// start quiz
renderQuestions();