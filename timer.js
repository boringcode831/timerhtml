let cdSec = 0, cdTimer = null, cdOver = 0;
let currentProject = ""; // 记录当前项目

function startFocusCountdown() {
  const projectInput = document.getElementById("focusProjectInput");
  const projectDisplay = document.getElementById("currentProjectDisplay");
  const projectLabel = document.getElementById("projectLabel");
  const minInput = document.getElementById("focusCountdownMin");

  if (!cdTimer) {
    let min = parseInt(minInput.value);
    if (isNaN(min) || min <= 0) {
      alert("请输入有效的分钟数");
      return;
    }

    // 第一次启动时记录项目名
    if (cdSec === 0) {
      currentProject = projectInput.value.trim() || "无题专注";
      cdSec = min * 60;
      
      // UI 切换：隐藏输入框，显示项目名
      projectInput.style.display = "none";
      projectDisplay.style.display = "block";
      projectDisplay.textContent = `正在进行：${currentProject}`;
      projectLabel.textContent = currentProject;
    }

    cdTimer = setInterval(() => {
      if (cdSec > 0) {
        cdSec--;
      } else {
        cdOver++;
      }
      updateCountdownDisplay();
    }, 1000);
  }
}

// updateCountdownDisplay 和 stopFocusCountdown 保持你之前的逻辑即可

function resetFocusCountdown() {
  stopFocusCountdown();
  cdSec = 0;
  cdOver = 0;
  currentProject = "";

  // 恢复 UI
  const projectInput = document.getElementById("focusProjectInput");
  const projectDisplay = document.getElementById("currentProjectDisplay");
  const projectLabel = document.getElementById("projectLabel");

  projectInput.value = "";
  projectInput.style.display = "inline-block";
  projectDisplay.style.display = "none";
  projectLabel.textContent = "未开始";
  document.getElementById("focusCountdownDisplay").textContent = "00:00";
}
