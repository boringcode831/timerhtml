let examParts = [];  
let currentPart = 0;
let examInterval;
let elapsed = 0;     // 本部分已过去秒数
let overtime = 0;    // 超时秒数

// 添加部分
function addExamPart() {
  const index = examParts.length;
  examParts.push({ minutes: 0 });

  const container = document.getElementById("examParts");
  const div = document.createElement("div");
  div.innerHTML = `
    部分 ${index + 1} 分钟: 
    <input type="number" onchange="examParts[${index}].minutes=this.value">
  `;
  container.appendChild(div);

  updateExamTotal();
}

// 更新总时间
function updateExamTotal() {
  const totalMin = examParts.reduce((sum, p) => sum + Number(p.minutes || 0), 0);
  document.getElementById("examTotal").textContent =
    `总时间：${totalMin} 分钟`;
}

function startExam() {
  currentPart = 0;
  runExamPart();
}

function runExamPart() {

  if (currentPart >= examParts.length) {
    document.getElementById("examTimer").innerText = "考试结束";
    document.getElementById("examStatus").innerHTML =
      `<p style="color:green;font-size:20px">🎉 专注完成！</p>`;
    return;
  }

  let limit = examParts[currentPart].minutes * 60;
  let remaining = limit;

  elapsed = 0;
  overtime = 0;

  clearInterval(examInterval);

  examInterval = setInterval(() => {

    // ⏳ 已过去时间
    elapsed++;

    // ⏲️ 剩余 or 超时
    if (remaining > 0) {
      remaining--;
    } else {
      overtime++;
    }

    // 显示主倒计时
    let showMin = Math.floor(Math.max(remaining, 0) / 60);
    let showSec = Math.max(remaining, 0) % 60;
    document.getElementById("examTimer").innerText =
      `${showMin}:${showSec.toString().padStart(2, "0")}`;

    // 显示状态栏
    updateExamStatus(limit, remaining, elapsed, overtime);

    // 本部分结束 → 进入下一部分
    if (remaining <= 0 && overtime === 1) {
      // 到达 0 时立刻跳下一个部分
      clearInterval(examInterval);
      currentPart++;
      setTimeout(runExamPart, 1000);
    }

  }, 1000);
}

function updateExamStatus(limit, remaining, elapsed, overtime) {
  let remMin = Math.max(remaining, 0);
  let overtimeMin = Math.floor(overtime / 60);

  let html = `
    <p>部分 ${currentPart + 1}</p>
    预定时间：${Math.floor(limit/60)} 分钟<br>
    已过去：${Math.floor(elapsed/60)} 分钟<br>
    倒数中：${Math.floor(remMin/60)} 分钟<br>
    已超时：${overtime > 0 ? overtimeMin + " 分钟" : "N/A"}
  `;

  document.getElementById("examStatus").innerHTML = html;
}
