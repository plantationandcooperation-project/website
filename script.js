const container = document.querySelector(".leaves-container");

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

const revealSection = document.querySelector('.reveal-section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelector('.reveal-container').classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

observer.observe(revealSection);

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


const plantBtn = document.querySelector('.plant-btn');
const message = document.querySelector('.planted-message');

plantBtn.addEventListener('click', () => {
  // Show message
  message.classList.remove('hidden');
  message.classList.add('visible');
  
  // Create falling leaves
  for (let i = 0; i < 20; i++) {
    const leaf = document.createElement('div');
    leaf.classList.add('falling-leaf');
    leaf.style.left = Math.random() * 100 + '%';
    leaf.style.animationDelay = Math.random() * 1 + 's';
    leaf.style.background = `hsl(${Math.random() * 60 + 90}, 70%, 50%)`; // green variations
    document.body.appendChild(leaf);
    
    setTimeout(() => leaf.remove(), 4000);
  }
  
  // Optional: disable after one click or reset
  // plantBtn.disabled = true;
});
