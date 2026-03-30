// shared fetch helpers used by dashboard/notes screens
export async function addNote(text) {
  const response = await fetch("/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  const data = await response.json();
  return data;
}

export async function getNotes() {
  const response = await fetch("/notes");
  const data = await response.json();
  return data.data;
}

export async function getDashboardSummary() {
  const response = await fetch("/dashboard-summary");
  const data = await response.json();
  return data.data;
}

export async function getTasks() {
  const response = await fetch("/tasks");
  const data = await response.json();
  return data.data;
}

export async function addTask(text) {
  const response = await fetch("/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  const data = await response.json();
  return data;
}

export async function updateTaskDone(id, done) {
  const response = await fetch(`/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ done }),
  });

  const data = await response.json();
  return data;
}

export async function removeTask(id) {
  const response = await fetch(`/tasks/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();
  return data;
}
