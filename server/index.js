import express from "express";
import dotenv from "dotenv";
import Database from "better-sqlite3";

dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());

// cors stuff
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const db = new Database("sessions.db");

// make table if not there
db.prepare(
  `CREATE TABLE IF NOT EXISTS sessions(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    duration INTEGER NOT NULL,
    focused INTEGER NOT NULL,
    score REAL NOT NULL
  )`,
).run();

app.post("/addSession", (req, res) => {
  const { date, duration, focused, score } = req.body;

  db.prepare(`
    INSERT INTO sessions (date, duration, focused, score)
    VALUES (?, ?, ?, ?)
  `).run(date, duration, focused, score);

  res.json({ success: true, data: req.body });
});

app.get("/getSessions", (req, res) => {
  const sessions = db.prepare("SELECT * FROM sessions").all();
  res.json({ success: true, data: sessions });
});

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
