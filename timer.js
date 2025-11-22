let cdSec = 0, cdTimer = null, cdOver = 0;

function startFocusCountdown(){
  let min = parseInt(document.getElementById("focusCountdownMin").value);

  if (!cdTimer){
    if (cdSec === 0 && min > 0) cdSec = min * 60;

    cdTimer = setInterval(()=>{

      if (cdSec > 0) {
        cdSec--;
      } else {
        cdOver++;   // 超时开始累计
      }

      updateCountdownDisplay();

    },1000);
  }
}

function updateCountdownDisplay() {
  if (cdSec > 0) {
    let m = String(Math.floor(cdSec/60)).padStart(2,'0');
    let s = String(cdSec%60).padStart(2,'0');
    document.getElementById("focusCountdownDisplay").textContent = `${m}:${s}`;
  } else {
    let om = String(Math.floor(cdOver/60)).padStart(2,'0');
    let os = String(cdOver%60).padStart(2,'0');
    document.getElementById("focusCountdownDisplay").textContent =
      `已超时：${om}:${os}`;
  }
}

function stopFocusCountdown(){
  clearInterval(cdTimer);
  cdTimer = null;
}

function resetFocusCountdown(){
  stopFocusCountdown();
  cdSec = 0;
  cdOver = 0;
  document.getElementById("focusCountdownDisplay").textContent = "00:00";
}
