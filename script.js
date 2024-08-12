document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);

const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
addTaskBtn.addEventListener("click", addTask);

function addTask() {
  const taskContent = taskInput.value.trim();
  if (taskContent) {
    const taskId = Date.now().toString();
    const task = { id: taskId, content: taskContent, checked: false };
    renderTask(task);
    saveTaskToLocalStorage(task);
    taskInput.value = "";
  }
}
function renderTask(task) {
  const taskItem = document.createElement("li");
  taskItem.classList.add("task-item");
  taskItem.setAttribute("data-id", task.id);

  const taskContent = document.createElement("span");
  taskContent.textContent = task.content;
  taskContent.setAttribute("contenteditable", true);
  taskContent.addEventListener("blur", () =>
    updateTaskInLocalStorage(task.id, taskContent.textContent)
  );

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.addEventListener("click", () => deleteTask(task.id, taskItem));
  taskItem.appendChild(taskContent);
  taskItem.appendChild(deleteBtn);
  taskList.appendChild(taskItem);
}

function saveTaskToLocalStorage(task) {
  const tasks = getTasksFromLocalStorage();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasksFromLocalStorage() {
  const tasks = getTasksFromLocalStorage();
  tasks.forEach((task) => renderTask(task));
}
function getTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function updateTaskInLocalStorage(id, newContent) {
  const tasks = getTasksFromLocalStorage();
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex > -1) {
    tasks[taskIndex].content = newContent;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

function deleteTask(id, taskElement) {
  let tasks = getTasksFromLocalStorage();
  tasks = tasks.filter((task) => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskElement.remove();
}
