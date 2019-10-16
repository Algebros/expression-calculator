// const operators = {
//     '+': (x, y) => x + y,
//     '-': (x, y) => x - y,
//     '*': (x, y) => x * y,
//     '/': (x, y) => {
//         if(x == 0 || y == 0) {
//             throw Error("TypeError: Division by zero.");
//         }
//         return x / y;
//     }
// };

const priority = {
    '(': 1,
    // ')': 1,
    '+': 2,
    '-': 2,
    '*': 3,
    '/': 3
};

function expressionCalculator(expr) {
    let expression = reversePolishNotation(expr);
    return calc(expression); 
}

function calc(expr) {
    for (let i = 0; i < expr.length; i++) {
        if(priority[expr[i]]) {
            let operand1 = expr[i-2];
            let operand2 = expr[i-1];
            let operator = expr[i];
            let result = null;
            switch (operator) {
                case "+":
                    result = +operand1 + +operand2;
                break;
                case "-":
                    result = +operand1 - +operand2;
                break;
                case "*":
                    result = +operand1 * +operand2;
                break;
                case "/":
                    if(operand1 == 0 || operand2 == 0) {
                        throw Error("TypeError: Division by zero.");
                    }
                    result = +operand1 / +operand2;
                break;
            
                default:
                    break;
            }

            expr.splice(i-2, 3, result);
            i=0;
        }
    }
    return expr[0];
}

function reversePolishNotation(expr) {

    let arr = divideElements(expr);
    // let brackets = [];
    // arr.forEach(e => {
    //     if(e == "(" || e == ")") {
    //         brackets.push(e);
    //     }        
    // });
    // console.log(brackets);
    // console.log();
    // if(!check(brackets, ["(", ")"])) {
    //     throw Error("ExpressionError: Brackets must be paired");
    // }

    let result = [];
    let stackSymbol = [];

    for (let i = 0; i < arr.length; i++) {
        let currentItem = arr[i];
        let lastSymbol = stackSymbol[stackSymbol.length-1];

        let weDo = whatWeDo(currentItem, lastSymbol);
        switch (weDo) {
            case "first":
                result.push(currentItem);
            break;

            case "second":
                stackSymbol.push(currentItem);
            break;

            case "third":
                result.push(stackSymbol.pop());
                i--;
            break;

            case "fourth":
                stackSymbol.pop();
            break;

            case "fifth":
                result.push(stackSymbol.pop());
                i = i;
            break;
        
            default:
            break;
        }
    }
    while(stackSymbol.length != 0) {
        result.push(stackSymbol.pop());
    }
    result.forEach((e, i) => {
        if(e == "(" || e == ")") {
            result.splice(i, 1);
        }
    });
    console.log(result);
    console.log(stackSymbol);
    return result;
}

function check(arr, bracketsConfig) {
    let obj = {};
    bracketsConfig.forEach(element => {
      obj[element[0]] = element[1];
    });
    
    // let arr = str.split("");
    let stack = [];
    for (let i = 0; i < arr.length; i++) {
      let lastBracket = stack[stack.length-1];
      if(obj[lastBracket] == arr[i]) {
        stack.pop();
      } else {
        stack.push(arr[i]);
      }
    }
    if(stack.length == 0) return true;
    return false;
  }


function whatWeDo(currentItem, lastSymbol) {
    // console.log(`Первый символ ${currentItem}`);
    // console.log(`Второй символ ${lastSymbol}`);
    if(!!Number(currentItem) || currentItem == "0") {
        return "first";
    } else if(currentItem == "(" || currentItem == ")") {
        // if(currentItem == ")" && lastSymbol) {
        //     console.log("zashel");
        //     return "fourth";
        // }
        if(currentItem == "(") return "second";
        if(currentItem == ")" && lastSymbol == priority[currentItem]) return "third";
    } else {
        if(priority[currentItem] == priority[lastSymbol]) return "third";
        if(priority[currentItem] > priority[lastSymbol]) return "second";
        if(priority[currentItem] < priority[lastSymbol]) return "third";
        return "second";
    }
}

function divideElements(expr) {
    let divide = expr.split("");
    for (let i = 0; i < divide.length; i++) {
        if(divide[i] == " ") {
            divide.splice(i, 1);
            i--;
        }
    }

    let arr = [];
    
    let wasNumber = null;
    divide.forEach(element => {
        if(!Number(element) && element != "0") {
            arr.push(element);
            wasNumber = false;
        } else if(wasNumber) {
            arr[arr.length-1] += element;            
        } else if(!!Number(element) || element == 0) {
            arr.push(element);
            wasNumber = true;
        }
    });
    return arr;
}

module.exports = {
    expressionCalculator
}