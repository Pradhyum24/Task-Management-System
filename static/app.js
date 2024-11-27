const API_URL = "http://127.0.0.1:5000/tasks";

// Fetch and display all tasks
const fetchTasks = async () => {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    const taskList = document.getElementById("task-list");

    taskList.innerHTML = ""; // Clear previous tasks

    tasks.forEach(task => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        taskDiv.innerHTML = `
            <div>
                <strong>${task.title}</strong>
                <p>${task.description}</p>
                <p>Due: ${task.due_date || "No due date"} | Status: ${task.status}</p>
            </div>
            <div>
                <button onclick="deleteTask(${task.id})">Delete</button>
                <button onclick="editTask(${task.id})">Edit</button>
            </div>
        `;
        taskList.appendChild(taskDiv);
    });
};

// Create a new task
const createTask = async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("due-date").value;
    const status = document.getElementById("status").value;

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, due_date: dueDate, status }),
    });

    fetchTasks();
    document.getElementById("task-form").reset();
};

// Delete a task
const deleteTask = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTasks();
};

// (Optional) Edit a task
const editTask = async (id) => {
    const newTitle = prompt("Enter new title:");
    if (!newTitle) return;

    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle }),
    });

    fetchTasks();
};

// Event listener for form submission
document.getElementById("task-form").addEventListener("submit", createTask);

// Fetch tasks on page load
fetchTasks();
