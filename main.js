let hitNumber = document.querySelector('.score__hit_number');
let missNumber = document.querySelector('.score__miss_number');
let leftNumber = document.querySelector('.score__left_number');
let showNumber = document.querySelector('.monitor__number');
let startBtn = document.querySelector('.btn__start');

const radioButtons = document.querySelectorAll('input[type="radio"]');
const keyboardLayout = document.querySelectorAll('.keyboard-layout .key');

let speed = 3500;
let playerMove = false;
let randomNumberShow;

function handleSpeedChange() {
    speed = document.querySelector('input[type="radio"]:checked').value;
  }

function generateRandomNumbers() {

    let randomNumbers = [];
    let index = 0;

    while (randomNumbers.length < 26) {
        let r = Math.floor( Math.random()*26 ) + 1;
        if ( randomNumbers.indexOf(r) === -1 ) {
            randomNumbers.push(r);
        }
    }
    console.log(randomNumbers);

    setInterval(function() {
        randomNumberShow = randomNumbers[index]; 
        showNumber.innerText = randomNumberShow;   
        index++;  
    }, speed);

    playerMove = true;

}

function init() {
    hitNumber.innerText = "0";
    missNumber.innerText = "0";
    leftNumber.innerText = "26";
    showNumber.innerText = "0";
    
    generateRandomNumbers();

    for (let i = 0; i < keyboardLayout.length; i++) {
        keyboardLayout[i].classList.remove('succ');
        keyboardLayout[i].classList.remove('miss');
    }

    document.getElementById('easy').setAttribute("disabled", true);
    document.getElementById('normal').setAttribute("disabled", true);
    document.getElementById('hard').setAttribute("disabled", true);

}
function checkWord(event) {

    const letter = event.key.toUpperCase();
    const numberCharacter = letter.charCodeAt();

    if ( numberCharacter === (randomNumberShow + 64) ) {
        keyboardLayout[randomNumberShow-1].classList.add('succ');
        hitNumber.innerText = Number(hitNumber.innerText) + 1;
        leftNumber.innerText = Number(leftNumber.innerText) - 1;
    } else {
        keyboardLayout[randomNumberShow-1].classList.add('miss');
        missNumber.innerText = Number(missNumber.innerText) + 1;
        leftNumber.innerText = Number(leftNumber.innerText) - 1;
    }

    playerMove = false;
}

for (let i = 0; i < radioButtons.length; i++) {
    radioButtons[i].addEventListener('change', handleSpeedChange);
  }


startBtn.addEventListener('click', init);

window.addEventListener("keypress", checkWord);

