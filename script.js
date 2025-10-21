function displayTime() {
  const Time = document.getElementById("time");

  if (Time) {
    const now = new Date();
    const time = now.toLocaleTimeString();
    const milliseconds = now.getMilliseconds();
    Time.innerHTML = `${time} <span>${milliseconds}ms</span> `;
  }
}
displayTime();
setInterval(displayTime, 50);

const Form = document.getElementById("contact-form");
const Name = document.getElementById("name");
const NameError = document.getElementById("name-error");
const Email = document.getElementById("email");
const EmailError = document.getElementById("email-error");
const Subject = document.getElementById("subject");
const SubjectError = document.getElementById("subject-error");
const Message = document.getElementById("message");
const MessageError = document.getElementById("message-error");
const SuccessMessage = document.querySelector(".success-message");
const Overlay = document.getElementById("overlay");
const ClosePopup = document.getElementById("close-popup");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^[A-Za-z]+(?:[' -][A-Za-z]+)* [A-Za-z]+(?:[' -][A-Za-z]+)*$/;

function validateName() {
  if (!Name.value.trim()) {
    NameError.textContent = "Enter your full name";
    Name.classList.add("error");
    NameError.classList.add("show");
    return false;
  } else if (!nameRegex.test(Name.value)) {
    NameError.textContent =
      "Please enter a valid full name (first and last name)";
    Name.classList.add("error");
    NameError.classList.add("show");
    return false;
  } else {
    Name.classList.remove("error");
    NameError.classList.remove("show");
    return true;
  }
}

function validateEmail() {
  if (!Email.value.trim()) {
    EmailError.textContent = "You need to enter an email address";
    Email.classList.add("error");
    EmailError.classList.add("show");
    return false;
  } else if (!emailRegex.test(Email.value)) {
    EmailError.textContent = "You must enter a valid email address";
    Email.classList.add("error");
    EmailError.classList.add("show");
    return false;
  } else if (Email.value.length < 10) {
    EmailError.textContent = `Email should be at least 10 characters; you entered ${Email.value.length}`;
    Email.classList.add("error");
    EmailError.classList.add("show");
    return false;
  } else {
    Email.classList.remove("error");
    EmailError.classList.remove("show");
    return true;
  }
}

function validateSubject() {
  if (!Subject.value.trim()) {
    SubjectError.textContent = "Enter a subject";
    Subject.classList.add("error");
    SubjectError.classList.add("show");
    return false;
  } else if (Subject.value.length < 3) {
    SubjectError.textContent = `Subject should be at least 3 characters; you entered ${Subject.value.length}`;
    Subject.classList.add("error");
    SubjectError.classList.add("show");
    return false;
  } else {
    Subject.classList.remove("error");
    SubjectError.classList.remove("show");
    return true;
  }
}

function validateMessage() {
  if (!Message.value.trim()) {
    MessageError.textContent = "Enter your message";
    Message.classList.add("error");
    MessageError.classList.add("show");
    return false;
  } else if (Message.value.length < 10) {
    MessageError.textContent = `Message should be at least 10 characters; you entered ${Message.value.length}`;
    Message.classList.add("error");
    MessageError.classList.add("show");
    return false;
  } else {
    Message.classList.remove("error");
    MessageError.classList.remove("show");
    return true;
  }
}

Name.addEventListener("input", validateName);
Email.addEventListener("input", validateEmail);
Subject.addEventListener("input", validateSubject);
Message.addEventListener("input", validateMessage);

Form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isSubjectValid = validateSubject();
  const isMessageValid = validateMessage();

  if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
    SuccessMessage.classList.add("show");
    Overlay.classList.add("show");
    Form.reset();
  }
});

ClosePopup.addEventListener("click", () => {
  SuccessMessage.classList.remove("show");
  Overlay.classList.remove("show");
});

Overlay.addEventListener("click", () => {
  SuccessMessage.classList.remove("show");
  Overlay.classList.remove("show");
});

const tabBtns = document.querySelectorAll(".tab-btn");
const tabs = document.querySelectorAll(".card, .about-card, .contact-card");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    tabBtns.forEach((tabBtn) => tabBtn.classList.remove("active"));
    tabs.forEach((tab) => {
      tab.classList.remove("active", "slide-in-left", "slide-in-right", "slide-in-bottom");
      tab.style.display = "none";
    });

    btn.classList.add("active");

    const tabName = btn.getAttribute("data-tab");
    let activeTab;
    let animationClass;

    if (tabName === "profile") {
      activeTab = document.getElementById("profile-container");
      animationClass = "slide-in-left";
    } else if (tabName === "about") {
      activeTab = document.getElementById("about");
      animationClass = "slide-in-bottom";
    } else if (tabName === "contact") {
      activeTab = document.getElementById("contact-card");
      animationClass = "slide-in-right";
    }

    activeTab.style.display = "block";
    activeTab.classList.add("active", animationClass);
  });
});

document.getElementById("profile-container").style.display = "block";
document.getElementById("profile-container").classList.add("active", "slide-in-left");
