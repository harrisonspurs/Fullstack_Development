import "./style.css";
import { initTitleBar } from "./components/ui_components/titleBar.js";
import { initMenu, toggleMenu, closeMenu } from "./components/ui_components/menu.js";
import { initImportSessions } from "./importSessions.js";
import { createSessionsList } from "./components/ui_components/sessionTile.js";
import { createStatsDisplay } from "./components/ui_components/sessionStats.js";
import { createChartDisplay } from "./chartsDisplay.js";
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
    sessionsContainer.innerHTML = "";

    // add stats display at top
    const statsDisplay = createStatsDisplay(sessions);
    if (statsDisplay) {
      sessionsContainer.appendChild(statsDisplay);
    }

    // add chart
    const chartDisplay = createChartDisplay(sessions);
    if (chartDisplay) {
      sessionsContainer.appendChild(chartDisplay);
    }

    const sessionsList = createSessionsList(sessions);
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
  const importSection = document.getElementById("import-section");
  const sessionsContainer = document.getElementById("sessions-container");

  switch (section) {
    case "sessions":
      importSection.style.display = "none";
      sessionsContainer.style.display = "block";
      loadSessions();
      break;
    case "import":
      importSection.style.display = "block";
      sessionsContainer.style.display = "none";
      break;
    case "guide":
      importSection.style.display = "none";
      showGuide();
      break;
    case "about":
      showAbout();
      break;
    default:
      importSection.style.display = "none";
      sessionsContainer.style.display = "block";
      loadSessions();
  }
}

function showAbout() {
  const importSection = document.getElementById("import-section");
  const sessionsContainer = document.getElementById("sessions-container");

  importSection.style.display = "none";
  sessionsContainer.innerHTML = `
    <div class="card" style="margin-top: 24px;">
      <h2>About</h2>
      <p>Study Focus Tracker helps track your study sessions and focus time.</p>
      <button class="button button-primary" onclick="location.reload()">Back</button>
    </div>
  `;
}

function showGuide() {
  const importSection = document.getElementById("import-section");
  const sessionsContainer = document.getElementById("sessions-container");

  importSection.style.display = "none";
  sessionsContainer.innerHTML = `
    <div class="card" style="margin-top: 24px;">
      <h2>How to Use</h2>

      <h3>Getting Started</h3>
      <p>Study Focus Tracker works with the AI Study Focus Tracker to import and display your study sessions.</p>

      <h3>Step 1: Run the AI Tracker</h3>
      <p>The AI Study Focus Tracker monitors your study sessions in real-time, detecting focus levels through webcam analysis.</p>
      <p>When a session ends, the tracker saves a JSON file with your session data.</p>

      <h3>Step 2: Copy Session JSON</h3>
      <p>Find the session JSON file from your AI tracker output and copy the data.</p>
      <p>The JSON contains:</p>
      <ul style="margin: 10px 0 10px 20px;">
        <li><strong>date:</strong> Session date (YYYY-MM-DD)</li>
        <li><strong>duration_seconds:</strong> Total session time</li>
        <li><strong>focused_seconds:</strong> Time spent focused</li>
        <li><strong>focus_score:</strong> Overall focus percentage (0-100)</li>
      </ul>

      <h3>Step 3: Import into Tracker</h3>
      <p>Click the "Import Session" menu item, paste your JSON data, and click "Import Session".</p>
      <p>Your session will be stored and automatically appear in the Sessions view.</p>

      <h3>Step 4: View Analytics</h3>
      <p>Once imported, you'll see:</p>
      <ul style="margin: 10px 0 10px 20px;">
        <li>Overall statistics (average focus, best score, total time)</li>
        <li>Visual chart showing focus scores over time</li>
        <li>Individual session details with progress bars</li>
      </ul>

      <p style="margin-top: 20px; font-size: 12px; color: #666;">Sessions are stored in a database and persist across page reloads.</p>

      <button class="button button-primary" onclick="location.reload()">Back</button>
    </div>
  `;
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
