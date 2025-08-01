interface Task {
  id: number;
  text: string;
  completed: boolean;
}

document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input") as HTMLInputElement;
  const addTaskBtn = document.getElementById(
    "add-task-btn"
  ) as HTMLButtonElement;
  const todoList = document.getElementById("todo-list") as HTMLUListElement;

  let tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");

  tasks.forEach((task: Task) => renderTask(task));

  addTaskBtn.addEventListener("click", () => {
    const taskText = todoInput.value.trim();
    if (taskText === "") return;

    const newTask: Task = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    tasks.push(newTask);
    saveTasks();
    renderTask(newTask);
    todoInput.value = "";
  });

  function renderTask(task: Task): void {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id.toString());
    if (task.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = task.text;
    span.addEventListener("click", () => toggleComplete(task.id));

    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("actions");

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.innerHTML = `<i class="fas fa-edit"></i>`;
    editBtn.addEventListener("click", () => editTask(task, li));

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = `<i class="fas fa-trash-alt"></i>`;
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actionsDiv);
    todoList.appendChild(li);
  }

  function editTask(task: Task, li: HTMLLIElement): void {
    li.innerHTML = "";

    const input = document.createElement("input");
    input.type = "text";
    input.value = task.text;
    input.classList.add("edit-input");

    const saveBtn = document.createElement("button");
    saveBtn.innerHTML = `<i class="fas fa-save"></i>`;
    saveBtn.classList.add("edit-btn");
    saveBtn.addEventListener("click", () => {
      const newText = input.value.trim();
      if (newText === "") return;

      task.text = newText;
      saveTasks();

      li.innerHTML = "";
      renderTask(task);
    });

    li.appendChild(input);
    li.appendChild(saveBtn);
  }

  function deleteTask(id: number): void {
    tasks = tasks.filter((task) => task.id !== id);
    saveTasks();
    const li = document.querySelector(`li[data-id='${id}']`);
    if (li) li.remove();
  }

  function toggleComplete(id: number): void {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    task.completed = !task.completed;
    saveTasks();

    const li = document.querySelector(`li[data-id='${id}']`);
    if (li) li.classList.toggle("completed");
  }

  function saveTasks(): void {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
