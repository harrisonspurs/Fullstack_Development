import { initTitleBar } from "./components/ui_components/titleBar.js";
import { dashboardCards } from "./components/ui_components/dashboardCards.js";
import { getDashboardSummary } from "./apiRouter.js";
import "./style.css";

async function initApp() {
  const app = document.getElementById("app");
  const props = { title: "Student Study Helper" };

  const titleBar = initTitleBar(props);

  const contentDiv = document.createElement("div");
  contentDiv.id = "content-div";

  const introPanel = document.createElement("section");
  introPanel.className = "panel";
  introPanel.innerHTML = `
    <h2>Dashboard</h2>
    <p>Choose a page to open and build each feature step by step.</p>
  `;

  const summary = await getDashboardSummary();
  const dashboard = dashboardCards(summary);

  contentDiv.appendChild(introPanel);
  contentDiv.appendChild(dashboard);

  app.appendChild(titleBar);
  app.appendChild(contentDiv);
}

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});
