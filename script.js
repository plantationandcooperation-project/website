const container = document.querySelector(".leaves-container");

if (container) {
  function createLeaf() {
    const leaf = document.createElement("div");
    leaf.classList.add("leaf");
    leaf.innerHTML = "🍃";

    leaf.style.left = Math.random() * 100 + "vw";
    leaf.style.animationDuration = 5 + Math.random() * 5 + "s";
    leaf.style.fontSize = 16 + Math.random() * 20 + "px";

    container.appendChild(leaf);

    setTimeout(() => {
      leaf.remove();
    }, 10000);
  }

  setInterval(createLeaf, 400);
}


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



const quiz = [
  {
    q: "What is the main cause of plastic pollution?",
    options: ["Recycling", "Single-use plastics", "Paper waste", "Glass"],
    answer: 1
  },
  {
    q: "Which animal is most affected by plastic waste?",
    options: ["Lions", "Sea animals", "Cows", "Birds"],
    answer: 1
  },
  {
    q: "How long does plastic take to decompose?",
    options: ["10 years", "50 years", "100 years", "Hundreds of years"],
    answer: 3
  },
  {
    q: "What should we use instead of plastic bags?",
    options: ["Cloth bags", "Plastic bottles", "Paper cups", "Foil"],
    answer: 0
  },
  {
    q: "Microplastics affect?",
    options: ["Only oceans", "Only animals", "Human health", "Nothing"],
    answer: 2
  },
  {
    q: "Which plastic is most dangerous?",
    options: ["Single-use plastic", "Reusable plastic", "Metal", "Glass"],
    answer: 0
  },
  {
    q: "Plastic waste mostly ends up in?",
    options: ["Mountains", "Oceans", "Forests", "Deserts"],
    answer: 1
  },
  {
    q: "Best way to reduce plastic pollution?",
    options: ["Burning plastic", "Using more plastic", "Reduce & reuse", "Throwing away"],
    answer: 2
  },
  {
    q: "Plastic harms environment by?",
    options: ["Improving soil", "Killing wildlife", "Cleaning water", "Growing trees"],
    answer: 1
  },
  {
    q: "Plastic-free future means?",
    options: ["Cleaner planet", "More waste", "More pollution", "No trees"],
    answer: 0
  }
];

let current = 0;
let score = 0;
let time = 6;
let timer;

const questionEl = document.getElementById("question");
const optionsEl = document.querySelectorAll(".option");
const timeEl = document.getElementById("time");

function loadQuestion() {
  if (current >= quiz.length) {
    showResult();
    return;
  }

  time = 6;
  timeEl.textContent = time;

  questionEl.textContent = quiz[current].q;
  optionsEl.forEach((btn, i) => {
    btn.textContent = quiz[current].options[i];
    btn.className = "option";
    btn.disabled = false;
  });

  timer = setInterval(() => {
    time--;
    timeEl.textContent = time;
    if (time === 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function checkAnswer(selected) {
  clearInterval(timer);
  optionsEl.forEach(btn => btn.disabled = true);

  if (selected === quiz[current].answer) {
    optionsEl[selected].classList.add("correct");
    score++;
  } else {
    optionsEl[selected].classList.add("wrong");
    optionsEl[quiz[current].answer].classList.add("correct");
  }

  setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
  current++;
  loadQuestion();
}
function showResult() {
  document.getElementById("quiz-box").style.display = "none";
  document.getElementById("result-box").style.display = "block";
  document.getElementById("score").textContent = score;

  const link = `https://wa.me/?text=I scored ${score}/10 in the Plastic Awareness Quiz 🌍♻️ 
Join this group to play the quiz: https://chat.whatsapp.com/HRwwzcGv6tAJcR2PHsbpIQ`;

  document.getElementById("whatsappShare").href = link;
}

loadQuestion();
