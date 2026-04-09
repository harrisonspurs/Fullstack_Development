import "./sessionInput.css";
import { addSession } from "../../apiRouter.js";

export function initSessionInput(onSessionAdded) {
  const container = document.createElement("div");
  container.className = "session-input";

  container.innerHTML = `
    <div class="session-input-card">
      <h2>Add Study Session</h2>
      <form id="session-form">
        <div class="form-group">
          <label for="session-date">Date</label>
          <input
            type="date"
            id="session-date"
            required
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="session-duration">Duration (minutes)</label>
            <input
              type="number"
              id="session-duration"
              min="1"
              required
            />
          </div>

          <div class="form-group">
            <label for="session-focused">Focused Time (minutes)</label>
            <input
              type="number"
              id="session-focused"
              min="0"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label for="session-score">Focus Score (%)</label>
          <input
            type="number"
            id="session-score"
            min="0"
            max="100"
            required
          />
        </div>

        <button type="submit" class="button button-primary">Add Session</button>
      </form>
      <div id="form-message" class="form-message"></div>
    </div>
  `;

  const form = container.querySelector("#session-form");
  const messageDiv = container.querySelector("#form-message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const date = document.getElementById("session-date").value;
    const duration = parseInt(document.getElementById("session-duration").value) * 60;
    const focused = parseInt(document.getElementById("session-focused").value) * 60;
    const score = parseFloat(document.getElementById("session-score").value);

    try {
      await addSession(date, duration, focused, score);
      messageDiv.textContent = "Session added successfully";
      messageDiv.className = "form-message success";
      form.reset();
      if (onSessionAdded) onSessionAdded();
      setTimeout(() => {
        messageDiv.textContent = "";
      }, 2000);
    } catch (error) {
      messageDiv.textContent = "Error adding session";
      messageDiv.className = "form-message error";
    }
  });

  return container;
}
