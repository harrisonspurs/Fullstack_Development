// fetch all sessions from the backend
export async function getSessions() {
  const url = "/getSessions";
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// send a new session to the backend
export async function addSession(date, duration, focused, score, userName) {
  const url = "/addSession";
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date, duration, focused, score, userName }),
  });
  const data = await response.json();
  return data;
}
