const numberBtns = document.querySelectorAll('.number'); //setting DOMs
const operatorBtns = document.querySelectorAll('.operator');
const equalBtn = document.querySelector('.equal');
const clearBtn = document.querySelector('#clear');
const backspaceBtn = document.querySelector('#backspace');
const bottomScreen = document.querySelector('.bottom-screen');
const topScreen = document.querySelector('.top-screen');
let currentValue = ''; //creating values that can be changeable and replaced
let previousValue = '';
let currentOperator = null;
let shouldResetScreen = false;

numberBtns.forEach(button => { //create event listeners for each number button
  button.addEventListener('click', () => {
    if (shouldResetScreen) {
      resetScreen();
    }
    currentValue += button.textContent; //capture the clicked number and display it
    bottomScreen.textContent = currentValue;
  })
})

operatorBtns.forEach(button => { //create event listener for each operator button
  button.addEventListener('click', () => {
    if (currentValue !== '') {
      if(currentOperator !== null && previousValue !== '') {
        performCalculation(); //call function if there is an operator and value
      } //if there is a current value, set an operator and display it
    currentOperator = button.textContent;
    previousValue = currentValue;
    currentValue = '';
    topScreen.textContent = previousValue + ' ' + currentOperator;
    shouldResetScreen = false;
    } else if (previousValue !== '' && currentOperator !== null) {
      currentOperator = button.textContent;
      topScreen.textContent = previousValue + ' ' + currentOperator;
    }//if we want to change the current operator, else if with criteria
  })
})

function calculate(operator, a, b) { //calculates taking in operator and 2 numbers
  switch(operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '×':
      return a * b;
    case '÷':
      if (b === 0) {
        return "Error: Division by Zero";
      }
      return a / b;
    default:
      return "Error: Invalid operator";
  }
}
