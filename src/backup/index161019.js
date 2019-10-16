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
    '+': 2,
    '-': 2,
    '*': 3,
    '/': 3
};

function expressionCalculator(expr) {
    let divide = [];
    divide = divideElements(expr);

    // let condition = true;
    // while (condition) {
    let arr = check(divide, ["(", ")"]);
    console.log(arr);
    let polishReverse = pnr(arr[0]);
    console.log(polishReverse);
    let result = calc(polishReverse);
    console.log(result);


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

function pnr(arr) {
    let result = [];
    let stackSymbol = [];

    for (let i = 0; i < arr.length; i++) {
        if(arr[i] == "(" || arr[i] == ")") continue;
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
        
            default:
            break;
        }
    }
    while(stackSymbol.length != 0) {
        result.push(stackSymbol.pop());
    }
    return result;
} 

function whatWeDo(currentItem, lastSymbol) {
    if(!!Number(currentItem) || currentItem == "0") {
        return "first";
    } else {
        if(priority[currentItem] == priority[lastSymbol]) return "third";
        if(priority[currentItem] > priority[lastSymbol]) return "second";
        if(priority[currentItem] < priority[lastSymbol]) return "third";
        return "second";
    }
}

function check(arr, bracketsConfig) {
    let obj = {};
    bracketsConfig.forEach(element => {
      obj[element[0]] = element[1];
    });
    
    let stack = [];
    let index = [];
    for (let i = 0; i < arr.length; i++) {
    //   let lastBracket = stack[stack.length-1];
      if(arr[i] == ")") {
        index.push(i);
        stack.push(arr[i]);
        break;
      } else if(arr[i] == "(") {
        index.push(i);
        stack.push(arr[i]);
      } else if(stack[0]) {
        stack.push(arr[i]);
      }
    }
    stack.push(stack.splice(stack.lastIndexOf("(")));
    if(stack.length == 0) return false;
    stack.push([index[index.length-2], index[index.length-1]]);
    return stack;
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