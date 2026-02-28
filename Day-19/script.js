// Select elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");

// Add Task Event
addBtn.addEventListener("click", function () {

  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  // Create <li>
  const li = document.createElement("li");
  li.textContent = taskText;

  // Toggle completed class when clicking task text
  li.addEventListener("click", function () {
    li.classList.toggle("completed");
  });

  // Create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");

  // Delete task from DOM
  deleteBtn.addEventListener("click", function (e) {
    e.stopPropagation(); // Prevent toggle when deleting
    taskList.removeChild(li);
  });

  // Append delete button to li
  li.appendChild(deleteBtn);

  // Append li to list
  taskList.appendChild(li);

  // Clear input
  taskInput.value = "";
});