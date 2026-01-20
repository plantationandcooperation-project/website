const container = document.querySelector(".leaves-container");

function createLeaf() {
  const leaf = document.createElement("div");
  leaf.className = "leaf";
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
    q: "Which plastic item is most commonly found in oceans?",
    options: ["Plastic bottles", "Glass jars", "Paper bags", "Metal cans"],
    answer: 0
  },
  {
    q: "How long does plastic take to decompose?",
    options: ["10 years", "50 years", "100 years", "500+ years"],
    answer: 3
  },
  {
    q: "What happens when animals eat plastic?",
    options: ["They digest it", "They become stronger", "They may die", "Nothing happens"],
    answer: 2
  },
  {
    q: "Which is a safer alternative to plastic bags?",
    options: ["Polythene", "Cloth bag", "Plastic cover", "Foil"],
    answer: 1
  },
  {
    q: "What are microplastics?",
    options: ["Big plastic items", "Plastic toys", "Tiny plastic particles", "Metal waste"],
    answer: 2
  },
  {
    q: "Plastic pollution mainly affects?",
    options: ["Only humans", "Only animals", "Environment & health", "Only cities"],
    answer: 2
  },
  {
    q: "Which practice reduces plastic waste?",
    options: ["Burning plastic", "Throwing in rivers", "Reusing items", "Burying plastic"],
    answer: 2
  },
  {
    q: "Plastic burning causes?",
    options: ["Clean air", "Toxic gases", "More oxygen", "Rain"],
    answer: 1
  },
  {
    q: "Which sector uses most plastic?",
    options: ["Packaging", "Farming", "Education", "Forests"],
    answer: 0
  },
  {
    q: "Best way to fight plastic pollution?",
    options: ["Ignore it", "Use more plastic", "Reduce, Reuse, Recycle", "Dump in landfills"],
    answer: 2
  }
];

let current = 0;
let score = 0;
let time = 6;
let timerInterval;

function loadQuestion() {
  clearInterval(timerInterval);
  time = 6;
  document.getElementById("timer").textContent = time;

  const q = quiz[current];
  document.getElementById("question").textContent = q.q;

  for (let i = 0; i < 4; i++) {
    const opt = document.getElementById("opt" + i);
    opt.textContent = q.options[i];
    opt.className = "option";
  }

  timerInterval = setInterval(() => {
    time--;
    document.getElementById("timer").textContent = time;

    if (time === 0) {
      clearInterval(timerInterval);
      nextQuestion();
    }
  }, 1000);
}

function checkAnswer(selected) {
  clearInterval(timerInterval);

  if (selected === quiz[current].answer) {
    score++;
  }

  setTimeout(nextQuestion, 600);
}

function nextQuestion() {
  current++;
  if (current < quiz.length) {
    loadQuestion();
  } else {
    showResult();
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
