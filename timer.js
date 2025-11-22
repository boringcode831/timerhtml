// ========== 普通倒计时 ==========
let cdSec = 0, cdTimer = null;

function startFocusCountdown(){
  let min = parseInt(document.getElementById("focusCountdownMin").value);

  if (!cdTimer){
    if (cdSec === 0 && min > 0) cdSec = min * 60;

    cdTimer = setInterval(()=>{
      if (cdSec > 0) {
        cdSec--;
        let m = String(Math.floor(cdSec/60)).padStart(2,'0');
        let s = String(cdSec%60).padStart(2,'0');
        document.getElementById("focusCountdownDisplay").textContent = `${m}:${s}`;
      } else {
        stopFocusCountdown();
        alert("倒计时结束！");
      }
    },1000);
  }
}

function stopFocusCountdown(){
  clearInterval(cdTimer);
  cdTimer = null;
}

function resetFocusCountdown(){
  stopFocusCountdown();
  cdSec = 0;
  document.getElementById("focusCountdownDisplay").textContent = "00:00";
}


// ========== 正计时 ==========
let cuSec = 0, cuTimer = null;

function startCountUp(){
  if (!cuTimer){
    cuTimer = setInterval(()=>{
      cuSec++;
      let h = String(Math.floor(cuSec/3600)).padStart(2,'0');
      let m = String(Math.floor((cuSec%3600)/60)).padStart(2,'0');
      let s = String(cuSec%60).padStart(2,'0');
      document.getElementById("countupDisplay").textContent = `${h}:${m}:${s}`;
    },1000);
  }
}

function stopCountUp(){
  clearInterval(cuTimer);
  cuTimer = null;
}

function resetCountUp(){
  stopCountUp();
  cuSec = 0;
  document.getElementById("countupDisplay").textContent = "00:00:00";
}
