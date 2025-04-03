const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addTaskButton = document.getElementById("addTaskButton");

// Initialiser les tâches à partir du localStorage
document.addEventListener("DOMContentLoaded", loadTasks);

// Fonction pour charger les tâches depuis le localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        createTaskElement(task.title, task.completed);
    });
}

// Fonction pour ajouter une nouvelle tâche
addTaskButton.addEventListener("click", () => {
    const taskTitle = taskInput.value.trim();

    if (!taskTitle) {
        alert("Veuillez entrer une tâche.");
        return;
    }

    createTaskElement(taskTitle);
    saveTask(taskTitle);
    taskInput.value = "";
});

// Créer un élément de tâche
function createTaskElement(title, completed = false) {
    const li = document.createElement("li");
    li.classList.toggle("completed", completed);

    li.innerHTML = `
        <input type="checkbox" ${completed ? "checked" : ""} onclick="toggleCompletion(event)">
        <span>${title}</span>
        <button class="delete" onclick="deleteTask(event)">&times;</button>
    `;

    taskList.appendChild(li);
}

// Fonction pour marquer une tâche comme terminée
function toggleCompletion(event) {
    const taskItem = event.target.closest("li");
    const taskTitle = taskItem.querySelector("span").textContent;
    taskItem.classList.toggle("completed");
    updateTaskStatus(taskTitle, taskItem.classList.contains("completed"));
}

// Fonction pour supprimer une tâche
function deleteTask(event) {
    if(confirm("Voulez-vous supprimer cette tache ?")){
        const taskItem = event.target.closest("li");
        const taskTitle = taskItem.querySelector("span").textContent;
        taskItem.remove();
        removeTask(taskTitle);
    }
}

// Sauvegarder une tâche dans le localStorage
function saveTask(title) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ title, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Mettre à jour l'état d'une tâche dans le localStorage
function updateTaskStatus(title, completed) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskIndex = tasks.findIndex(task => task.title === title);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

// Supprimer une tâche du localStorage
function removeTask(title) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.filter(task => task.title !== title);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

// reinisialiser la liste de tâche
function reset(){
    if(taskList.innerHTML != ""){
        if(confirm("Etes-vous sûr de vouloir reinitialiser la liste ?")){
            taskList.innerHTML = "";
            localStorage.removeItem("tasks");
        }
    } else {
        alert("La liste est vide !");
    }
   
}
