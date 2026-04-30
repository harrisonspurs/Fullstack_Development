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
          borderColor: "#39ff14",
          backgroundColor: "rgba(57, 255, 20, 0.15)",
          borderWidth: 2,
          fill: true,
          tension: 0.3,
          pointRadius: 4,
          pointBackgroundColor: "#39ff14",
          pointBorderColor: "#131313",
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
          labels: {
            color: "#ffffff",
            font: {
              size: 12,
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            color: "#b0b0b0",
            callback: function (value) {
              return value + "%";
            },
          },
          grid: {
            color: "rgba(57, 255, 20, 0.1)",
          },
        },
        x: {
          ticks: {
            color: "#b0b0b0",
          },
          grid: {
            color: "rgba(57, 255, 20, 0.05)",
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
