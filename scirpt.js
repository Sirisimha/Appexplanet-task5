/* SMOOTH SCROLL */
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

/* ACTIVE MENU */
const sections = document.querySelectorAll(".section");
const navButtons = document.querySelectorAll(".nav-btn");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const top = section.offsetTop - 150;
    if (scrollY >= top) current = section.id;
  });

  navButtons.forEach(btn => {
    btn.classList.remove("active");
    if (btn.textContent.toLowerCase() === current) {
      btn.classList.add("active");
    }
  });
});

/* DARK MODE */
document.getElementById("darkToggle").onclick = () => {
  document.body.classList.toggle("dark");
};

/* SCROLL REVEAL */
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const revealTop = el.getBoundingClientRect().top;
    if (revealTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
});

/* TASK MANAGER + FILTERS */
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("taskInput");
  if (!input.value.trim()) return;

  tasks.push({ text: input.value, done: false });
  input.value = "";
  saveTasks();
  renderTasks();
}

function setFilter(filter) {
  currentFilter = filter;
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks
    .filter(task => {
      if (currentFilter === "completed") return task.done;
      if (currentFilter === "pending") return !task.done;
      return true;
    })
    .forEach((task, i) => {
      list.innerHTML += `
        <li class="${task.done ? 'done' : ''}">
          ${task.text}
          <span>
            <button onclick="toggleTask(${i})">✔</button>
            <button onclick="deleteTask(${i})">✖</button>
          </span>
        </li>
      `;
    });
}

function toggleTask(i) {
  tasks[i].done = !tasks[i].done;
  saveTasks();
  renderTasks();
}

function deleteTask(i) {
  tasks.splice(i, 1);
  saveTasks();
  renderTasks();
}

renderTasks();