import { initTitleBar } from "./components/ui_components/titleBar.js";
import { aboutPage } from "./components/ui_components/aboutPage.js";
import "./style.css";

// about page
function initApp() {
  const app = document.getElementById("app");

  // setup menu and title
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

  // const aboutData = fetchAboutInfo();
  // render about stuff

  const about = aboutPage();
  contentDiv.appendChild(about);

  app.appendChild(contentDiv);
}

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});
