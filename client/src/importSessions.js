import { addSession } from "./apiRouter.js";

export function initImportSessions(onImportComplete) {
  const container = document.createElement("div");
  container.className = "session-input";

  container.innerHTML = `
    <div class="session-input-card">
      <h2>Import AI Session</h2>
      <form id="import-form">
        <div class="form-group">
          <label for="json-input">Paste Session JSON</label>
          <textarea
            id="json-input"
            placeholder="Paste the JSON session data from your AI tracker"
            rows="8"
          ></textarea>
        </div>
        <button type="submit" class="button button-primary">Import Session</button>
      </form>
      <div id="import-message" class="form-message"></div>
    </div>
  `;

  const form = container.querySelector("#import-form");
  const messageDiv = container.querySelector("#import-message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const jsonText = document.querySelector("#json-input").value;

    try {
      console.log("parsing json...");
      // parsing the json from ai tracker
      const sessionData = JSON.parse(jsonText);
      console.log("session data:", sessionData);

      // map ai tracker field names to api format
      const date = sessionData.date;
      const duration = sessionData.duration_seconds;
      const focused = sessionData.focused_seconds;
      const score = sessionData.focus_score;

      console.log("sending to api:", { date, duration, focused, score });

      // send to api
      await addSession(date, duration, focused, score);

      messageDiv.textContent = "Session imported successfully";
      messageDiv.className = "form-message success";
      form.reset();
      if (onImportComplete) onImportComplete();
      setTimeout(() => {
        messageDiv.textContent = "";
      }, 2000);
    } catch (error) {
      console.error("error importing:", error);
      messageDiv.textContent = "Error importing session. Check JSON format.";
      messageDiv.className = "form-message error";
    }
  });

  return container;
}
