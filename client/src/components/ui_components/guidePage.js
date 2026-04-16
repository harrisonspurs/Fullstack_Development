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

  function createCodeBlock(code) {
    const wrapper = document.createElement("div");
    wrapper.className = "code-block-wrapper";

    const pre = document.createElement("pre");
    pre.textContent = code;
    pre.className = "code-block";

    const copyBtn = document.createElement("button");
    copyBtn.textContent = "Copy";
    copyBtn.className = "copy-btn";
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(code);
      copyBtn.textContent = "Copied!";
      setTimeout(() => {
        copyBtn.textContent = "Copy";
      }, 2000);
    };

    wrapper.appendChild(copyBtn);
    wrapper.appendChild(pre);

    return wrapper;
  }

  const step1 = addSection("Step 1: Download Project", "First, download the AI Tracker project from GitHub. You can either clone it using the link below or download it directly from the repository.");
  const gitLink = document.createElement("p");
  gitLink.innerHTML = '<a href="https://github.com/harrisonspurs/Ai_study_tracking.git" target="_blank">github.com/harrisonspurs/Ai_study_tracking.git</a>';
  step1.appendChild(gitLink);
  step1.appendChild(createCodeBlock("git clone https://github.com/harrisonspurs/Ai_study_tracking.git"));
  container.appendChild(step1);

  const step2 = addSection("Step 2: Setup Environment", "Run this code in your terminal to create a virtual environment, activate it, and download all the project dependencies:");
  step2.appendChild(createCodeBlock("python -m venv venv\nvenv\\Scripts\\activate\npip install -r requirements.txt"));
  container.appendChild(step2);

  const step3 = addSection("Step 3: Run the AI Tracker", "Start the AI session tracker by running this command in your terminal. The tracker will record your focus data while you study.");
  step3.appendChild(createCodeBlock("python main.py"));
  const step3Text = document.createElement("p");
  step3Text.textContent = "Study normally in your application. Press ESC when you're done to end the session.";
  step3.appendChild(step3Text);
  container.appendChild(step3);

  const step4 = addSection("Step 4: Get Your Data", "After you finish a study session, the tracker saves your data as a JSON file. You can find it in the data/sessions/ folder.");
  container.appendChild(step4);

  const step5 = addSection("Step 5: Import Sessions", "Now import your session data into the dashboard. Follow these steps:");
  const step5List = document.createElement("ol");
  step5List.innerHTML = "<li>Open the JSON file from your sessions folder</li><li>Copy all the content</li><li>Go to the Import page in the dashboard</li><li>Paste the JSON data and click Import</li>";
  step5.appendChild(step5List);
  container.appendChild(step5);

  container.appendChild(addSection("Step 6: View Your Stats", "Once imported, go to the Sessions page to see your study statistics, focus scores, and progress visualization."));

  return container;
}



