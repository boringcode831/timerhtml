// 从本地读取数据 (保持不变)
let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
let doneList = JSON.parse(localStorage.getItem("doneList")) || [];

const todoUl = document.getElementById("todoList");
const doneUl = document.getElementById("doneList");

renderTodo();
renderDone();

// =======================
// 修改后的添加任务函数
// =======================
function addTodo() {
    let input = document.getElementById("todoInput");
    let text = input.value.trim();
    if (text === "") return;

    // 获取当前日期和时间 (格式化为: 2023-10-27 14:30)
    const now = new Date();
    const dateString = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    // 存储为一个对象
    const taskObject = {
        content: text,
        date: dateString
    };

    todoList.push(taskObject);
    saveData();
    renderTodo();

    input.value = "";
}

// 完成任务 (index 逻辑微调)
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

// =======================
// 修改后的更新 UI 函数
// =======================
function renderTodo() {
    todoUl.innerHTML = "";
    todoList.forEach((task, i) => {
        let li = document.createElement("li");
        
        // 这里的 task 现在是一个对象，所以用 task.content 和 task.date
        li.innerHTML = `
            <span class="task-text">${task.content}</span>
            <small style="color: #888; margin-left: 10px;">(${task.date})</small>
        `;

        let btn = document.createElement("button");
        btn.textContent = "✔";
        btn.style.marginLeft = "10px";
        btn.onclick = () => markDone(i);

        li.appendChild(btn);
        todoUl.appendChild(li);
    });
}

function renderDone() {
    doneUl.innerHTML = "";
    doneList.forEach((task, i) => {
        let li = document.createElement("li");
        
        // 同样，已完成列表也要显示日期
        li.innerHTML = `
            <span style="text-decoration: line-through;">${task.content}</span>
            <small style="color: #bbb; margin-left: 10px;">(${task.date})</small>
        `;

        let btn = document.createElement("button");
        btn.textContent = "🗑";
        btn.style.marginLeft = "10px";
        btn.onclick = () => removeDone(i);

        li.appendChild(btn);
        doneUl.appendChild(li);
    });
}

function saveData() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
    localStorage.setItem("doneList", JSON.stringify(doneList));
}
