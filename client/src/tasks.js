import { addTask, getTasks, removeTask, updateTaskDone } from "./apiRouter.js";

// show a quick status message under the form
function showMessage(text, isError = false) {
  const message = document.getElementById("task-message");
  message.textContent = text;
  message.className = isError ? "message error" : "message";
}

// build one task row
function createTaskElement(task) {
  const item = document.createElement("li");
  item.className = "task-item";

  const leftSide = document.createElement("div");
  leftSide.className = "task-left";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.done;

  const text = document.createElement("span");
  text.textContent = task.text;
  if (task.done) {
    text.className = "task-done";
  }

  checkbox.addEventListener("change", async () => {
    try {
      await updateTaskDone(task.id, checkbox.checked);
      await renderTasks();
      showMessage("Task updated");
    } catch (error) {
      showMessage(error.message || "Could not update task", true);
    }
  });

  leftSide.appendChild(checkbox);
  leftSide.appendChild(text);

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "small-delete";
  deleteButton.textContent = "Delete";

  deleteButton.addEventListener("click", async () => {
    try {
      await removeTask(task.id);
      await renderTasks();
      showMessage("Task deleted");
    } catch (error) {
      showMessage(error.message || "Could not delete task", true);
    }
  });

  item.appendChild(leftSide);
  item.appendChild(deleteButton);

  return item;
}

// refresh list from backend
async function renderTasks() {
  const list = document.getElementById("tasks-list");
  const tasks = await getTasks();

  list.innerHTML = "";

  if (!tasks.length) {
    const emptyItem = document.createElement("li");
    emptyItem.textContent = "No tasks yet";
    list.appendChild(emptyItem);
    return;
  }

  tasks.forEach((task) => {
    list.appendChild(createTaskElement(task));
  });
}

// add task from input
async function handleAddTask() {
  const input = document.getElementById("task-input");
  const text = input.value.trim();

  if (!text) {
    showMessage("Please write a task first", true);
    return;
  }

  try {
    const result = await addTask(text);
    if (!result.success) {
      showMessage(result.error || "Could not add task", true);
      return;
    }

    input.value = "";
    await renderTasks();
    showMessage("Task added");
  } catch (error) {
    showMessage(error.message || "Could not add task", true);
  }
}

function init() {
  const addButton = document.getElementById("add-task-button");
  const input = document.getElementById("task-input");

  addButton.addEventListener("click", handleAddTask);

  input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  });

  renderTasks();
}

document.addEventListener("DOMContentLoaded", init);
