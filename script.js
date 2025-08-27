// ================= HERO ANIMATION REPLAY =================
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero-content");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        hero.classList.add("animate-hero"); // trigger animation
      } else {
        hero.classList.remove("animate-hero"); // reset when leaving
      }
    });
  }, { threshold: 0.6 });

  observer.observe(hero);
});



// Animate circular charts when in view
document.addEventListener("DOMContentLoaded", () => {
  const circles = document.querySelectorAll(".circle");

  function animateCircle(circle) {
    const percent = circle.getAttribute("data-percent");
    const number = circle.querySelector(".number");
    const progressCircle = circle.querySelector("svg circle:last-child");
    const radius = 60;
    const circumference = 2 * Math.PI * radius;

    let current = 0;
    const interval = setInterval(() => {
      if (current >= percent) {
        clearInterval(interval);
      } else {
        current++;
        number.textContent = current + "%";
        const offset = circumference - (current / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
      }
    }, 20);
  }

  // IntersectionObserver to re-trigger animation every time
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCircle(entry.target);
      } else {
        // Reset when leaving viewport
        const number = entry.target.querySelector(".number");
        const progressCircle = entry.target.querySelector("svg circle:last-child");
        number.textContent = "0%";
        progressCircle.style.strokeDashoffset = 377; // reset
      }
    });
  }, { threshold: 0.5 });

  circles.forEach(circle => {
    observer.observe(circle);
  });
});


// Projects Carousel
const track = document.querySelector('.carousel-track');
if (track) {
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.next');
  const prevButton = document.querySelector('.prev');

  let currentIndex = 0;
  const visibleCards = 3;

  function updateCarousel() {
    const slideWidth = slides[0].getBoundingClientRect().width + 20;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      if (currentIndex < slides.length - visibleCards) {
        currentIndex++;
        updateCarousel();
      }
    });
  }

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });
  }

  window.addEventListener('resize', updateCarousel);
}


// Contact Form Popup
const form = document.getElementById("contactForm");
const popup = document.getElementById("popupMessage");

if (form) {
  form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const formData = new FormData(form);

    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      popup.style.display = "flex";
      form.reset();
    } else {
      alert("❌ Oops! Something went wrong.");
    }
  });
}

function closePopup() {
  popup.style.display = "none";
}
