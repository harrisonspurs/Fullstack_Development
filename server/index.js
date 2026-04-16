import express from "express";
import dotenv from "dotenv";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());

// cors stuff
app.use((req, res, next) => {
  const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin) || !origin) {
    res.header("Access-Control-Allow-Origin", origin || "*");
  } else {
    res.header("Access-Control-Allow-Origin", "*");
  }
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

console.log("database ready");

app.post("/addSession", (req, res) => {
  const { date, duration, focused, score } = req.body;

  console.log("adding session:", { date, duration, focused, score });

  // insert into db
  db.prepare(`
    INSERT INTO sessions (date, duration, focused, score)
    VALUES (?, ?, ?, ?)
  `).run(date, duration, focused, score);

  console.log("session added");

  res.json({ success: true, data: req.body });
});

app.get("/getSessions", (req, res) => {
  console.log("getting all sessions");
  const sessions = db.prepare("SELECT * FROM sessions").all();
  console.log("found", sessions.length, "sessions");
  res.json({ success: true, data: sessions });
});

// serve frontend
app.use(express.static(path.join(__dirname, "../client/dist")));

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

