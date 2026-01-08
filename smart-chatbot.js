const chatBox = document.querySelector(".chatbot-container");
const openChat = document.getElementById("openChat");
const closeChat = document.getElementById("closeChat");
const micBtn = document.getElementById("micBtn");
const messages = document.getElementById("chatMessages");

openChat.onclick = () => chatBox.style.display = "flex";
closeChat.onclick = () => chatBox.style.display = "none";

/* ================= SPEECH RECOGNITION ================= */

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = "en-IN";
recognition.interimResults = false;

micBtn.onclick = () => {
  speak("Listening");
  recognition.start();
};

recognition.onresult = event => {
  const userSpeech = event.results[0][0].transcript;
  addMessage(userSpeech, "user-msg");

  setTimeout(() => {
    const reply = getAnswerFromWebsite(userSpeech);
    addMessage(reply, "bot-msg");
    speak(reply);
  }, 600);
};

/* ================= CHAT UI ================= */

function addMessage(text, className) {
  const msg = document.createElement("div");
  msg.className = className;
  msg.innerText = text;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

/* ================= TEXT TO SPEECH ================= */

function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-IN";
  speech.rate = 1;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
}

/* ================= WEBSITE CONTENT AI ================= */

function getWebsiteContent() {
  let content = "";

  document.querySelectorAll("h1, h2, h3, p").forEach(el => {
    content += el.innerText.toLowerCase() + " ";
  });

  document.querySelectorAll(".service-card").forEach(card => {
    content += card.innerText.toLowerCase() + " ";
  });

  return content;
}

function getAnswerFromWebsite(question) {
  const content = getWebsiteContent();
  const q = question.toLowerCase();

  if (q.includes("who") || q.includes("about")) {
    return "Homendr Pawar is a web developer, ethical hacker, and AI automation engineer.";
  }

  if (q.includes("skill") || q.includes("technology")) {
    return "Skills include HTML, CSS, JavaScript, full stack development, ethical hacking, and AI automation.";
  }

  if (q.includes("service")) {
    return extractServices();
  }

  if (q.includes("contact")) {
    return "You can contact Homendr via email, LinkedIn, GitHub, Instagram, or YouTube.";
  }

  return "Sorry, mujhe website me iska exact answer nahi mila.";
}

function extractServices() {
  let services = [];
  document.querySelectorAll(".service-card h3").forEach(s => {
    services.push(s.innerText);
  });

  return services.length
    ? "Services are: " + services.join(", ")
    : "Services section not found.";
}
