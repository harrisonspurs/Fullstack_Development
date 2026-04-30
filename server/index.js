import express from "express";
import dotenv from "dotenv";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

// load env variables
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// need this for es modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// parse json from requests
app.use(express.json());

// allow requests from frontend
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

// set up database
const db = new Database("sessions.db");

// create table for storing sessions
db.prepare(
  `CREATE TABLE IF NOT EXISTS sessions(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userName TEXT,
    date TEXT NOT NULL,
    duration INTEGER NOT NULL,
    focused INTEGER NOT NULL,
    score REAL NOT NULL
  )`,
).run();

console.log("database ready");

// add a session when user imports
app.post("/addSession", (req, res) => {
  const { date, duration, focused, score, userName } = req.body;

  console.log("adding session:", { userName, date, duration, focused, score });

  // save to database
  db.prepare(`
    INSERT INTO sessions (userName, date, duration, focused, score)
    VALUES (?, ?, ?, ?, ?)
  `).run(userName, date, duration, focused, score);

  console.log("session has been added");

  res.json({ success: true, data: req.body });
});

// get all sessions for the dashboard
app.get("/getSessions", (req, res) => {
  console.log("getting all sessions");
  const sessions = db.prepare("SELECT * FROM sessions").all();
  console.log("found", sessions.length, "sessions");
  res.json({ success: true, data: sessions });
});

// serve the frontend
app.use(express.static(path.join(__dirname, "../client/dist")));

// start the server
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

