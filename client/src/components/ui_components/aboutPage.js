import "./aboutPage.css";

export function aboutPage() {
  const container = document.createElement("div");
  container.className = "about-container";

  const h2 = document.createElement("h2");
  h2.textContent = "About";

  const p1 = document.createElement("p");
  p1.textContent = "Track how focused you actually are during study sessions. This application is built to help you see how focused you really are when you're studying.";

  const h3_1 = document.createElement("h3");
  h3_1.textContent = "How It Works";

  const p2 = document.createElement("p");
  p2.textContent = "The tracker uses your webcam to see when you're actually focused on your work vs when you're getting distracted or checking your phone. Everything runs locally on your computer so your data never leaves your device. It all gets exported as JSON so you can import it here and see your stats.";

  const h3_2 = document.createElement("h3");
  h3_2.textContent = "Privacy";

  const p3 = document.createElement("p");
  p3.textContent = "All the processing happens on your computer. No images or videos get stored or sent anywhere. The tracker just detects your face and phone, nothing else. You can quit anytime by hitting ESC if you want to stop.";

  const h3_3 = document.createElement("h3");
  h3_3.textContent = "Developer Mode";

  const p4 = document.createElement("p");
  p4.textContent = "While the tracker is running, press 'C' to turn on developer mode. You'll see the camera feed and how the tracker is actually detecting your focus and distractions in real-time. Pretty cool to see how it works.";

  const h3_4 = document.createElement("h3");
  h3_4.textContent = "Data";

  const p5 = document.createElement("p");
  p5.textContent = "After each session, your focus data gets saved as JSON (duration, how long you stayed focused, and your focus score). You can import those files here to see all your stats and track how you're doing over time.";

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

