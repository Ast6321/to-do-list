const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const clearAllBtn = document.getElementById('clear-all-btn');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task';

        const span = document.createElement('span');
        span.textContent = task;
        li.appendChild(span);

        const btns = document.createElement('div');
        btns.className = 'buttons';

        const upBtn = document.createElement('button');
        upBtn.className = 'up';
        upBtn.textContent = '↑';
        upBtn.onclick = () => moveUp(index);

        const downBtn = document.createElement('button');
        downBtn.className = 'down';
        downBtn.textContent = '↓';
        downBtn.onclick = () => moveDown(index);

        const editBtn = document.createElement('button');
        editBtn.className = 'edit';
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => editTask(index);

        const delBtn = document.createElement('button');
        delBtn.className = 'delete';
        delBtn.textContent = 'Delete';
        delBtn.onclick = () => deleteTask(index);

        btns.appendChild(upBtn);
        btns.appendChild(downBtn);
        btns.appendChild(editBtn);
        btns.appendChild(delBtn);

        li.appendChild(btns);
        taskList.appendChild(li);
    });
}

// Add task
function addTask() {
    const task = taskInput.value.trim();
    if (task) {
        tasks.push(task);
        saveTasks();
        renderTasks();
        taskInput.value = '';
    }
}

// Edit task
function editTask(index) {
    const newTask = prompt('Edit your task:', tasks[index]);
    if (newTask !== null && newTask.trim() !== '') {
        tasks[index] = newTask.trim();
        saveTasks();
        renderTasks();
    }
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Move task up
function moveUp(index) {
    if (index > 0) {
        [tasks[index], tasks[index - 1]] = [tasks[index - 1], tasks[index]];
        saveTasks();
        renderTasks();
    }
}

// Move task down
function moveDown(index) {
    if (index < tasks.length - 1) {
        [tasks[index], tasks[index + 1]] = [tasks[index + 1], tasks[index]];
        saveTasks();
        renderTasks();
    }
}

// Delete all tasks
function clearAll() {
    if (confirm("Are you sure you want to delete all tasks?")) {
        tasks = [];
        saveTasks();
        renderTasks();
    }
}

// Save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') addTask();
});
clearAllBtn.addEventListener('click', clearAll);

// Initial render
renderTasks();