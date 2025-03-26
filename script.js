// script.js

const riddles = [
    {
        question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
        answers: ["A confused ghost", "A rubber chicken", "An echo", "A wind-up alarm clock"],
        correctAnswer: "An echo"
    },
    {
        question: "What has keys but can't open locks?",
        answers: ["A keyboard", "A piano", "A lockbox", "A keychain"],
        correctAnswer: "A keyboard"
    },
    {
        question: "What gets wetter the more it dries?",
        answers: ["A towel", "A sponge", "A shower", "Rain"],
        correctAnswer: "A towel"
    },
    // Add more riddles here if you like!
];

let currentRiddleIndex = 0;

function loadRiddle() {
    const riddle = riddles[currentRiddleIndex];
    document.getElementById("riddle").textContent = riddle.question;
    const answersContainer = document.getElementById("answers-container");
    answersContainer.innerHTML = '';

    riddle.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.onclick = () => checkAnswer(answer);
        answersContainer.appendChild(button);
    });
}

function checkAnswer(answer) {
    const riddle = riddles[currentRiddleIndex];
    const result = document.getElementById("result");

    if (answer === riddle.correctAnswer) {
        result.textContent = "Correct! 🎉";
    } else {
        result.textContent = "Oops! Try again! 🤔";
    }

    document.getElementById("next-btn").classList.remove("hidden");
}

document.getElementById("next-btn").onclick = () => {
    currentRiddleIndex++;
    if (currentRiddleIndex < riddles.length) {
        loadRiddle();
        document.getElementById("result").textContent = '';
        document.getElementById("next-btn").classList.add("hidden");
    } else {
        document.getElementById("result").textContent = 'You have completed all riddles! 🎉';
        document.getElementById("next-btn").classList.add("hidden");
    }
};

// Start the quiz
loadRiddle();
