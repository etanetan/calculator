const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
/*
const zero = document.getElementById('zero');
const one = document.getElementById('one');
const two = document.getElementById('two');
const three = document.getElementById('three');
const four = document.getElementById('four');
const five = document.getElementById('five');
const six = document.getElementById('six');
const seven = document.getElementById('seven');
const eight = document.getElementById('eight');
const nine = document.getElementById('nine');
*/
const plus = document.getElementById('plus');
const minus = document.getElementById('minus');
const times = document.getElementById('multiply');
const divide = document.getElementById('divide');
const equals = document.getElementById('equals');
const decimal = document.getElementById('decimal');
const clear = document.getElementById('clear');
const del = document.getElementById('delete');
const display = document.getElementById('display');
const results = document.getElementById('results');
const container = document.getElementById('container');

let numberOne = '';
let numberTwo = '';
let operator = '';
let answer = '';

operators.forEach((op) => {
    op.addEventListener('click', () => {
        if(numberOne && numberTwo) {
            operator = op.value;
            doMath();
        }
        if(numberOne) numberTwo = numberOne;
        operator = op.value;
        display.textContent = numberOne + operator;
        results.textContent = numberOne + operator;
        numberOne = '';
    })
})

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        numberOne += number.value;
        display.textContent = numberOne;
    })
})

clear.addEventListener('click', () => {
    display.textContent = '0';
    numberOne = '';
    operator = '';
    results.textContent = '';
})

del.addEventListener('click', () => {
    display.textContent = display.textContent.slice(0,-1);
    if(numberOne) numberOne = numberOne.slice(0,-1);
})

equals.addEventListener('click', () => {
    doMath();
})

function doMath() {
    answer = operate(operator, parseFloat(numberTwo), parseFloat(numberOne));
    display.textContent = answer;
    display.textContent = answer;
    numberOne = answer;
}

let add = (x,y) => x + y;
let subtract = (x,y) => x - y;
let multiply = (x,y) => x * y;
let division = (x,y) => x / y;

function operate(operator, x, y) {
    if(operator == '+') add(x,y);
    else if(operator == '-') subtract(x,y);
    else if(operator == '*') multiply(x,y);
    else if(operator == '/') divide(x,y);
    else return 'error';
}