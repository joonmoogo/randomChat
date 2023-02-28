//const { Socket } = require("socket.io");


/*const timer = document.querySelector('#timer')
const timerButton = document.querySelector('#startButton');
let timerId;
let time = 0;
let counter = 0;
let hour,min,sec;
const longButton = document.querySelector("#longButton");*/

/*timerButton.addEventListener('click',()=>{
    clearInterval(timerId);
    time = 0;
    timer.innerHTML="Time: 00:00"
    clearTimeout(time);
    timerId = setInterval(printTime,1000);
    timerButton.innerHTML= '다시하기'
    timerButton.classList.remove('is-success');
    timerButton.classList.add('is-warning');

});*/

function getTimeFormatString() {
    hour = parseInt(String(time / (60 * 60)));
    min = parseInt(String((time - (hour * 60 * 60)) / 60));
    sec = time % 60;
    return "Time: " +String(min).padStart(2, '0') + ":" + String(sec).padStart(2, '0') + " => 05:00";
}
 // 타이머 5분되면 초기화 되게 만들거임
function printTime(){
    time++;
    timer.innerHTML = getTimeFormatString();
    if(time == 300){
        timerButton.classList.remove('is-warning'); // 색깔 놀이
        timerButton.classList.add('is-success');
        timerButton.innerHTML = '시작하기';
        clearInterval(timerId);
        timer.innerHTML="Time: 00:00";
        socket.disconnect();
        window.location.href="/profile";
        alert('방에서 퇴장되었습니다.')
    }
    if(time > 60){
        longButton.style.display = 'block'; // 1분 넘으면 1분 감소버튼 보이게
    }
    
}

longButton.addEventListener('click',()=>{
    time -= 60;
    longButton.setAttribute("disabled",""); // 1분 감소버튼 누르면 disabled됨 
    
})



