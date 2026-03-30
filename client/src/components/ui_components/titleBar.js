import "./titleBar.css";

export function initTitleBar(props) {
  const titleBar = document.createElement("div");
  titleBar.className = "title-bar";

  const title = document.createElement("h1");
  title.className = "title-text";
  title.textContent = props.title;

  titleBar.appendChild(title);

  return titleBar;
}
