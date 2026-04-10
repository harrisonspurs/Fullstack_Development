import "./menu.css";

export function initMenu() {
  const menu = document.createElement("nav");
  menu.id = "menu";
  menu.className = "menu hidden";

  menu.innerHTML = `
    <div class="menu-content">
      <ul class="menu-list">
        <li><a href="#" class="menu-link" data-section="sessions">Sessions</a></li>
        <li><a href="#" class="menu-link" data-section="import">Import Session</a></li>
        <li><a href="#" class="menu-link" data-section="about">About</a></li>
      </ul>
      <button id="close-menu" class="close-menu">Close</button>
    </div>
  `;

  return menu;
}

export function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("hidden");
}

export function closeMenu() {
  const menu = document.getElementById("menu");
  menu.classList.add("hidden");
}
