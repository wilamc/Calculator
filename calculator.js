const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const bottomScreen = document.querySelector('.bottom-screen');
const topScreen = document.querySelector('.top-screen');
let currentValue = '';
let previousValue = '';

numberBtns.forEach(button => {
  button.addEventListener('click', (e) => {
    currentValue += e.target.textContent;
    bottomScreen.textContent = currentValue;
  })
  
})

operatorBtns.forEach(button => {
  button.addEventListener('click', (e) => {
    previousValue = currentValue
    currentValue = topScreen.textContent
    topScreen.textContent = previousValue
    topScreen.textContent += e.target.textContent
  })
})

function clear() {
  bottomScreen.textContent = '';
  topScreen.textContent = '';
}

function add(a, b) {
  bottomScreen.textContent += (a + b);
}

function subtract(a, b) {
  bottomScreen.textContent += (a - b);
}

function multiply(a, b) {
  bottomScreen.textContent += (a * b);
}

function divide(a, b) {
  bottomScreen.textContent += (a / b);
}

// Performs the calculation
function operate(operator, a, b) {
  switch (operator) {
    case '+':
      add(a, b);
      break;
    case '-':
      subtract(a, b);
      break;
    case '×':
      multiply(a, b);
      break;
    case '÷':
    divide(a, b);
    break;
  }
}