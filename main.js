
const display = document.getElementById('display');
const keypad = document.querySelector('.keypad');

window.onload = function() {
  newCalculation();
}

keypad.addEventListener('click', handleInput, false);

let States = {
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
// numberMap.forEach((value, key, map) => console.log(value));

const operatorMap = new Map();
operatorMap.set('add', '+');
operatorMap.set('subtract', '-');
operatorMap.set('multiply', '*');
operatorMap.set('divide', '/');

const actionMap = new Map();
actionMap.set('delete', 'delete');
actionMap.set('clear', 'clear');
actionMap.set('equal', 'equal');


function newCalculation(intialValue = '0') {
  intialValue === '0' ? currentState = States.NEW_CALCULATIOIN
                      : currentState = States.BUILDING_CALCULATION;

  display.value = intialValue;
  calculation = intialValue === '0' ? '' : intialValue;
  console.log(calculation);
}

function handleInput(e) {
  const btn = e.target.id;
  console.log(btn.id);

  if (numberMap.has(btn)) {
    console.log('number input');
    if (currentState === States.NEW_CALCULATIOIN
        || currentState === States.BUILDING_CALCULATION) {
      updateCalc(numberMap.get(btn));

    }

    if (currentState === States.HAVE_RESULT) {
      newCalculation();
      updateCalc(numberMap.get(btn));
    }
  }

  if (operatorMap.has(btn)) {
    console.log('operator input');
    if (currentState === States.NEW_CALCULATIOIN
      || currentState === States.BUILDING_CALCULATION) {
      updateCalc(operatorMap.get(btn));
    }

    if (currentState === States.HAVE_RESULT) {
      newCalculation(result);
      updateCalc(operatorMap.get(btn));
    }

  }

  if (actionMap.has(btn)) {
    // when 'clear' is pressed enter state 1.
    // when in state 1. clear is unavaliable
    // when in state 2. 'delete' keeps you in state 2 and removes last input
    // when in state 3. 'delete' is unavaliable

    let action = actionMap.get(btn);
    console.log('take action', action);

    if (action === 'equal') {
      console.log('evaluate', calculation);
      getResult(calculation);
    }

    if (action === 'delete') {
      deletePrevious();
    }
  }
  console.log('state: ', currentState);
  console.log(`display: ${display.value} calc: ${calculation}`);
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
    console.log('update result');
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

function getResult(string) {
// TODO: need to add validation if calc is complete
let valid = true;
  if (currentState === States.BUILDING_CALCULATION) {
    result = eval(string).toString();
    console.log(result);
    if (valid) {
      currentState = States.HAVE_RESULT;
      updateCalc(result);
    }
  }
}

function deletePrevious() {
  display.value = display.value.slice(0, -1);
  calculation = calculation.slice(0, -1);
  if (currentState === States.HAVE_RESULT) {
    result = result.slice(0, -1);
  }
}
