// 在 timer.js 顶部定义变量
let cdSec = 0, cdTimer = null, cdOver = 0;

function startFocusCountdown() {
  // 获取 HTML 元素
  const inputField = document.getElementById("focusProjectInput");
  const displayDiv = document.getElementById("currentProjectDisplay");
  const labelText = document.getElementById("projectLabelText");
  const minInput = document.getElementById("focusCountdownMin");

  if (!cdTimer) {
    let min = parseInt(minInput.value);
    if (isNaN(min) || min <= 0) {
      alert("请输入有效的分钟数");
      return;
    }

    // 逻辑：如果是刚开始（秒数为0），则锁定项目名
    if (cdSec === 0) {
      let taskName = inputField.value.trim() || "无题任务";
      
      // UI 切换：隐藏输入框，显示项目名称
      inputField.style.display = "none"; 
      displayDiv.style.display = "block";
      labelText.textContent = taskName;

      cdSec = min * 60;
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

// 记得在 reset 函数里把它们变回来！
function resetFocusCountdown() {
  clearInterval(cdTimer);
  cdTimer = null;
  cdSec = 0;
  cdOver = 0;

  // 恢复 UI
  document.getElementById("focusProjectInput").style.display = "inline-block";
  document.getElementById("currentProjectDisplay").style.display = "none";
  document.getElementById("focusCountdownDisplay").textContent = "00:00";
}
