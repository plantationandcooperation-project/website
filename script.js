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



document.addEventListener("DOMContentLoaded", function () {

  const target = 100000;
  const counter = document.getElementById("treeCount");
  const input = document.getElementById("adminInput");
  const button = document.getElementById("updateBtn");

  let current = localStorage.getItem("treeCountValue");
  current = current ? parseInt(current) : 0;

  counter.innerText = current.toLocaleString();

  button.addEventListener("click", function () {
    const value = parseInt(input.value);

    if (!isNaN(value) && value >= 0 && value <= target) {
      current = value;
      counter.innerText = current.toLocaleString();
      localStorage.setItem("treeCountValue", current);
      input.value = "";
    } else {
      alert("Enter a valid number (0–100000)");
    }
  });

});;


