let currNumber = "";
const values = [];
const validOperators = ["+", "-", "*", "/"];
const operatorRegex = /[+\-*/]/;
const display = document.querySelector("#display");
const body = document.querySelector("#body");
body.addEventListener("click", (e) => {
  const val = e.target.value;
  if (val) {
    handleInput(val);
  }
});

// if the index is 1 and user presses any other operator update the operator
// const index = values.findIndex((el) => validOperators.includes(el));
// if (index !== -1 && values.length === 2) {
//   values[index] = val;
//   return;
// }

function handleInput(val) {
  const isOperator = validOperators.includes(val);
  if (!isNaN(val)) { // if it's a digit
    currNumber += val;
    display.textContent = currNumber;
  } else if (isOperator) {
    pushNum();
    if (!values.length) return;
    if (callParse()) {
      handleReturn(isOperator);
    }
    values.push(val); // operator
  } else if (val === "=") {
    pushNum();
    callParse();
  }
}

function pushNum() {
  if (currNumber) {
    values.push(currNumber);
    currNumber = "";
  }
}

//refactor this 2+2+3 = doesn't work
function handleReturn(isOperator) {
  if (isOperator) {
    values.push(returnVal);
  }
}

function callParse() {
  if (values.length === 3) {
    const str = values.join("");
    parse(str);
    return true;
  }
  return false;
}

function parse(str) {
  let [x, y] = str.split(operatorRegex);
  const operatorMatch = str.match(operatorRegex);
  if (!operatorMatch) return cleanInput();
  const operator = operatorMatch[0];
  x = Number(x);
  y = Number(y);
  if (isNaN(x) || isNaN(y)) return cleanInput();
  operate(x, operator, y);
}

// if (values.some((el) => validOperators.includes(el))) {
//   return;
// }

// TODO HANDLE / 0

let returnVal = 0; // TOFIX
function add(x, y) {
  const res = x + y;
  cleanInput();
  returnVal = res;
  display.textContent = res;
}

function subtract(x, y) {
  const res = x - y;
  cleanInput();
  returnVal = res;
  display.textContent = res;
}

function multiply(x, y) {
  const res = x * y;
  cleanInput();
  returnVal = res;
  display.textContent = res;
}

function divide(x, y) {
  const res = x / y;
  cleanInput();
  returnVal = res;
  display.textContent = res;
}

function operate(x, operator, y) {
  switch (operator) {
    case "+":
      add(x, y);
      break;
    case "-":
      subtract(x, y);
      break;
    case "*":
      multiply(x, y);
      break;
    case "/":
      divide(x, y);
      break;
    default:
      console.log("Operator can't be found");
  }
}

function cleanInput() {
  values.length = 0; // []
  display.textContent = "";
}
