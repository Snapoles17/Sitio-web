// Evento para añadir tarea
document.getElementById('add-task').addEventListener('click', async () => {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value;
    if (taskText) {
        await addTaskToServer(taskText);
        taskInput.value = '';
    }
});

// Función para añadir tarea al servidor
async function addTaskToServer(task) {
    try {
        const response = await fetch('tasks.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: task }),
        });
        const newTask = await response.json();
        addTaskToList(newTask);
    } catch (error) {
        console.error('Error añadiendo tarea:', error);
    }
}

// Función para obtener las tareas del servidor
async function fetchTasks() {
    try {
        const response = await fetch('tasks.php');
        const tasks = await response.json();
        tasks.forEach(task => addTaskToList(task));
    } catch (error) {
        console.error('Error obteniendo tareas:', error);
    }
}

// Función para añadir tarea a la lista en el DOM
function addTaskToList(task) {
    const taskList = document.getElementById('tasks-list');
    const newTask = document.createElement('li');
    newTask.setAttribute('data-id', task.id);
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.className = 'delete-task';
    deleteButton.addEventListener('click', () => {
        deleteTaskFromServer(task.id);
    });

    newTask.textContent = task.text;
    newTask.appendChild(deleteButton);
    taskList.appendChild(newTask);
}

// Función para eliminar tarea del servidor
async function deleteTaskFromServer(taskId) {
    try {
        await fetch(`tasks.php?id=${taskId}`, {
            method: 'DELETE',
        });
        const taskList = document.getElementById('tasks-list');
        const taskItem = document.querySelector(`li[data-id='${taskId}']`);
        taskList.removeChild(taskItem);
    } catch (error) {
        console.error('Error eliminando tarea:', error);
    }
}

// Obtener tareas al cargar la página
fetchTasks();
