const API_URL = "http://127.0.0.1:8000/api/tasks/";

const taskList = document.getElementById("taskList");
const taskForm = document.getElementById("taskForm");
const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");

// Fetch and display tasks
function getTasks() {
  fetch(API_URL)
    .then((res) => res.json())
    .then((tasks) => {
      taskList.innerHTML = "";
      tasks.forEach((task) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>${task.title}</strong> - ${task.description} 
          <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
      });
    });
}

// Add a new task
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: titleInput.value,
      description: descInput.value,
    }),
  }).then(() => {
    titleInput.value = "";
    descInput.value = "";
    getTasks();
  });
});

// Delete a task
function deleteTask(id) {
  fetch(`${API_URL}${id}/`, {
    method: "DELETE",
  }).then(() => getTasks());
}

// Initial load
getTasks();
