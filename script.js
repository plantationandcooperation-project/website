console.log("JS OK");

const container = document.querySelector(".leaves-container");

function createLeaf() {
  const leaf = document.createElement("div");
  leaf.className = "leaf";
  leaf.innerText = "🍃";

  leaf.style.left = Math.random() * 100 + "vw";
  leaf.style.animationDuration = 5 + Math.random() * 5 + "s";
  leaf.style.fontSize = 16 + Math.random() * 24 + "px";

  container.appendChild(leaf);

  setTimeout(() => {
    leaf.remove();
  }, 10000);
}

setInterval(createLeaf, 400);
setInterval(createLeaf, 400);

let pledgeBtn = document.getElementById("pledgeBtn");
let pledgeCountText = document.getElementById("pledgeCount");

let pledgeCount = localStorage.getItem("pledgeCount")
  ? parseInt(localStorage.getItem("pledgeCount"))
  : 671;

let pledged = localStorage.getItem("pledged");

pledgeCountText.innerHTML = `🌳 ${pledgeCount} people have pledged`;

if (pledged) {
  pledgeBtn.classList.add("taken");
  pledgeBtn.innerHTML = "✅ Pledge Taken";
}

pledgeBtn.addEventListener("click", () => {
  if (pledged) return;

  pledgeCount++;
  localStorage.setItem("pledgeCount", pledgeCount);
  localStorage.setItem("pledged", true);

  pledgeBtn.classList.add("taken");
  pledgeBtn.innerHTML = "✅ Pledge Taken";
  pledgeCountText.innerHTML = `🌳 ${pledgeCount} people have pledged`;

  // WhatsApp message
  let message = encodeURIComponent(
    "🌱 I have taken the Green Pledge! I promise to reduce plastic use, plant trees, and protect our environment. Join me!"
  );

  window.open(`https://wa.me/?text=${message}`, "_blank");
});


// Start animation on scroll
const journey = document.getElementById("journey");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      journey.style.animationPlayState = "running";
    }
  });
}, { threshold: 0.3 });

observer.observe(journey);



const co2Counter = document.querySelector('.counter-number');
let started = false;

const animateCounter = () => {
  if (started) return;
  started = true;
  
  let count = 0;
  const target = +co2Counter.dataset.target;
  const duration = 3000; // ms
  const step = target / (duration / 16);

  const update = () => {
    count += step;
    if (count < target) {
      co2Counter.textContent = Math.floor(count).toLocaleString();
      requestAnimationFrame(update);
    } else {
      co2Counter.textContent = target.toLocaleString();
    }
  };
  update();
};

const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    animateCounter();
    observer.disconnect();
  }
}, { threshold: 0.5 });

observer.observe(document.querySelector('.earth-pulse'));



// Quiz Questions Database (English)
const quizData = [
    {
        question: "What produces the most oxygen on Earth?",
        options: [
            "Ocean algae (phytoplankton)",
            "Amazon rainforest",
            "Himalayan pine forest",
            "African savanna"
        ],
        correct: 0
    },
    {
        question: "What is the most effective personal step to reduce plastic pollution?",
        options: [
            "Recycling plastic bottles",
            "Stopping single-use plastic consumption",
            "Burning plastic waste",
            "Dumping plastic in landfills"
        ],
        correct: 1
    },
    {
        question: "Which sector wastes the most water globally?",
        options: [
            "Industrial factories",
            "Agriculture field",
            "Household usage",
            "Power generation"
        ],
        correct: 1
    },
    {
        question: "How much CO2 does an average mature tree absorb per year?",
        options: [
            "10 kg",
            "22 kg",
            "100 kg",
            "500 kg"
        ],
        correct: 1
    },
    {
        question: "What is the 'Great Pacific Garbage Patch'?",
        options: [
            "A massive area of plastic waste in the Pacific Ocean",
            "Oil pollution in the Atlantic Ocean",
            "A dead zone in the Indian Ocean",
            "A forest conservation project"
        ],
        correct: 0
    },
    {
        question: "How much water is wasted per minute if a tap is left running?",
        options: [
            "2-4 liters",
            "8-10 liters",
            "15-20 liters",
            "1 liter"
        ],
        correct: 2
    },
    {
        question: "In which year were polythene bags banned in Bangladesh?",
        options: [
            "2000",
            "2002",
            "2010",
            "2015"
        ],
        correct: 1
    },
    {
        question: "What is the best time to plant a tree sapling?",
        options: [
            "Mid-summer",
            "Beginning of monsoon",
            "Mid-winter",
            "Autumn season"
        ],
        correct: 1
    },
    {
        question: "What percentage of plastic bottles are recycled worldwide?",
        options: [
            "50%",
            "30%",
            "9%",
            "75%"
        ],
        correct: 2
    },
    {
        question: "Who launched the 'Water Guardian' project in Bangladesh to prevent water waste?",
        options: [
            "WASA",
            "City Corporation",
            "BIWTA",
            "Department of Environment"
        ],
        correct: 0
    }
];

