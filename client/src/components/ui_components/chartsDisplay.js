import "./chartsDisplay.css";

export function createChartDisplay(sessions) {
  if (!sessions || sessions.length === 0) {
    return null;
  }

  const wrapper = document.createElement("div");
  wrapper.className = "chart-wrapper";

  const canvas = document.createElement("canvas");
  canvas.id = "focus-chart";

  wrapper.appendChild(canvas);

  const labels = sessions.map((s) => formatChartDate(s.date));
  const scores = sessions.map((s) => s.score);

  const ctx = canvas.getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Focus Score",
          data: scores,
          borderColor: "#20B2AA",
          backgroundColor: "rgba(32, 178, 170, 0.2)",
          borderWidth: 2,
          fill: true,
          tension: 0.3,
          pointRadius: 4,
          pointBackgroundColor: "#FFD700",
          pointBorderColor: "#3d3448",
          pointBorderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: function (value) {
              return value + "%";
            },
          },
        },
      },
    },
  });

  return wrapper;
}

function formatChartDate(dateString) {
  const date = new Date(dateString + "T00:00:00");
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}`;
}
