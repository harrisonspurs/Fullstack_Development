import "./importForm.css";
import { addSession } from "../../apiRouter.js";

export function importForm({ onImportSuccess }) {
  const container = document.createElement("div");
  container.className = "import-form-container";

  const title = document.createElement("h2");
  title.textContent = "Import Session";

  const instructions = document.createElement("p");
  instructions.textContent = "paste json here:";
  instructions.className = "import-instructions";

  const textarea = document.createElement("textarea");
  textarea.id = "import-textarea";
  textarea.placeholder = "paste json...";
  textarea.className = "import-textarea";

  const button = document.createElement("button");
  button.textContent = "Import";
  button.className = "button button-primary";

  const message = document.createElement("div");
  message.className = "import-message";
  message.style.display = "none";

  button.addEventListener("click", async () => {
    try {
      const jsonText = textarea.value.trim();

      if (!jsonText) {
        message.textContent = "paste json first";
        message.className = "import-message error";
        message.style.display = "block";
        return;
      }

      const data = JSON.parse(jsonText);

      const session = {
        date: data.date,
        duration: data.duration_seconds,
        focused: data.focused_seconds,
        score: data.focus_score,
      };

      await addSession(
        session.date,
        session.duration,
        session.focused,
        session.score
      );

      message.textContent = "imported!";
      message.className = "import-message success";
      message.style.display = "block";

      textarea.value = "";

      if (onImportSuccess) {
        setTimeout(() => {
          onImportSuccess();
        }, 1500);
      }
    } catch (error) {
      console.error("error:", error);
      message.textContent = "error importing";
      message.className = "import-message error";
      message.style.display = "block";
    }
  });

  container.appendChild(title);
  container.appendChild(instructions);
  container.appendChild(textarea);
  container.appendChild(button);
  container.appendChild(message);

  return container;
}
