const header = document.getElementById("header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navAnchors = document.querySelectorAll(".nav-links a");
const contactForm = document.querySelector(".contact-form");
const sections = document.querySelectorAll("section[id]");

const revealTargets = document.querySelectorAll(
  ".box-hero-content, .about-text, .about-image, .services-section h2, .section-subtitle, .service-card, .contact-info, .contact-form"
);

revealTargets.forEach((item) => item.classList.add("reveal"));

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

navAnchors.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

window.addEventListener("scroll", () => {
  if (!header) return;
  if (window.scrollY > 12) {
    header.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.28)";
  } else {
    header.style.boxShadow = "none";
  }
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealTargets.forEach((item) => revealObserver.observe(item));

const setActiveLink = () => {
  const trigger = window.scrollY + 120;
  let currentSection = "home";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (trigger >= sectionTop && trigger < sectionTop + sectionHeight) {
      currentSection = section.id;
    }
  });

  navAnchors.forEach((anchor) => {
    const href = anchor.getAttribute("href");
    if (href === `#${currentSection}`) {
      anchor.classList.add("active");
    } else {
      anchor.classList.remove("active");
    }
  });
};

setActiveLink();
window.addEventListener("scroll", setActiveLink);

if (contactForm) {
  const status = document.createElement("p");
  status.className = "form-status";
  status.setAttribute("aria-live", "polite");
  contactForm.appendChild(status);

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    status.textContent = "Message sent successfully. We will contact you soon.";
    contactForm.reset();
  });
}
