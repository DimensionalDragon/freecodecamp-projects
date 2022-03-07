const beep = document.querySelector('#beep');

function resetBeep() {
    beep.pause();
    beep.currentTime = 0;
}

function playBeep() {
    resetBeep();
    beep.play();
}

export {resetBeep, playBeep};