let examParts = [];  
let currentPart = 0;
let examInterval;

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
}

function startExam() {
  currentPart = 0;
  runExamPart();
}

function runExamPart() {
  if (currentPart >= examParts.length) {
    document.getElementById("examTimer").innerText = "考试结束";
    return;
  }

  let time = examParts[currentPart].minutes * 60;
  
  clearInterval(examInterval);
  examInterval = setInterval(() => {
    let m = Math.floor(time / 60);
    let s = time % 60;
    document.getElementById("examTimer").innerText =
      `${m}:${s.toString().padStart(2, "0")}`;

    if (time <= 0) {
      clearInterval(examInterval);
      currentPart++;
      runExamPart();
    }
    time--;
  }, 1000);
}
