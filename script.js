function add(x, y) {
  console.log("im in add func");
}

function subtract(x, y) {
  console.log("im in sub func");
}

function multiply(x, y) {
  console.log("im in mult func");
}

function divide(x, y) {
  console.log("im in div func");
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

function parse() {
  const str = "2           + 2";
  const [x, operator, y] = str.split(/\s+/);
  operate(x, operator, y);
}

parse();
