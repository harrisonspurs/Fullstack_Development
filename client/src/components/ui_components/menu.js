import "./menu.css";

function handleMenuClick(event) {
  const menuBtn = event.currentTarget;
  const isOpen = menuBtn.textContent === "✕";
  menuBtn.textContent = isOpen ? "≡" : "✕";

  const menuPanel = document.getElementById("menu-panel");
  menuPanel.style.display = isOpen ? "none" : "block";
}

export function initMenu({ menuConfig }) {
  const menuBtn = document.createElement("button");
  menuBtn.id = "menu-btn";
  menuBtn.className = "menu-btn";
  menuBtn.textContent = menuConfig.menuIcon || "≡";
  menuBtn.addEventListener("click", handleMenuClick);

  const menuPanel = document.createElement("div");
  menuPanel.id = "menu-panel";
  menuPanel.className = "menu-panel";
  menuPanel.style.display = "none";

  const menuList = document.createElement("ul");
  menuList.className = "menu-list";

  if (menuConfig.menuItems) {
    menuConfig.menuItems.forEach((item) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = item.href;
      link.textContent = item.text;
      link.className = "menu-link";
      li.appendChild(link);
      menuList.appendChild(li);
    });
  }

  menuPanel.appendChild(menuList);

  return { menuBtn, menuPanel };
}
