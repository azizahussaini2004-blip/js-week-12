const taskForm = document.querySelector("#taskForm");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
// Add a new task
taskForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const taskText = taskInput.value.trim();
  if (!taskText) {
    return;
  }
  createTask(taskText);
  taskInput.value = "";
});
// Function to create a task
function createTask(text) {
  // Create task item
  const li = document.createElement("li");
  // Store task information using data- attribute
  li.dataset.task = text;
  // Create task text
  const span = document.createElement("span");
  span.textContent = text;
  // Create Edit button
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  // Store the action in data- attribute
  editButton.dataset.action = "edit";
  // Add elements to the task
  li.append(span, editButton);
  // Add task to the list
  taskList.append(li);
}
// ONE event listener for all task interactions
taskList.addEventListener("click", function (event) {
  // Check if the clicked element is an Edit button
  if (event.target.dataset.action === "edit") {
    const button = event.target;
    const li = button.parentElement;
    // Find the current task text
    const span = li.querySelector("span");
    // Create input
    const input = document.createElement("input");
    // Put current text inside input
    input.value = span.textContent;
    // Store the action using dataset
    input.dataset.action = "edit-input";
    // Remove old text
    span.remove();
    // Add input to the task
    li.append(input);
    // Put cursor inside input
    input.focus();
  }
});
// Same delegated event listener handles Enter key
taskList.addEventListener("keydown", function (event) {
  // Check if Enter was pressed inside an edit input
  if (
    event.key === "Enter" &&
    event.target.dataset.action === "edit-input"
  ) {
    const input = event.target;
    const li = input.parentElement;
    // Get the new text
    const newText = input.value.trim();
    if (!newText) {
      return;
    }
    // Create the new task text
    const span = document.createElement("span");
    span.textContent = newText;
    // Update data attribute
    li.dataset.task = newText;
    // Create Edit button again
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.dataset.action = "edit";
    // Remove input
    input.remove();
    // Add the new text and Edit button
    li.append(span, editButton);
  }
});
