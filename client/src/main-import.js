import { initTitleBar } from "./components/ui_components/titleBar.js";
import { importForm } from "./components/ui_components/importForm.js";
import "./style.css";

// import page setup
function initApp() {
  const app = document.getElementById("app");

  // menu and title
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

  // import form component
  const form = importForm({
    onImportSuccess: () => {
      window.location.href = "/";
    },
  });

  contentDiv.appendChild(form);
  app.appendChild(contentDiv);
}

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});
