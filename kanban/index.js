let taskCounter = 1; // Counter to keep track of tasks

// Function to add a new task
function addTask(event) {
    // Get the column where the button was clicked
    const column = event.target.closest('.column');
    
    // Create a new task div
    const newTask = document.createElement('div');
    newTask.className = 'task';
    newTask.draggable = true;
    newTask.id = 'task' + taskCounter++; // Set a unique ID for the task
    newTask.ondragstart = drag; // Use your existing drag function

    // Create an input for the new task
    const taskInput = document.createElement('input');
    taskInput.type = 'text';
    taskInput.className = 'task-input';
    taskInput.placeholder = 'New Task'; // Placeholder for the input

    const deletetask = document.createElement('button')
    deletetask.innerText = '-'
    deletetask.className = 'deletetask'
    
    // Append the input to the new task div
    newTask.appendChild(taskInput);
    newTask.appendChild(deletetask)

    // Append the new task div to the column
    column.appendChild(newTask);
    
deletetask.addEventListener('click', function(){
    column.removeChild(newTask)
}
)
}



// Add event listeners to all add-task buttons
document.querySelectorAll('.addtask').forEach(button => {
    button.addEventListener('click', addTask);
});

// Allow drop functionality
function allowDrop(event) {
    event.preventDefault(); // Prevent default behavior
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id); // Set the ID of the dragged element
}

function drop(event) {
    event.preventDefault(); // Prevent default behavior

    const data = event.dataTransfer.getData("text"); // Get the ID of the dragged element
    const draggableElement = document.getElementById(data);
    const dropzone = event.target;

    // Ensure the drop zone is a valid column
    if (dropzone.classList.contains('column')) {
        dropzone.appendChild(draggableElement); // Move the dragged element to the drop zone
    }
}

// Function to create a new column
function createColumn() {
    const newColumn = document.createElement('div');
    newColumn.className = 'column';
    newColumn.ondrop = drop; // Assign the drop function
    newColumn.ondragover = allowDrop; // Assign the allowDrop function

    const text = document.createElement('input');
    text.value = 'Column Name'; // Default column name
    text.className = 'input';

    // Create the "Add Task" button
    const addTaskButton = document.createElement('button');
    addTaskButton.innerText = '+';
    addTaskButton.className = 'addtask';

    // Add event listener to the "Add Task" button
    addTaskButton.addEventListener('click', addTask);

    // Append the input field and the button to the new column
    newColumn.appendChild(text);
    newColumn.appendChild(addTaskButton);
    
    // Append the new column to a specific container, e.g., a board div
    document.querySelector('.kanban-board').appendChild(newColumn);
}
// Add event listener to the main "Add Column" button
document.getElementById('addcolumn').onclick = createColumn;
document.getElementById('deletecolumn').onclick = deleteColumn;
function deleteColumn() {
    const columns = document.querySelectorAll('.column')
    if (columns.length > 0) {
        const last = columns[columns.length - 1]
        last.remove()

    }
}

