// small helper to show feedback text under the form
function showMessage(text, isError = false) {
  const message = document.getElementById("note-message");
  message.textContent = text;
  message.className = isError ? "message error" : "message";
}

// fetch all notes from backend
async function getNotes() {
  const response = await fetch("/notes");
  const data = await response.json();
  return data.data;
}

// send a new note to backend
async function addNote(text) {
  const response = await fetch("/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Could not add note");
  }
}

// delete one note by id
async function deleteNote(id) {
  const response = await fetch(`/notes/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Could not delete note");
  }
}

// build one note row in the list
function createNoteElement(note) {
  const item = document.createElement("li");
  item.className = "note-item";

  const text = document.createElement("span");
  text.textContent = note.text;

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.textContent = "Delete";

  removeButton.addEventListener("click", async () => {
    try {
      await deleteNote(note.id);
      await renderNotes();
      showMessage("Note deleted");
    } catch (error) {
      showMessage(error.message, true);
    }
  });

  item.appendChild(text);
  item.appendChild(removeButton);

  return item;
}

// refresh list UI with newest data from backend
async function renderNotes() {
  const notesList = document.getElementById("notes-list");
  const notes = await getNotes();

  notesList.innerHTML = "";

  if (!notes.length) {
    const emptyItem = document.createElement("li");
    emptyItem.textContent = "No notes yet";
    notesList.appendChild(emptyItem);
    return;
  }

  notes.forEach((note) => {
    notesList.appendChild(createNoteElement(note));
  });
}

// add note from input
async function handleAddNote() {
  const input = document.getElementById("note-input");
  const text = input.value.trim();

  if (!text) {
    showMessage("Please write a note first", true);
    return;
  }

  try {
    await addNote(text);
    input.value = "";
    await renderNotes();
    showMessage("Note added");
  } catch (error) {
    showMessage(error.message, true);
  }
}

// wire button + enter key once page loads
function init() {
  const addButton = document.getElementById("add-note-button");
  const input = document.getElementById("note-input");

  addButton.addEventListener("click", handleAddNote);

  input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      handleAddNote();
    }
  });

  renderNotes();
}

document.addEventListener("DOMContentLoaded", init);
