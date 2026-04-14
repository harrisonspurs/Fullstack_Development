export async function getSessions() {
  const url = "/getSessions";
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function addSession(date, duration, focused, score) {
  const url = "/addSession";
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date, duration, focused, score }),
  });
  const data = await response.json();
  return data;
}
