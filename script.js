

let add = (x,y) => x + y;
let subtract = (x,y) => x - y;
let multiply = (x,y) => x * y;
let divide = (x,y) => x / y;

function operate(operator, x, y) {
    if(operator === '+') add(x,y);
    else if(operator === '-') subtract(x,y);
    else if(operator === '*') multiply(x,y);
    else if(operator === '/') divide(x,y);
    else return 'error';
}