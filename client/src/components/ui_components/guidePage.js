import "./guidePage.css";

export function guidePage() {
  const container = document.createElement("div");
  container.className = "guide-container";

  function addSection(title, content) {
    const section = document.createElement("div");
    section.className = "guide-section";

    const heading = document.createElement("h3");
    heading.textContent = title;
    heading.className = "guide-heading";

    section.appendChild(heading);

    if (typeof content === "string") {
      const p = document.createElement("p");
      p.innerHTML = content;
      section.appendChild(p);
    } else {
      section.appendChild(content);
    }

    return section;
  }

  container.appendChild(addSection("Overview", "tracks your focus using ai"));

  const step0 = addSection("Step 0: Get AI Tracker", "");
  const gitLink = document.createElement("p");
  gitLink.innerHTML = '<a href="https://github.com/harrisonspurs/Ai_study_tracking.git" target="_blank">github.com/harrisonspurs/Ai_study_tracking.git</a>';
  step0.appendChild(gitLink);
  const gitCmd = document.createElement("pre");
  gitCmd.textContent = "git clone https://github.com/harrisonspurs/Ai_study_tracking.git";
  gitCmd.className = "code-block";
  step0.appendChild(gitCmd);
  container.appendChild(step0);

  const step1 = addSection("Step 1: Setup", "");
  const setupCmd = document.createElement("pre");
  setupCmd.textContent = "python -m venv venv\nvenv\\Scripts\\activate\npip install -r requirements.txt";
  setupCmd.className = "code-block";
  step1.appendChild(setupCmd);
  container.appendChild(step1);

  const step2 = addSection("Step 2: Run Session", "");
  const runCmd = document.createElement("pre");
  runCmd.textContent = "python main.py";
  runCmd.className = "code-block";
  step2.appendChild(runCmd);
  const step2Text = document.createElement("p");
  step2Text.textContent = "study normally, press ESC to end";
  step2.appendChild(step2Text);
  container.appendChild(step2);

  container.appendChild(addSection("Step 3: Get Data", "json saves to data/sessions/"));

  const step4 = addSection("Step 4: Import", "");
  const step4List = document.createElement("ol");
  step4List.innerHTML = "<li>open json file</li><li>copy content</li><li>go to Import page</li><li>paste and import</li>";
  step4.appendChild(step4List);
  container.appendChild(step4);

  container.appendChild(addSection("Step 5: View", "go to Sessions to see stats"));

  return container;
}
