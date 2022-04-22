const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');

const divide = document.getElementById('divide');
const decimal = document.getElementById('decimal');
const equals = document.getElementById('equals');
const clear = document.getElementById('clear');
const del = document.getElementById('delete');
const display = document.getElementById('display');
const results = document.getElementById('results');
// variable to keep track of display value before operator is chosen
let num = '';
// keep track of other operand
let num2 = '';
// keep track of which operator is being used
let operator = '';
// keep track of computation answer to pass into another operation
let answer = '';
// when an operator is clicked, 
operators.forEach((op) => {
    op.addEventListener('click', () => {
        // if there are two numbers stored, do math with current operator, then switch operator
        if(num != '' && num2 != '') {
            doMath();
            operator = op.value;
        }
        // save the number before the operator into a new variable
        if(num != '') num2 = num;
        // change the operator to the one that was clicked on
        operator = op.value;
        // display the original number plus the operator
        display.textContent = num + operator;
        results.textContent = num + operator;
        // reset the number
        num = '';
    })
})
// when a number is clicked before an operator, add it to the displayed number
numbers.forEach((number) => {
    number.addEventListener('click', () => {
        num += number.value;
        display.textContent = num;
    })
})
// check if they already have a decimal in the number
decimal.addEventListener('click', () => {
    decimalHandler();
})
// passed off to helper function
function decimalHandler() {
    // add a leading zero for numbers less than one
    if (num == '') {
        num += '0.';
        display.textContent = num;
    }
    // if the number doesn't have a decimal point, add it now
    else if (!num.includes('.')) {
        num += '.';
        display.textContent = num;
    }
    // otherwise, just return and don't update num or display
    else return;
}
// reset everything when clear is clicked and display a '0'
clear.addEventListener('click', () => {
    display.textContent = '0';
    num = '';
    num2 = '';
    operator = '';
    results.textContent = '';
})
// delete the latest number clicked by the user and display it
del.addEventListener('click', () => {
    delHandler();
})
// function to delete last number inputted
function delHandler() {
    if(display.textContent == '0') return;
    display.textContent = display.textContent.slice(0,-1);
    if(num) num = num.slice(0,-1);
    if(display.textContent == '') display.textContent = '0';
}
// do the current computation and display the results
equals.addEventListener('click', () => {
    doMath();
})
// function to take in two numbers and an operator and display the result of the math
function doMath() {
    answer = operate(operator, parseFloat(num2), parseFloat(num));
    display.textContent = answer;
    results.textContent = num2 + operator + num + "=";
    num = answer;
    num2 = '';
}
// function for keyboard support and check which key was pressed
document.addEventListener('keydown', (e) => {
    keyPress(e.key);
})
 
// function to display number if number was used
function keyPress(key) {
    // if shift is used to produce an operator key, ignore it
    if(key == 'Shift') return;
    // if it is a number, display it
    if(!isNaN(parseInt(key))) {
        num += key;
        display.textContent = num;
    }
    else if(key == '.') {
        decimalHandler();
    }
    // if they type in an operation, call helper function to resolve math
    else if(key == '+' || key == '-' || key == '*') {
        operationHandler(key);
    }
    // special case for division to show real division symbol instead of slash
    else if(key == '/') {
        operationHandler(divide.value);
    }
    else if(key == 'Backspace') {
        delHandler();
    }
    // call doMath() if they type in an equals sign or enter
    else if(key == '=' || key == 'Enter') doMath();
    // otherwise return, invalid input
    else return;
}
function operationHandler(op) {
    // if there are two numbers stored, do math with current operator, then switch operator
    if(num != '' && num2 != '') {
        doMath();
        operator = op;
    }
    // save the number before the operator into a new variable
    if(num != '') num2 = num;
    // change the operator to the one that was clicked on
    operator = op;
    // display the original number plus the operator
    display.textContent = num + operator;
    results.textContent = num + operator;
    // reset the number
    num = '';
}
// functions to carry out simple arithmetic
let add = (x,y) => x + y;
let subtract = (x,y) => x - y;
// have multiply and divide both get rid of trailing zeroes and round to 8 digits
let multiply = (x,y) => parseFloat((x * y).toFixed(8));
function division(x,y) {
    if (y == 0) return 'err';
    else return parseFloat(((x / y).toFixed(8)));
}
// function to decide which arithmetic operation is to be used based on chosen operator
function operate(op, x, y) {
    if(op == "+") return (add(x,y)).toString();
    else if(op == "-") return (subtract(x,y)).toString();
    else if(op == "*") return (multiply(x,y)).toString();
    else return (division(x,y)).toString();
}