const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
/*
const plus = document.getElementById('plus');
const minus = document.getElementById('minus');
const times = document.getElementById('multiply');
const divide = document.getElementById('divide');
*/
const equals = document.getElementById('equals');
const decimal = document.getElementById('decimal');
const clear = document.getElementById('clear');
const del = document.getElementById('delete');
const display = document.getElementById('display');
const results = document.getElementById('results');
const container = document.getElementById('container');
// variable to keep track of display value before operator is chosen
let num = '';
let num2 = '';
let operator = '';
let answer = '';
// when an operator is clicked, 
operators.forEach((op) => {
    op.addEventListener('click', () => {
        // if there are two numbers stored, do math
        /*
        if(num != '' && num2 != '') {
            operator = op.value;
            doMath();
        }
        */
        // save the number before the operator into a new variable
        if(num != '') num2 = num;
        // change the operator to the one that was clicked on
        //display.textContent = op.value;
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
// reset everything when clear is clicked and display a '0'
clear.addEventListener('click', () => {
    display.textContent = '0';
    num = '';
    operator = '';
    results.textContent = '';
})
// delete the latest number clicked by the user and display it
del.addEventListener('click', () => {
    display.textContent = display.textContent.slice(0,-1);
    if(num) num = num.slice(0,-1);
})

equals.addEventListener('click', () => {
    answer = operate(operator, parseFloat(num), parseFloat(num2));
    display.textContent = answer;
    results.textContent = num + operator + num2 + "=";
    num = answer;
})

function add(x,y) {
    return x + y;
}
let subtract = (x,y) => x - y;
let multiply = (x,y) => x * y;
let division = (x,y) => x / y;

function operate(op, x, y) {
    if(op == "+") return (add(x,y)).toString();
    else if(op == "-") return (subtract(x,y)).toString();
    else if(op == "*") return (multiply(x,y)).toString();
    else if(op == "/") return (divide(x,y)).toString();
    else return 'wtf';
}