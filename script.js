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
    renderTasks(newTask)
    todoInput.value = " ";
    console.log(tasks);
  });

   function renderTasks(task){
    const li = document.createElement('li');
    li.setAttribute("data-id",task.id)

    if(task.completed) {
        li.classList.add('Completed')
    }
    li.innerHTML = `
      <span>${task.text}</span>
      <button class="delete-btn">Delete</button>
    `;
    li.querySelector('.delete-btn').addEventListener('click',()=>{
        deleteTask(task.id)
    })

    todoList.appendChild(li);
   }
   function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
   }

   function deleteTask(id){
    tasks = tasks.filter(task=>task.id!=id)
    saveTasks()
    document.querySelector(`li[data-id='${id}']`).remove();
   }
});
