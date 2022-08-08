const mainDiv = document.querySelector("#main-div");
const subDiv = document.querySelector("#sub-div");
const start = document.querySelector("#start");
const retry = document.querySelector("#retry");
const form = document.querySelector("form");
const firstInput = document.querySelector("#first-input");
const secondInput = document.querySelector("#second-input");
const thirdInput = document.querySelector("#third-input");
const check = document.querySelector("#check");
let randomNumber = [];
let inputNumber = [];
let tryNumber = 0;
let ballNumber = 0;
let strikeNumber = 0;

function chooseRandomNumber() {
    while(true) {
        const number = String(Math.ceil(Math.random() * 9));
        if(randomNumber.length === 3) {
            break;
        } else if(randomNumber.length === 0) {
            randomNumber.push(number);
        } else if(randomNumber.indexOf(number) === -1) {
            randomNumber.push(number);
        }
    }
}

function clickStart() {
    start.classList.add("hidden");
    form.classList.remove("hidden");
    chooseRandomNumber();
    firstInput.focus();
}

function firstToSecond(event) {
    if(event.target.value >= 1 && event.target.value <= 9) {
        secondInput.focus();
    } else {
        event.target.value = "";
    }
}

function secondToThird(event) {
    if(event.target.value >= 1 && event.target.value <= 9) {
        thirdInput.focus();
    } else {
        event.target.value = "";
    }
}

function thirdToSecond(event) {
    if(event.target.value >= 1 && event.target.value <= 9) {
    } else {
        event.target.value = "";
    }
}

function enterKey(event) {
    if(event.keyCode == 13) {
        clickCheck();
    }
}

function clickCheck() {
    if(firstInput.value === "" || secondInput.value === "" || thirdInput.value === "") {
        alert("숫자를 입력해 주세요.");
    } else if(firstInput.value === secondInput.value || secondInput.value === thirdInput.value || thirdInput.value === firstInput.value) {
        alert("중복되지 않게 숫자를 입력해 주세요.");
    } else {
        inputNumber = [];
        inputNumber.push(firstInput.value);
        inputNumber.push(secondInput.value);
        inputNumber.push(thirdInput.value);
        judgeNumbers();
    }
    firstInput.value = secondInput.value = thirdInput.value = "";
    firstInput.focus();
}

function judgeNumbers() {
    tryNumber += 1;
    strikeNumber = ballNumber = 0;
    for(i = 0; i < 3; i++) {
        for(r = 0; r < 3; r++) {
            if(inputNumber[i] === randomNumber[r]) {
                if(i == r) {
                    strikeNumber += 1;
                } else {
                    ballNumber += 1;
                }
            }
        }
    }
    const h4 = document.createElement("h4");
    h4.innerText = `${inputNumber[0]}${inputNumber[1]}${inputNumber[2]} ${ballNumber}B ${strikeNumber}S`;
    subDiv.appendChild(h4);
    if(strikeNumber === 3) {
        form.classList.add("hidden");
        const h4 = document.createElement("h4");
        h4.id = "try-number";
        h4.innerText = `${tryNumber}번만에 맞혔어요!`;
        subDiv.appendChild(h4);
        retry.classList.remove("hidden");
    }
}

function clickRetry() {
    subDiv.innerHTML = "";
    randomNumber = [];
    tryNumber = 0;
    form.classList.remove("hidden");
    retry.classList.add("hidden");
    chooseRandomNumber();
    firstInput.focus();
}

start.addEventListener("click", clickStart);
check.addEventListener("click", clickCheck);
retry.addEventListener("click", clickRetry);