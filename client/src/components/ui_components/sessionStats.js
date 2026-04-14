export function createStatsDisplay(sessions) {
  if (!sessions || sessions.length === 0) {
    return null;
  }

  let totalScore = 0;
  let bestScore = 0;
  let totalDuration = 0;

  sessions.forEach((session) => {
    totalScore += session.score;
    if (session.score > bestScore) {
      bestScore = session.score;
    }
    totalDuration += session.duration;
  });

  const avgScore = (totalScore / sessions.length).toFixed(1);
  const sessionCount = sessions.length;

  const totalHours = Math.floor(totalDuration / 3600);
  const remainingSeconds = totalDuration % 3600;
  const totalMinutes = Math.floor(remainingSeconds / 60);

  const statsDiv = document.createElement("div");
  statsDiv.className = "stats-display";
  statsDiv.innerHTML = `
    <div class="stats-container">
      <div class="stat-item">
        <span class="stat-label">Average Focus:</span>
        <span class="stat-value">${avgScore}%</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Best Score:</span>
        <span class="stat-value">${bestScore}%</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Total Study Time:</span>
        <span class="stat-value">${totalHours}h ${totalMinutes}m</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Sessions:</span>
        <span class="stat-value">${sessionCount}</span>
      </div>
    </div>
  `;

  return statsDiv;
}