// Game Variables
let currentQuestion = 0;
let score = 0;
let timeLeft = 6;
let timer;
let totalTime = 0;
let firstOptionSelected = false;
let gameActive = true;

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const shareBtn = document.getElementById('share-btn');
const questionText = document.getElementById('question-text');
const questionNumber = document.getElementById('question-number');
const currentQElement = document.getElementById('current-q');
const options = document.querySelectorAll('.option');
const optionTexts = [
    document.getElementById('option1'),
    document.getElementById('option2'),
    document.getElementById('option3'),
    document.getElementById('option4')
];
const scoreElement = document.getElementById('score');
const finalScoreElement = document.getElementById('final-score');
const correctAnswersElement = document.getElementById('correct-answers');
const wrongAnswersElement = document.getElementById('wrong-answers');
const totalTimeElement = document.getElementById('total-time');
const resultMessageElement = document.getElementById('result-message');
const timerElement = document.getElementById('timer');
const progressBar = document.getElementById('progress-bar');
const timeDisplay = document.getElementById('time-display');

// Loading Animation
let loadPercent = 0;
const loadingInterval = setInterval(() => {
    loadPercent += 10;
    timeDisplay.textContent = (6 - loadPercent/10);
    
    if (loadPercent >= 60) {
        clearInterval(loadingInterval);
        timeDisplay.textContent = "0";
    }
}, 500);

// Start Quiz
startBtn.addEventListener('click', startQuiz);

function startQuiz() {
    loadingScreen.classList.remove('active');
    quizScreen.classList.add('active');
    loadQuestion();
    startTimer();
}

// Load Question
function loadQuestion() {
    if (currentQuestion >= quizData.length) {
        showResult();
        return;
    }
    
    const question = quizData[currentQuestion];
    questionNumber.textContent = `Question ${currentQuestion + 1}`;
    currentQElement.textContent = currentQuestion + 1;
    questionText.textContent = question.question;
    
    // Set Options
    for (let i = 0; i < 4; i++) {
        optionTexts[i].textContent = question.options[i];
        
        // Set Icons
        const optionIcon = options[i].querySelector('.option-icon i');
        if (i === question.correct) {
            optionIcon.className = 'fas fa-check';
        } else {
            optionIcon.className = 'fas fa-times';
        }
    }
    
    // Reset Options
    options.forEach(option => {
        option.classList.remove('selected', 'correct', 'wrong');
        option.querySelector('.option-icon').style.opacity = '0';
    });
    
    // Update Progress Bar
    progressBar.style.width = `${((currentQuestion) / quizData.length) * 100}%`;
    
    // Reset Button & Timer
    nextBtn.disabled = true;
    firstOptionSelected = false;
    timeLeft = 6;
    timerElement.textContent = timeLeft;
    timerElement.parentElement.style.background = '#e74c3c';
    gameActive = true;
    
    // Start Timer
    clearInterval(timer);
    startTimer();
}

