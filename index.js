const questions = [
    {
        question: "What is the capital of Canada?",
        answers: [
            { text: "Washington", correct: false},
            { text: "Ottawa", correct: true},
            { text: "Moscow", correct: false},
            { text: "Paris", correct: false},
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Mars", correct: true},
            { text: "Venus", correct: false},
            { text: "Jupiter", correct: false},
            { text: "Saturn", correct: false},
        ]
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        answers: [
            { text: "Charles Dickens", correct: false},
            { text: "Jane Austen", correct: false},
            { text: "Mark Twain", correct: false},
            { text: "William Shakespeare", correct: true},
        ]
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        answers: [
            { text: "Gold", correct: false},
            { text: "Oxygen", correct: true},
            { text: "Osmium", correct: false},
            { text: "Ozone", correct: false},
        ]
    },
    {
        question: "What is the largest mammal in the world?",
        answers: [
            { text: "Blue Whale", correct: true},
            { text: "African Elephant", correct: false},
            { text: "Giraffee", correct: false},
            { text: "Hippopotamus", correct: false},
        ]
    },
    {
        question: "Which country is famous for Eiffel Tower?",
        answers: [
            { text: "New York", correct: false},
            { text: "Italy", correct: false},
            { text: "Germany", correct: false},
            { text: "France", correct: true},
        ]
    },
    {
        question: "What is the boiling point of water at sea level?",
        answers: [
            { text: "90°C", correct: false},
            { text: "100°C", correct: true},
            { text: "120°C", correct: false},
            { text: "80°C", correct: false},
        ]
    },
    {
        question: "Who was the first person to walk on the moon?",
        answers: [
            { text: "Neil Armstrong", correct: true},
            { text: "Buzz Aldrin", correct: false},
            { text: "Yuri Gagarin", correct: false},
            { text: "Michael Collins", correct: false},
        ]
    },
    {
        question: "Which continent is the Sahara Desert located in??",
        answers: [
            { text: "Asia", correct: false},
            { text: "Australia", correct: false},
            { text: "Europe", correct: false},
            { text: "Africa", correct: true},
        ]
    },
    {
        question: "Which language has the most native speakers worldwide?",
        answers: [
            { text: "English", correct: false},
            { text: "Mandarin Chinese", correct: true},
            { text: "Spanish", correct: false},
            { text: "French", correct: false},
        ]
    }  
];

const quest = document.getElementById("Questions");
const ans_btns = document.getElementById("Answer-btns");
const nxt_btn = document.getElementById("next-btn");
const prev_btn = document.getElementById("previous-btn")

let questionIndex = 0;
let marks = 0;

function quizBegin(){
    questionIndex = 0;
    marks = 0;
    nxt_btn.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    hideNext();
    hidePrevious();
    let currentQuestion = questions[questionIndex];
    let questionNumber = questionIndex + 1;
    quest.innerHTML = questionNumber + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        ans_btns.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", chooseYourAnswer);
    });
}

function hidePrevious(){
    prev_btn.style.display = "none";
}


function hideNext(){
    nxt_btn.style.display = "none";
    while(ans_btns.firstChild){
        ans_btns.removeChild(ans_btns.firstChild);
    }
}

function chooseYourAnswer(e){
    const selectedAnswer = e.target;
    const isCorrect = selectedAnswer.dataset.correct === "true";
    if(isCorrect){
        selectedAnswer.classList.add("correct");
        marks++;
    }else{
        selectedAnswer.classList.add("incorrect");
    }
    Array.from(ans_btns.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nxt_btn.style.display = "block";
}

function showScore(){
    hidePrevious();
    hideNext();
    quest.innerHTML = `You got ${marks} out of ${questions.length}!`;
    
     const totalMarks = questions.length;
    const scorePercent = (marks / totalMarks) * 100;

    quest.innerHTML = `You got ${marks} out of ${totalMarks}!<br>`;

    if(scorePercent === 100){
        quest.innerHTML += "🎉 Congratulations! You got 100%!";
    } else if(scorePercent >= 75){
        quest.innerHTML += "👏 Nice job!";
    } else if(scorePercent >= 50){
        quest.innerHTML += "🙂 Good Score!";
    } else if(scorePercent >= 25){
        quest.innerHTML += "😓 You have to improve more!";
    } else {
        quest.innerHTML += "😔 You scored very low. Better luck next time!";
    }



    nxt_btn.innerHTML = "Play Again";
    nxt_btn.style.display = "block";
    nxt_btn.style.border = "1px solid black";
    nxt_btn.style.display = "flex";
    nxt_btn.style.justifyContent = "center";
}

function handleNextButton(){
    questionIndex++;
    if(questionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nxt_btn.addEventListener("click", ()=>{
    if(questionIndex < questions.length){
        handleNextButton();
    }else{
        quizBegin();
    }
});


quizBegin();