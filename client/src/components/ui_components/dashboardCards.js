import "./dashboardCards.css";

export function dashboardCards(summary) {
  const section = document.createElement("section");
  section.className = "panel";

  const heading = document.createElement("h2");
  heading.textContent = "Pages";
  section.appendChild(heading);

  const grid = document.createElement("div");
  grid.className = "dashboard-grid";

  const notesCount = summary?.notesCount ?? 0;
  const tasksCount = summary?.tasksCount ?? 0;

  grid.appendChild(
    makeCard("Notes", `Create and view your notes (${notesCount})`, "/notes.html"),
  );
  grid.appendChild(
    makeCard("Tasks", `Track your study tasks (${tasksCount})`, "/tasks.html"),
  );
  grid.appendChild(makeCard("Timer", "Run focused study sessions", "/timer.html"));
  grid.appendChild(makeCard("Sessions", "Review previous sessions", "/sessions.html"));

  section.appendChild(grid);
  return section;
}

function makeCard(label, text, href) {
  const card = document.createElement("a");
  card.className = "dashboard-card";
  card.href = href;

  const cardLabel = document.createElement("p");
  cardLabel.className = "dashboard-label";
  cardLabel.textContent = label;

  const cardText = document.createElement("p");
  cardText.className = "dashboard-value";
  cardText.textContent = text;

  card.appendChild(cardLabel);
  card.appendChild(cardText);

  return card;
}
