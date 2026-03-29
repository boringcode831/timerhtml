let cdSec = 0, cdTimer = null, cdOver = 0;
let currentProject = ""; // 新增：用于存储当前专注的项目名称

function startFocusCountdown() {
  const projectInput = document.getElementById("focusProjectInput");
  const projectDisplay = document.getElementById("currentProjectDisplay");
  const minInput = document.getElementById("focusCountdownMin");

  // 1. 获取并锁定项目名称
  if (!cdTimer) {
    let min = parseInt(minInput.value);
    if (isNaN(min) || min <= 0) {
      alert("请输入有效的分钟数");
      return;
    }

    // 如果是第一次开始，记录项目名称并切换 UI
    if (cdSec === 0) {
      currentProject = projectInput.value.trim() || "无题专注";
      cdSec = min * 60;
      
      // 隐藏输入框，显示正在进行的任务名称（营造仪式感）
      projectInput.style.display = "none";
      projectDisplay.style.display = "block";
      projectDisplay.textContent = `正在专注：${currentProject}`;
    }

    cdTimer = setInterval(() => {
      if (cdSec > 0) {
        cdSec--;
      } else {
        cdOver++; // 超时开始累计
      }
      updateCountdownDisplay();
    }, 1000);
  }
}

function updateCountdownDisplay() {
  const display = document.getElementById("focusCountdownDisplay");
  if (cdSec > 0) {
    let m = String(Math.floor(cdSec / 60)).padStart(2, '0');
    let s = String(cdSec % 60).padStart(2, '0');
    display.textContent = `${m}:${s}`;
  } else {
    // 变红或者加提示，提醒用户已超时
    let om = String(Math.floor(cdOver / 60)).padStart(2, '0');
    let os = String(cdOver % 60).padStart(2, '0');
    display.innerHTML = `<span style="color:red;">超时：${om}:${os}</span>`;
  }
}

function stopFocusCountdown() {
  clearInterval(cdTimer);
  cdTimer = null;
}

function resetFocusCountdown() {
  stopFocusCountdown();
  cdSec = 0;
  cdOver = 0;
  currentProject = "";
  
  // 恢复 UI 状态
  const projectInput = document.getElementById("focusProjectInput");
  const projectDisplay = document.getElementById("currentProjectDisplay");
  
  projectInput.value = "";
  projectInput.style.display = "block";
  projectDisplay.style.display = "none";
  document.getElementById("focusCountdownDisplay").textContent = "00:00";
}
