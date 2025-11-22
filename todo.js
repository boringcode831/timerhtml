function addTodo() {
  const input = document.getElementById("todoInput");
  const text = input.value;
  if (!text) return;

  const li = document.createElement("li");
  li.innerHTML = `${text} <button onclick="markDone(this)">✔</button>`;
  document.getElementById("todoList").appendChild(li);

  input.value = "";
}

function markDone(btn) {
  const li = btn.parentElement;
  btn.remove();
  document.getElementById("doneList").appendChild(li);
}

// =======================
// To-Do with LocalStorage
// =======================

// 从本地读取数据
let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
let doneList = JSON.parse(localStorage.getItem("doneList")) || [];

const todoUl = document.getElementById("todoList");
const doneUl = document.getElementById("doneList");

// 初次载入时显示任务
renderTodo();
renderDone();

// 添加任务
function addTodo() {
    let text = document.getElementById("todoInput").value.trim();
    if (text === "") return;

    todoList.push(text);
    saveData();
    renderTodo();

    document.getElementById("todoInput").value = "";
}

// 完成任务
function markDone(index) {
    let finished = todoList.splice(index, 1)[0];
    doneList.push(finished);

    saveData();
    renderTodo();
    renderDone();
}

// 删除已完成任务
function removeDone(index) {
    doneList.splice(index, 1);
    saveData();
    renderDone();
}

// 更新 UI：待办
function renderTodo() {
    todoUl.innerHTML = "";
    todoList.forEach((task, i) => {
        let li = document.createElement("li");
        li.textContent = task;

        let btn = document.createElement("button");
        btn.textContent = "✔";
        btn.style.marginLeft = "10px";
        btn.onclick = () => markDone(i);

        li.appendChild(btn);
        todoUl.appendChild(li);
    });
}

// 更新 UI：已完成
function renderDone() {
    doneUl.innerHTML = "";
    doneList.forEach((task, i) => {
        let li = document.createElement("li");
        li.textContent = task;

        let btn = document.createElement("button");
        btn.textContent = "🗑";
        btn.style.marginLeft = "10px";
        btn.onclick = () => removeDone(i);

        li.appendChild(btn);
        doneUl.appendChild(li);
    });
}

// 保存到 localStorage
function saveData() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
    localStorage.setItem("doneList", JSON.stringify(doneList));
}

