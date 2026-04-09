// Fetch and display study sessions from backend
async function loadSessions() {
  try {
    const response = await fetch("http://localhost:3000/getSessions");
    const result = await response.json();

    console.log("Sessions data:", result.data); // for testing

    const container = document.getElementById("sessions-container");

    if (!result.success || result.data.length === 0) {
      container.innerHTML = "<p>No sessions recorded yet.</p>";
      return;
    }

    // Clear loading message
    container.innerHTML = "";

    // Display each session
    result.data.forEach((session) => {
      const div = document.createElement("div");
      div.style.cssText =
        "border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 5px;";

      div.innerHTML = `
        <p><strong>Date:</strong> ${session.date}</p>
        <p><strong>Duration:</strong> ${session.duration} seconds (${Math.round(session.duration / 60)} minutes)</p>
        <p><strong>Focused Time:</strong> ${session.focused} seconds (${Math.round(session.focused / 60)} minutes)</p>
        <p><strong>Focus Score:</strong> ${session.score}%</p>
      `;

      container.appendChild(div);
    });
  } catch (error) {
    console.error("Error loading sessions:", error);
    const container = document.getElementById("sessions-container");
    container.innerHTML =
      "<p style='color: red;'>Error loading sessions. Make sure the server is running.</p>";
  }
}

// Load sessions when page loads
loadSessions();
