const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  navLinks.classList.toggle("is-open", !isOpen);
});

navLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

const form = document.querySelector("#join-form");
const formStatus = document.querySelector("#form-status");
const fields = {
  name: {
    input: document.querySelector("#name"),
    error: document.querySelector("#name-error"),
    validate: (value) => value.trim().length >= 2 ? "" : "Please enter your name (at least 2 characters).",
  },
  email: {
    input: document.querySelector("#email"),
    error: document.querySelector("#email-error"),
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? "" : "Please enter a valid email address.",
  },
  department: {
    input: document.querySelector("#department"),
    error: document.querySelector("#department-error"),
    validate: (value) => value ? "" : "Please select your department.",
  },
  year: {
    input: document.querySelector("#year"),
    error: document.querySelector("#year-error"),
    validate: (value) => value ? "" : "Please select your year of study.",
  },
};

function validateField(field) {
  const message = field.validate(field.input.value);
  field.error.textContent = message;
  field.input.setAttribute("aria-invalid", String(Boolean(message)));
  return !message;
}

Object.values(fields).forEach((field) => {
  field.input.addEventListener("input", () => validateField(field));
  field.input.addEventListener("change", () => validateField(field));
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "";
  const isValid = Object.values(fields).map(validateField).every(Boolean);

  if (!isValid) {
    const firstInvalidField = Object.values(fields).find((field) => field.input.getAttribute("aria-invalid") === "true");
    firstInvalidField.input.focus();
    return;
  }

  formStatus.textContent = "Your details passed validation. This demo doesn't send them—email hello@byteclub.edu to finish signing up.";
  form.reset();
  Object.values(fields).forEach((field) => {
    field.input.removeAttribute("aria-invalid");
    field.error.textContent = "";
  });
});
