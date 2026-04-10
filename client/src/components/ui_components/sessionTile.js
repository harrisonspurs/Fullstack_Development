import "./sessionTile.css";

export function createSessionTile(session) {
  const tile = document.createElement("div");
  tile.className = "session-tile";
  tile.id = `session-${session.id}`;

  const focusPercentage = session.score;
  const durationMinutes = Math.round(session.duration / 60);
  const focusedMinutes = Math.round(session.focused / 60);
  // const streakPercentage = focusedMinutes > 0 ? (focusedMinutes / durationMinutes) * 100 : 0;
  const streakPercentage = (focusedMinutes / durationMinutes) * 100;

  tile.innerHTML = `
    <div class="session-tile-header">
      <h3 class="session-date">${formatDate(session.date)}</h3>
      <div class="session-score">
        <span class="score-value">${focusPercentage.toFixed(1)}%</span>
        <span class="score-label">Focus</span>
      </div>
    </div>

    <div class="session-tile-body">
      <div class="session-stat">
        <span class="stat-label">Duration</span>
        <span class="stat-value">${durationMinutes}m</span>
      </div>

      <div class="session-stat">
        <span class="stat-label">Focused</span>
        <span class="stat-value">${focusedMinutes}m</span>
      </div>
    </div>

    <div class="session-tile-progress">
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${streakPercentage}%"></div>
      </div>
      <span class="progress-text">${focusedMinutes}m of ${durationMinutes}m focused</span>
    </div>
  `;

  return tile;
}

export function createSessionsList(sessions) {
  const list = document.createElement("div");
  list.className = "sessions-list";

  if (!sessions || sessions.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <p>No sessions recorded yet.</p>
        <p class="empty-state-hint">Add a session to get started!</p>
      </div>
    `;
    return list;
  }

  sessions.forEach((session) => {
    const tile = createSessionTile(session);
    list.appendChild(tile);
  });

  return list;
}

function formatDate(dateString) {
  // format the date string to readable format
  const date = new Date(dateString + "T00:00:00");
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const day = days[date.getDay()];
  const month = months[date.getMonth()];
  const dayNum = date.getDate();
  const year = date.getFullYear();

  return `${day}, ${month} ${dayNum}, ${year}`;
}
