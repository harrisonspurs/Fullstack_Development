import { initTitleBar } from "./components/ui_components/titleBar.js";
import { guidePage } from "./components/ui_components/guidePage.js";
import "./style.css";

// guide page - shows how to setup and use ai tracker
function initApp() {
  const app = document.getElementById("app");

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

  // build guide content
  const guide = guidePage();
  contentDiv.appendChild(guide);

  app.appendChild(contentDiv);
}

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});
