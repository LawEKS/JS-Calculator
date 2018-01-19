
const display = document.getElementById('display');

const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');

const equalBtn = document.getElementById('equal');
const deleteBtn = document.getElementById('delete');


let initialised;
let writingNum;
let writingOperator;
let currentNum;
let currentOperator;
let expression;
let result;

initialseCalc();


numberBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    // user starts by inputing numbers
    if (initialised){
      currentNum = '';
      display.value = '';
    }

    initialised = false;
    writeToDisplay(btn.innerHTML);

    if (writingOperator) {
      expression.push(currentOperator);
      currentOperator = '';
    }

    writingNum = true;
    writingOperator = false;
    currentNum += btn.innerHTML;
  });
});

operatorBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    initialised = false;
    writeToDisplay(btn.innerHTML);

    if (writingNum) {
      expression.push(currentNum);
      currentNum = '';
    }

    writingOperator = true;
    writingNum = false;
    currentOperator += btn.innerHTML;
  });
});


deleteBtn.addEventListener('click', function () {
  display.value = display.value.slice(0, -1);

  if (writingNum) {
    currentNum = currentNum.slice(0, -1);
  }
  if (writingOperator) {
    currentOperator = currentOperator.slice(0, -1);
  }
});


equalBtn.addEventListener('click', function () {
  if (currentNum != '') {
    expression.push(currentNum);
  }

  display.value = '';

  if (isValid(expression)) {
    display.style.border = 'none';
    evaluate(expression);
  } else {
    display.style.border = '5px solid red';
  }

});


function initialseCalc() {
  initialised = true;
  writingNum = true;
  writingOperator = false;

  currentNum = '0';
  currentOperator = '';
  display.value = currentNum;
  expression = [];
  result = '';
}

function writeToDisplay(input) {

  console.log(input);

  // TODO: must limit to one operation per expression
  display.value += input;
}

function evaluate(calc) {
  // TODO: must find what calculation that needs to be done
  let a = parseFloat(calc[0]);
  let b = parseFloat(calc[2]);
  switch (calc[1]) {
    case '+':
        result = add(a, b);
      break;

    case '-':
        result = sub(a, b);
      break;
    case 'x':
        result = multiply(a, b);
      break;

    case '÷':
        result = divide(a, b);
      break;
    default:
      result = calc.toString();
      break;
  }

  display.value = result;
}

function isValid(expression) {
  // take my expression as string and break it up using split on an operator
  // true if last char is a number
  // true if even numbebr of numbers and odd number of operators
  // true if numbers are Negative
  // a number is negative if '-' is before a number and there is nothing before it or only one operatror
  return expression.length === 3 ? true : (false);
  console.log(expression);
  // return false;
}

const add = (a, b) => (a + b).toString();
const sub = (a, b) => (a - b).toString();
const multiply = (a, b) => (a * b).toString();
const divide = (a, b) => (a / b).toString();
