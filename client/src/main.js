import "./style.css";
import { initTitleBar } from "./components/ui_components/titleBar.js";
import { initMenu, toggleMenu, closeMenu } from "./components/ui_components/menu.js";
import { initSessionInput } from "./components/ui_components/sessionInput.js";
import { createSessionsList } from "./components/ui_components/sessionTile.js";
import { getSessions } from "./apiRouter.js";

async function initApp() {
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

  const sessionsContainer = document.createElement("div");
  sessionsContainer.id = "sessions-container";
  contentDiv.appendChild(sessionsContainer);

  await loadSessions();

  setupEventListeners();
}

async function loadSessions() {
  const sessionsContainer = document.getElementById("sessions-container");

  try {
    const sessions = await getSessions();
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
  switch (section) {
    case "sessions":
      loadSessions();
      break;
    case "about":
      showAbout();
      break;
    default:
      loadSessions();
  }
}

function showAbout() {
  const contentDiv = document.getElementById("content-div");
  contentDiv.innerHTML = `
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
