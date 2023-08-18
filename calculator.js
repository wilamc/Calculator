const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const equalBtn = document.querySelector('.equal');
const clearBtn = document.querySelector('#clear');
const backspaceBtn = document.querySelector('#backspace');
const bottomScreen = document.querySelector('.bottom-screen');
const topScreen = document.querySelector('.top-screen');
const btn = document.querySelectorAll('.btn');

let currentValue = '0';
let previousValue = '';
let currentOperator = null;
const MAX_DISPLAY_LENGTH = 15;
bottomScreen.textContent = currentValue; 

numberBtns.forEach(button => {
  button.addEventListener('click', () => {
    if (currentValue === '0') {
      currentValue = '';
    }
    currentValue += button.textContent;
    bottomScreen.textContent = currentValue;
  })
})

operatorBtns.forEach(button => {
  button.addEventListener('click', () => {
    if (currentValue !== '') {
      if (currentOperator !== null && previousValue !== '') {
        performCalculation();
      }
      currentOperator = button.textContent;
      previousValue = currentValue;
      currentValue = '';
      topScreen.textContent = previousValue + ' ' + currentOperator;
    } 
    else if (previousValue !== '' && currentOperator !== null) {
      currentOperator = button.textContent;
      topScreen.textContent = previousValue + ' ' + currentOperator;
    }
  })
})

document.addEventListener('keydown', (event) => {
  const key = event.key;

  const keyboardOperators = {
    '+':'+',
    '-':'-',
    '*':'×',
    '/':'÷',
  }
  const calculatorOperator = keyboardOperators[key];
  if (!isNaN(key) || isNaN(key)) {
    btn.forEach(button => {
      if (button.textContent === key || button.textContent === calculatorOperator) {
        button.style.backgroundColor = 'gray';
      }
    })
  }
  document.addEventListener('keyup', (event) => {
    if (!isNaN(key) || isNaN(key)) {
      btn.forEach(button => {
        if (button.textContent === key || button.textContent === calculatorOperator) {
          button.style.backgroundColor = '';
        }
      })
    }
  })
// Handle the keyboard functionality
  if ((!isNaN(key) && key !== ' ') || key === '.') {
    if ((key === '.' && currentValue.includes('.'))) {
      return
    }
    if ((currentValue === '0' || currentValue === '') && key === '.') {
      currentValue = '0';
    }
    if (currentValue === '0' && key !== '.') {
      currentValue = '';
    }
    currentValue += key;

    if (currentValue.length > MAX_DISPLAY_LENGTH) {
      currentValue = currentValue.slice(0, MAX_DISPLAY_LENGTH);
    }
    bottomScreen.textContent = currentValue;
  }
  else {
    if (keyboardOperators.hasOwnProperty(key)) {
      if (currentValue !== '') {
        if (currentOperator !== null && previousValue !== '') {
          performCalculation();
        }
        currentOperator = calculatorOperator;
        previousValue = currentValue;
        currentValue = '';
        topScreen.textContent = previousValue + ' ' + currentOperator;
      }
      else if (previousValue !== '' && currentOperator !== null) {
        currentOperator = calculatorOperator;
        topScreen.textContent = previousValue + ' ' + currentOperator;
      }
    } 
    else if (key === 'Enter') {
      event.preventDefault(); // Prevent default behavior for the Enter key
      performCalculation();
    }
    else if (key === 'End' || key === 'Escape') {
      clear();
    }
    else if (key === 'Backspace' || key === 'Delete') {
      if (currentValue !== '0') {
        currentValue = currentValue.slice(0, -1);
        bottomScreen.textContent = currentValue;
      }
      if (currentValue === '') {
        currentValue = '0';
        bottomScreen.textContent = currentValue;
      }
    }
  }
})
// Click event listeners equivalent to keydowns
equalBtn.addEventListener('click', () => {
  performCalculation();
})

clearBtn.addEventListener('click', () => {
  clear();
})

backspaceBtn.addEventListener('click', () => {
  if (currentValue !== '0') {
    currentValue = currentValue.slice(0, -1);
    bottomScreen.textContent = currentValue;
  }
  if (currentValue === '') {
    currentValue = '0';
    bottomScreen.textContent = currentValue;
  }
})

function clear() {
  currentValue = '0';
  previousValue = '';
  topScreen.textContent = '';
  bottomScreen.textContent = currentValue;
}

function performCalculation() {
  if (currentValue && previousValue && currentOperator) {
    const firstOperand = parseFloat(previousValue);
    const secondOperand = parseFloat(currentValue);
    if (isNaN(firstOperand) || isNaN(secondOperand)) {
      clear();
      bottomScreen.textContent = 'Invalid input';
      return
    }
    const result = calculate(currentOperator, firstOperand, secondOperand);
    clear();
    currentValue = result.toString();
    if (currentValue.length > MAX_DISPLAY_LENGTH) {
      currentValue = currentValue.slice(0, MAX_DISPLAY_LENGTH);
    }
    bottomScreen.textContent = currentValue;
  }
}

// Round decimals to specified decimal place, mainly to address floating-point precision problems
function roundDecimals(result, decimals = MAX_DISPLAY_LENGTH) {
  const multiplier = 10 ** decimals;
  return Math.round(result * multiplier) / multiplier
}

function calculate(operator, a, b) {
  switch (operator) {
    case '+':
      return roundDecimals(a + b);
    case '-':
      return roundDecimals(a - b);
    case '×':
      return roundDecimals(a * b);
    case '÷':
      if (b === 0) {
        return "Error: Division by Zero"
      }
      return roundDecimals(a / b);
    default:
      return "Error: Invalid operator"
    }
  }