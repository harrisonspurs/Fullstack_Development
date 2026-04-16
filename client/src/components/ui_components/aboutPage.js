import "./aboutPage.css";

export function aboutPage() {
  const container = document.createElement("div");
  container.className = "about-container";

  const h2 = document.createElement("h2");
  h2.textContent = "About";

  const p1 = document.createElement("p");
  p1.textContent = "Study Focus Tracker helps you monitor your focus during study sessions.";

  const h3_1 = document.createElement("h3");
  h3_1.textContent = "How It Works";

  const p2 = document.createElement("p");
  p2.textContent = "The AI Study Tracker uses your webcam to detect when you're focused on your work. It tracks your face position and detects when you get distracted or pick up your phone. Data is collected locally and exported as JSON.";

  const h3_2 = document.createElement("h3");
  h3_2.textContent = "Privacy";

  const p3 = document.createElement("p");
  p3.textContent = "Your webcam data is processed locally on your computer - nothing is sent to external servers. The tracker detects face position and phone presence but doesn't store images or video. You have full control - quit anytime by pressing ESC.";

  const h3_3 = document.createElement("h3");
  h3_3.textContent = "Developer Mode";

  const p4 = document.createElement("p");
  p4.textContent = "While using the tracker, press 'C' to toggle developer mode. This shows the camera feed and displays how the AI is detecting your focus and distractions in real-time.";

  const h3_4 = document.createElement("h3");
  h3_4.textContent = "Data";

  const p5 = document.createElement("p");
  p5.textContent = "After each session, the tracker saves your focus data (duration, focus time, focus score) as a JSON file. You can then import this data here to view your statistics and track progress over time.";

  container.appendChild(h2);
  container.appendChild(p1);

  container.appendChild(h3_1);
  container.appendChild(p2);

  container.appendChild(h3_2);
  container.appendChild(p3);

  container.appendChild(h3_3);
  container.appendChild(p4);

  container.appendChild(h3_4);
  container.appendChild(p5);

  return container;
}

