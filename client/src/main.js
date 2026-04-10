import "./style.css";
import { initTitleBar } from "./components/ui_components/titleBar.js";
import { initMenu, toggleMenu, closeMenu } from "./components/ui_components/menu.js";
import { initSessionInput } from "./components/ui_components/sessionInput.js";
import { initImportSessions } from "./importSessions.js";
import { createSessionsList } from "./components/ui_components/sessionTile.js";
import { getSessions } from "./apiRouter.js";

async function initApp() {
  console.log("starting app");
  const app = document.getElementById("app");

  const titleBar = initTitleBar();
  app.appendChild(titleBar);

  const menu = initMenu();
  app.appendChild(menu);

  const contentDiv = document.createElement("div");
  contentDiv.id = "content-div";
  contentDiv.className = "container";
  app.appendChild(contentDiv);

  const sessionInput = initSessionInput(loadSessions);
  contentDiv.appendChild(sessionInput);

  const importSection = initImportSessions(loadSessions);
  importSection.id = "import-section";
  importSection.style.display = "none";
  contentDiv.appendChild(importSection);

  const sessionsContainer = document.createElement("div");
  sessionsContainer.id = "sessions-container";
  contentDiv.appendChild(sessionsContainer);

  await loadSessions();

  setupEventListeners();
  console.log("app loaded");
}

async function loadSessions() {
  console.log("loading sessions");
  const sessionsContainer = document.getElementById("sessions-container");

  try {
    const sessions = await getSessions();
    console.log("got sessions from api:", sessions);
    const sessionsList = createSessionsList(sessions);
    sessionsContainer.innerHTML = "";
    sessionsContainer.appendChild(sessionsList);
  } catch (error) {
    console.error("Error loading sessions:", error);
    sessionsContainer.innerHTML = `<p>Error loading sessions</p>`;
  }
}

function setupEventListeners() {
  const menuToggle = document.getElementById("menu-toggle");
  const closeMenuBtn = document.getElementById("close-menu");
  const menu = document.getElementById("menu");
  const menuLinks = document.querySelectorAll(".menu-link");

  menuToggle.addEventListener("click", toggleMenu);
  closeMenuBtn.addEventListener("click", closeMenu);

  menuLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      closeMenu();
      const section = link.getAttribute("data-section");
      console.log("navigating to:", section);
      handleNavigation(section);
    });
  });

  menu.addEventListener("click", (e) => {
    if (e.target === menu) {
      closeMenu();
    }
  });
}

function handleNavigation(section) {
  const sessionInput = document.querySelector(".session-input");
  const importSection = document.getElementById("import-section");
  const sessionsContainer = document.getElementById("sessions-container");

  // hide everything first
  // sessionInput.style.display = "none";
  // importSection.style.display = "none";
  // sessionsContainer.style.display = "none";

  switch (section) {
    case "sessions":
      sessionInput.style.display = "block";
      importSection.style.display = "none";
      sessionsContainer.style.display = "block";
      loadSessions();
      break;
    case "import":
      sessionInput.style.display = "none";
      importSection.style.display = "block";
      sessionsContainer.style.display = "none";
      break;
    case "about":
      showAbout();
      break;
    default:
      sessionInput.style.display = "block";
      importSection.style.display = "none";
      sessionsContainer.style.display = "block";
      loadSessions();
  }
}

function showAbout() {
  const sessionInput = document.querySelector(".session-input");
  const importSection = document.getElementById("import-section");
  const sessionsContainer = document.getElementById("sessions-container");

  sessionInput.style.display = "none";
  importSection.style.display = "none";
  sessionsContainer.innerHTML = `
    <div class="card" style="margin-top: 24px;">
      <h2>About</h2>
      <p>Study Focus Tracker helps track your study sessions and focus time.</p>
      <button class="button button-primary" onclick="location.reload()">Back</button>
    </div>
  `;
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