// Timer Function
function startTimer() {
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerElement.textContent = timeLeft;
            
            // Change color when time is low
            if (timeLeft <= 3) {
                timerElement.parentElement.style.background = '#c0392b';
            } else if (timeLeft <= 6) {
                timerElement.parentElement.style.background = '#e74c3c';
            }
        } else {
            clearInterval(timer);
            if (gameActive) {
                autoSelectCorrectAnswer();
            }
        }
    }, 1000);
}

// Auto-select correct answer when time runs out
function autoSelectCorrectAnswer() {
    gameActive = false;
    const correctIndex = quizData[currentQuestion].correct;
    
    // If first option not selected, show wrong then correct
    if (!firstOptionSelected) {
        options[0].classList.add('wrong');
        options[0].querySelector('.option-icon').style.opacity = '1';
        
        // Show correct answer after 1 second
        setTimeout(() => {
            options[correctIndex].classList.add('correct');
            options[correctIndex].querySelector('.option-icon').style.opacity = '1';
            
            // Update score only if correct was selected first
            // In auto-mode, no score increase
            nextBtn.disabled = false;
        }, 1000);
    }
}

// Option Selection
options.forEach(option => {
    option.addEventListener('click', () => {
        if (!gameActive) return;
        
        const selectedIndex = parseInt(option.getAttribute('data-index'));
        const correctIndex = quizData[currentQuestion].correct;
        
        // First option selection
        if (!firstOptionSelected) {
            firstOptionSelected = true;
            option.classList.add('selected');
            option.querySelector('.option-icon').style.opacity = '1';
            
            // If first choice is wrong
            if (selectedIndex !== correctIndex) {
                option.classList.add('wrong');
                
                // Show correct answer after 1 second
                setTimeout(() => {
                    options[correctIndex].classList.add('correct');
                    options[correctIndex].querySelector('.option-icon').style.opacity = '1';
                    
                    // No score for wrong first attempt
                    nextBtn.disabled = false;
                }, 1000);
            } else {
                // First choice is correct
                option.classList.add('correct');
                score++;
                scoreElement.textContent = score;
                nextBtn.disabled = false;
            }
            
            // Stop timer
            clearInterval(timer);
            gameActive = false;
        }
    });
});

// Next Question
nextBtn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

// Show Results
function showResult() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
    
    // Calculate results
    finalScoreElement.textContent = score;
    correctAnswersElement.textContent = score;
    wrongAnswersElement.textContent = quizData.length - score;
    totalTime = quizData.length * 6;
    totalTimeElement.textContent = totalTime;
    
    // Set message based on score
    let message = "";
    if (score >= 8) {
        message = "Excellent! You have outstanding knowledge about environmental conservation. Your awareness can help save our planet!";
    } else if (score >= 5) {
        message = "Good job! You know about environmental issues, but there's more to learn. Let's grow our knowledge together.";
    } else {
        message = "Keep learning! Environmental protection is crucial. Join our community to learn more and make a difference.";
    }
    resultMessageElement.textContent = message;
    
    // Reset progress bar
    progressBar.style.width = '100%';
}

// Restart Quiz
restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    totalTime = 0;
    scoreElement.textContent = score;
    resultScreen.classList.remove('active');
    loadingScreen.classList.add('active');
    
    // Reset loading animation
    loadPercent = 0;
    const loadingInterval = setInterval(() => {
        loadPercent += 10;
        timeDisplay.textContent = (6 - loadPercent/10);
        
        if (loadPercent >= 60) {
            clearInterval(loadingInterval);
            timeDisplay.textContent = "0";
        }
    }, 500);
});

// Share Button
shareBtn.addEventListener('click', () => {
    const shareText = `I scored ${score}/10 on the Eco Awareness Quiz! Test your knowledge on trees, plastic pollution and water waste.`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Eco Awareness Quiz Score',
            text: shareText,
            url: window.location.href
        });
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Score copied to clipboard! Share it with your friends.');
        });
    }
});

// Community Buttons Event
document.querySelectorAll('.community-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const btnText = btn.textContent;
        alert(`"${btnText}" feature coming soon! Join our community to stay updated.`);
    });
});
