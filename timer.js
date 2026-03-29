// timer.js 完整版
let cdSec = 0, cdTimer = null, cdOver = 0;

function startFocusCountdown() {
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

    if (cdSec === 0) {
      let taskName = inputField.value.trim() || "无题任务";
      inputField.style.display = "none"; 
      displayDiv.style.display = "block";
      labelText.textContent = taskName;
      cdSec = min * 60;
      cdOver = 0; // 重置超时计数
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

// 补全这个显示函数！
function updateCountdownDisplay() {
  const display = document.getElementById("focusCountdownDisplay");
  if (cdSec > 0) {
    let m = String(Math.floor(cdSec / 60)).padStart(2, '0');
    let s = String(cdSec % 60).padStart(2, '0');
    display.textContent = `${m}:${s}`;
    display.style.color = "black"; // 正常倒计时颜色
  } else {
    let om = String(Math.floor(cdOver / 60)).padStart(2, '0');
    let os = String(cdOver % 60).padStart(2, '0');
    display.textContent = `已超时：${om}:${os}`;
    display.style.color = "red"; // 超时变红
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

  // 恢复 UI
  const inputField = document.getElementById("focusProjectInput");
  const displayDiv = document.getElementById("currentProjectDisplay");
  if(inputField) inputField.style.display = "inline-block";
  if(displayDiv) displayDiv.style.display = "none";
  document.getElementById("focusCountdownDisplay").textContent = "00:00";
}
