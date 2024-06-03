// Variables
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to render tasks on the UI
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        if (task.completed) {
            taskItem.classList.add('completed');
        }
        taskItem.innerHTML = `
            <span>${task.title}</span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
            <input type="checkbox" ${task.completed ? 'checked' : ''}>
        `;
        taskItem.querySelector('input[type="checkbox"]').addEventListener('change', () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        });
        taskItem.querySelector('.edit-btn').addEventListener('click', () => {
            const newTitle = prompt('Enter new task title:', task.title);
            if (newTitle !== null) {
                tasks[index].title = newTitle.trim();
                saveTasks();
                renderTasks();
            }
        });
        taskItem.querySelector('.delete-btn').addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });
        taskList.appendChild(taskItem);
    });
}

// Event listener for adding new task
addTaskBtn.addEventListener('click', () => {
    const title = taskInput.value.trim();
    if (title !== '') {
        tasks.push({ title, completed: false });
        saveTasks();
        renderTasks();
        taskInput.value = '';
    }
});

// Initial render
renderTasks();
