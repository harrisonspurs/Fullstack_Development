import "./aboutPage.css";

export function aboutPage() {
  const container = document.createElement("div");
  container.className = "about-container";

  const h2 = document.createElement("h2");
  h2.textContent = "About";

  const p1 = document.createElement("p");
  p1.textContent = "Study Focus Tracker helps monitor your focus during study sessions.";

  const p2 = document.createElement("p");
  p2.textContent = "it uses the AI Study Focus Tracker to collect data and display insights.";

  container.appendChild(h2);
  container.appendChild(p1);
  container.appendChild(p2);

  return container;
}
