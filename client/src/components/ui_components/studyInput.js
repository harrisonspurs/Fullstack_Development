import "./studyInput.css";

export function studyInput({
  placeholder = "Write a note",
  onInputKeyPress,
  onButtonClick,
}) {
  const wrapper = document.createElement("div");
  wrapper.className = "study-input-wrapper";

  const input = document.createElement("input");
  input.className = "study-input";
  input.type = "text";
  input.placeholder = placeholder;

  const button = document.createElement("button");
  button.className = "study-submit";
  button.type = "button";
  button.textContent = "Add";

  input.addEventListener("keypress", (event) => {
    onInputKeyPress?.(event, input);
  });

  button.addEventListener("click", (event) => {
    onButtonClick?.(event, input);
  });

  wrapper.appendChild(input);
  wrapper.appendChild(button);
  return wrapper;
}
