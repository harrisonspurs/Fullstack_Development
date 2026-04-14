import { initTitleBar } from "./components/ui_components/titleBar.js";
import { createSessionsList } from "./components/ui_components/sessionTile.js";
import { createStatsDisplay } from "./components/ui_components/sessionStats.js";
import { createChartDisplay } from "./components/ui_components/chartsDisplay.js";
import { getSessions } from "./apiRouter.js";
import "./style.css";

// main app setup
function initApp() {
  const app = document.getElementById("app");

  // setup title and menu stuff
  const props = {
    title: "Study Focus Tracker",
    menuConfig: {
      menuIcon: "≡",
      menuStyle: "small",
      menuItems: [
        { text: "Sessions", href: "/" },
        { text: "Import", href: "/import.html" },
        { text: "Guide", href: "/guide.html" },
        { text: "About", href: "/about.html" },
      ],
    },
  };

  const titleBar = initTitleBar(props);
  app.appendChild(titleBar);

  const contentDiv = document.createElement("div");
  contentDiv.id = "content-div";
  contentDiv.className = "container";

  // load and display stuff
  loadSessions(contentDiv);
  app.appendChild(contentDiv);
}

const loadSessions = async (container) => {
  try {
    const response = await getSessions();
    const { data } = response;

    // const { data } = await getSessions();
    // console.log("debugging:", data);

    const statsDisplay = createStatsDisplay(data);
    if (statsDisplay) {
      container.appendChild(statsDisplay);
    }

    const chartDisplay = createChartDisplay(data);
    if (chartDisplay) {
      container.appendChild(chartDisplay);
    }

    const sessionsList = createSessionsList(data);
    container.appendChild(sessionsList);
  } catch (error) {
    console.error("error loading sessions:", error);
    container.innerHTML = `<p>error loading sessions</p>`;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});
