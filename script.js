document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskbutton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks =  JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(task =>renderTasks(task));

  addTaskbutton.addEventListener("click", () => {
    const tasktext = todoInput.value.trim();
    if (tasktext === "") return;

    const newTask = {
      id: Date.now(),
      text: tasktext,
      completed: false,
    };

    tasks.push(newTask);
    saveTasks()
    todoInput.value = " ";
    console.log(tasks);
  });

   function renderTasks(task){
    console.log(task)
   }
   function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
   }
});
