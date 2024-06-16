// Retrieve saved tasks from localStorage or initialize empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to render tasks from array
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear existing list items
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.name;
        
        // Add a class 'completed' if task is completed
        if (task.completed) {
            li.classList.add('completed');
        }
        
        // Add event listener to mark task as completed on click
        li.addEventListener('click', () => {
            task.completed = !task.completed;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks(); // Update the list after modification
        });
        
        // Create a delete button for each task
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            tasks.splice(index, 1); // Remove task from array
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks(); // Update the list after modification
        });
        
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

// Function to add new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskName = taskInput.value.trim();
    
    if (taskName !== '') {
        tasks.push({ name: taskName, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = ''; // Clear input field
        renderTasks(); // Update the list after adding new task
    } else {
        alert('Please enter a task!');
    }
}

// Initial render of tasks when page loads
renderTasks();
