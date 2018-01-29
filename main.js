
const display = document.getElementById('display');
const keypad = document.querySelector('.keypad');

window.onload = function() {
  newCalculation();
}

keypad.addEventListener('click', handleInput, false);

const States = {
  NEW_CALCULATIOIN: 1,
  BUILDING_CALCULATION: 2,
  HAVE_RESULT: 3,
};

let currentState;
let calculation;
let result;

const numberMap = new Map();
numberMap.set('zero', '0');
numberMap.set('one', '1');
numberMap.set('two', '2');
numberMap.set('three', '3');
numberMap.set('four', '4');
numberMap.set('five', '5');
numberMap.set('six', '6');
numberMap.set('seven', '7');
numberMap.set('eight', '8');
numberMap.set('nine', '9');
numberMap.set('point', '.');

const operatorMap = new Map();
operatorMap.set('add', '+');
operatorMap.set('subtract', '-');
operatorMap.set('multiply', '*');
operatorMap.set('divide', '/');

const actionMap = new Map();
actionMap.set('delete', 'delete');
actionMap.set('clear', 'clear');
actionMap.set('equal', 'equal');


function handleInput(e) {
  const btn = e.target.id;

  if (numberMap.has(btn)) {
    const previousInput = calculation.slice(-1);
    let currentNumber = numberMap.get(btn);

    if (previousInput === '.' && currentNumber === '.') {
      currentNumber = '';
    }

    if (currentState === States.NEW_CALCULATIOIN
        || currentState === States.BUILDING_CALCULATION) {
      updateCalc(currentNumber);
    }

    if (currentState === States.HAVE_RESULT) {
      newCalculation();
      updateCalc(currentNumber);
    }
  } // number input

  if (operatorMap.has(btn)) {
    const previousInput = calculation.slice(-1);
    let currentOperator = operatorMap.get(btn);

    if (['+', '-', '*', '/'].includes(previousInput)) {
      if (!(previousInput !== '-' && currentOperator === '-')) {
        currentOperator = '';
      }
    }

    if (currentState === States.NEW_CALCULATIOIN
      || currentState === States.BUILDING_CALCULATION) {
      updateCalc(currentOperator);
    }

    if (currentState === States.HAVE_RESULT) {
      newCalculation(result);
      updateCalc(currentOperator);
    }
  } // operator input

  if (actionMap.has(btn)) {
    let action = actionMap.get(btn);

    if (action === 'equal') {
      getResult(calculation);
    }

    if (action === 'delete') {
      deletePrevious();
    }
  } // action input

  console.log('\nstate: ', currentState);
  console.log(`display: ${display.value} calc: ${calculation}`);
}

function newCalculation(intialValue = '0') {
  intialValue === '0' ? currentState = States.NEW_CALCULATIOIN
                      : currentState = States.BUILDING_CALCULATION;

  display.value = intialValue;
  calculation = intialValue === '0' ? '' : intialValue;
}

function updateCalc(string = '') {
  if (currentState === States.NEW_CALCULATIOIN) {
    if (string === '+' || string === '*' || string === '/') {
      currentState = States.NEW_CALCULATIOIN;
    } else {
      display.value = formatDisplay(string);
      calculation = string;
      currentState = States.BUILDING_CALCULATION;
    }
  } else if (currentState === States.HAVE_RESULT) {
    display.value = formatDisplay(string);
    calculation = string;
  } else {
    display.value += formatDisplay(string);
    calculation += string;
    currentState = States.BUILDING_CALCULATION;
  }
}

function formatDisplay(string) {
  if (string === '*') {
    return '×';
  }
  if (string === '/') {
    return '÷';
  }
  return string;
}

function formatResult(number) {
  const isInt = number % 1 === 0;
  if (isInt) {
    return number.toString();
  } else {
    let currentFloat = number.toFixed(3);
    let lastDigit = currentFloat.slice(-1);

    while (lastDigit === '0') {
      currentFloat = currentFloat.slice(0, -1);
      lastDigit = currentFloat.slice(-1);
    }
    return currentFloat;
  }
}

function getResult(string) {
  if (currentState === States.BUILDING_CALCULATION) {
    result = formatResult(eval(string));
    currentState = States.HAVE_RESULT;
    updateCalc(result);
  }
}

function deletePrevious() {
  display.value = display.value.slice(0, -1);
  calculation = calculation.slice(0, -1);
  if (currentState === States.HAVE_RESULT) {
    result = result.slice(0, -1);
  }
}
