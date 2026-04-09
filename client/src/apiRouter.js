export async function getSessions() {
  const response = await fetch("/getSessions");
  const data = await response.json();
  return data.data;
}

export async function addSession(date, duration, focused, score) {
  const response = await fetch("/addSession", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date, duration, focused, score }),
  });
  const data = await response.json();
  return data.data;
}
