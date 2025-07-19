const todoInput = document.getElementById("todo-input");
const addTaskbutton = document.getElementById("add-task-btn");
const todoList = document.getElementById("todo-list");

let tasks = [];

addTaskbutton.addEventListener("click", () => {
    const tasktext = todoInput.value.trim()
    if(tasktext ==="") return;

    const newTask ={
        id:Date.now(),
        text:tasktext,
        completed:false
    }

    tasks.push(newTask)
    todoInput.value=" "
    console.log(tasks)
});
