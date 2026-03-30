import express from "express";

// basic express setup
const app = express();
const port = 3000;
app.use(express.json());

// in-memory list for now (can move to a real DB later)
const notes = [];
const tasks = [];

// get all notes
app.get("/notes", (req, res) => {
  res.json({ success: true, data: notes });
});

// quick values for dashboard cards
app.get("/dashboard-summary", (req, res) => {
  res.json({
    success: true,
    data: {
      notesCount: notes.length,
      tasksCount: tasks.length,
      sessionsCount: 0,
      focusMinutes: 0,
    },
  });
});

// get all tasks
app.get("/tasks", (req, res) => {
  res.json({ success: true, data: tasks });
});

// add a new task
app.post("/tasks", (req, res) => {
  const text = req.body?.text?.trim();
  if (!text) {
    res.status(400).json({ success: false, error: "text is required" });
    return;
  }

  const task = {
    id: Date.now(),
    text,
    done: false,
  };

  tasks.push(task);
  res.status(201).json({ success: true, data: task });
});

// update done state of task
app.patch("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    res.status(404).json({ success: false, error: "task not found" });
    return;
  }

  task.done = Boolean(req.body?.done);
  res.json({ success: true, data: task });
});

// delete a task by id
app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((item) => item.id === id);

  if (index === -1) {
    res.status(404).json({ success: false, error: "task not found" });
    return;
  }

  tasks.splice(index, 1);
  res.json({ success: true });
});

// add a new note
app.post("/notes", (req, res) => {
  const text = req.body?.text?.trim();
  if (!text) {
    res.status(400).json({ success: false, error: "text is required" });
    return;
  }

  const note = {
    id: Date.now(),
    text,
  };

  notes.push(note);
  res.status(201).json({ success: true, data: note });
});

// delete a note by its id
app.delete("/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = notes.findIndex((note) => note.id === id);

  if (index === -1) {
    res.status(404).json({ success: false, error: "note not found" });
    return;
  }

  notes.splice(index, 1);
  res.json({ success: true });
});

// start server
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
