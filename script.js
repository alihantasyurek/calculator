let currNumber = "";
const maxValidNum = 11;
const values = [];
const validOperators = ["+", "-", "*", "/"];
const operatorRegex = /[+\-*/]/;
const display = document.querySelector("#display");
display.textContent = 0;
const body = document.querySelector("#body");

body.addEventListener("click", (e) => {
  const val = e.target.value;
  if (val) {
    handleInput(val);
  }
});

function updateCurr() {
  if (isPointEnabled === true && returnVal) {
    if (returnVal.includes(".")) {
      isPointEnabled = false;
    }
    currNumber = returnVal;
  }
}

function checkSpecialInputs(val) {
  updateCurr();
  if (val === "clear") {
    fullClear();
    return true;
  } else if (val === "remove") {
    if (currNumber) {
      if (currNumber.at(-1) === ".") isPointEnabled = true;
      currNumber = currNumber.slice(0, -1);
      returnVal &&= currNumber;
      display.textContent = currNumber || "0";
      return true;
    }
  } else if (val === "point") {
    if (isPointEnabled) {
      currNumber += currNumber ? "." : "0.";
      display.textContent = currNumber;
      isPointEnabled = false;
    }
    return true;
  }
  return false;
}

let isPointEnabled = true;
function handleInput(val) {
  const isOperator = validOperators.includes(val);
  if (checkSpecialInputs(val)) return;
  if (!isNaN(val)) { // if it's a digit
    if (currNumber.length < maxValidNum) {
      currNumber += val;
      display.textContent = currNumber;
    }
  } else {
    processOperator(isOperator, val);
    // if the index is 1 and user presses any other operator update the operator
    const index = values.findIndex((el) => validOperators.includes(el));
    if (index !== -1 && values.length === 2 && val !== "=") {
      values[index] = val;
    }
  }
}

function processOperator(isOperator, val) {
  pushNum();
  pushVal(val);
  callParse();
  handleReturn(isOperator, val);
}

function handleReturn(isOperator, val) {
  if (values.length > 0) {
    returnVal = null;
    return;
  }
  if (isOperator && returnVal) {
    values.push(returnVal);
    values.push(val); // operator
  } else if (val === "=") {
    return;
  }
  returnVal = null;
}

function fullClear() {
  cleanInput();
  returnVal = null;
  currNumber = "";
  display.textContent = 0;
  isPointEnabled = true;
}

function pushVal(val) {
  if (values.length > 0 && values.length < 2) {
    values.push(val);
  }
}

function pushNum() {
  if (currNumber) {
    values.push(currNumber);
    currNumber = "";
    isPointEnabled = true;
  }
}

function callParse() {
  if (values.length === 3) {
    const str = values.join("");
    parse(str);
  }
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

let returnVal = null;
function add(x, y) {
  const res = x + y;
  resStr = res.toString();
  cleanInput();
  if (resStr.length > maxValidNum) {
    const check = resStr.includes(".") || resStr.includes("-");
    resStr = check ? resStr.slice(0, maxValidNum) : "9".repeat(maxValidNum);
  }
  returnVal = resStr;
  display.textContent = resStr;
}

function subtract(x, y) {
  const res = x - y;
  resStr = res.toString();
  cleanInput();
  if (resStr.length > maxValidNum) {
    const check = resStr.includes(".") || resStr.includes("-");
    resStr = check ? resStr.slice(0, maxValidNum) : "9".repeat(maxValidNum);
  }
  returnVal = resStr;
  display.textContent = resStr;
}

function multiply(x, y) {
  const res = x * y;
  resStr = res.toString();
  cleanInput();
  if (resStr.length > maxValidNum) {
    const check = resStr.includes(".") || resStr.includes("-");
    resStr = check ? resStr.slice(0, maxValidNum) : "9".repeat(maxValidNum);
  }
  returnVal = resStr;
  display.textContent = resStr;
}

function divide(x, y) {
  const res = x / y;
  resStr = res.toString();
  cleanInput();
  if (resStr.length > maxValidNum) {
    const check = resStr.includes(".") || resStr.includes("-");
    resStr = check ? resStr.slice(0, maxValidNum) : "9".repeat(maxValidNum);
  }
  returnVal = resStr;
  display.textContent = resStr;
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
