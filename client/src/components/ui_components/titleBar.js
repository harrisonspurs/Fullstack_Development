import { initMenu } from "./menu.js";
import "./titleBar.css";

export function initTitleBar({ title, menuConfig }) {
  const titleDiv = document.createElement("div");
  titleDiv.id = "title-div";

  const h1 = document.createElement("h1");
  h1.textContent = title;

  const { menuBtn, menuPanel } = initMenu({ menuConfig });

  titleDiv.appendChild(h1);
  titleDiv.appendChild(menuBtn);
  titleDiv.appendChild(menuPanel);

  return titleDiv;
}
