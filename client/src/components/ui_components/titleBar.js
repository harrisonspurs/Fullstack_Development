import "./titleBar.css";

export function initTitleBar() {
  const titleBar = document.createElement("div");
  titleBar.className = "title-bar";

  titleBar.innerHTML = `
    <div class="title-bar-content">
      <h1>Study Focus Tracker</h1>
      <button id="menu-toggle" class="menu-toggle">Menu</button>
    </div>
  `;

  return titleBar;
}
