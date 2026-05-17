let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        if(task.completed){
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span onclick="toggleTask(${index})">${task.text}</span>
            <span class="delete" onclick="deleteTask(${index})">✖</span>
        `;

        taskList.appendChild(li);
    });
}

function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if(text === "") return;

    tasks.push({
        text: text,
        completed: false
    });

    input.value = "";
    saveTasks();
    renderTasks();
}

function toggleTask(index){
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index){
    tasks.splice(index,1);
    saveTasks();
    renderTasks();
}

renderTasks();
let countdown;

function startTimer(){
    clearInterval(countdown);

    let minutes = document.getElementById("minutesInput").value;

    if(minutes <= 0 || minutes === ""){
        alert("Enter valid minutes");
        return;
    }

    let time = minutes * 60;

    countdown = setInterval(() => {
        let mins = Math.floor(time / 60);
        let secs = time % 60;

        document.getElementById("timerDisplay").innerText =
            `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;

        time--;

        if(time < 0){
            clearInterval(countdown);
            document.getElementById("timerDisplay").innerText = "Time's Up!";
            alert("Study session completed!");
        }

    }, 1000);
}