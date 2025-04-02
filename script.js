function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
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

let currNumber = "";
const values = [];
const validOperators = ["+", "-", "*", "/"];
const operatorRegex = /[+\-*/]/;

const display = document.querySelector("#display");
display.addEventListener("click", (e) => {
  const val = e.target.value;
  if (!isNaN(val)) { // if it's a digit
    currNumber += val;
  } else if (validOperators.includes(val)) {
    if (currNumber) {
      values.push(currNumber);
    }
    if (values.some((el) => validOperators.includes(el)) || !values.length) {
      return;
    }
    values.push(val); // operator
    currNumber = "";
  }
  // eval with = or auto-eval and send it to parse
});
// if (values.length === 3) {
//   const str = values.join("");
//   parse(str);
// }
