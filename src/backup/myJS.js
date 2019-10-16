function expressionCalculator(expr) {
    let arr = expr.split(' ');
    let startedArr = arr.filter(x => {
        if (x !== ' ') {
            return x;
        }
    });
    let res = [];
    let finRes;
    if (res.length === 1) {
        finRes = +res[0].toFixed(4);
        console.log(finRes);
        return finRes;
    }

    //for (let i = 0; i < startedArr.length; i++) {
    if (startedArr.length === 3) {
        startedArr.forEach(x => {
            if (x === '*') {
                finRes = Number(mult(startedArr).split('')).toFixed(4);
            }

            if (x === '/') {
                finRes = div(startedArr).toFixed(4);
            }

            if (x === '+') {
                finRes = add(startedArr).toFixed(4);
            }

            if (x === '-') {
                finRes = diff(startedArr).toFixed(4);
            }
        });

        /*if (res.length !== 0) {
            res.forEach(x => {
                if (x === '+') {
                    res = add(res);
                    console.log(res);
                }
            })
        }

        if (res.length !== 0) {
            res.forEach(x => {
                if (x === '-') {
                    res = diff(res);
                    console.log(res);
                }
            })
        }*/
    }
    return finRes;
}

function add(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '+') {
            let res = +arr[i - 1] + +arr[i + 1];
            arr.splice(i - 1, 3, '' + res);
        }
    }
    return arr;
}

function diff(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '-') {
            let res = +arr[i - 1] - +arr[i + 1];
            arr.splice(i - 1, 3, '' + res);
        }
    }
    return arr;
}

function mult(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '*') {
            let res = +arr[i - 1] * +arr[i + 1];
            arr.splice(i - 1, 3, '' + res)
        }
    }
    return arr;
}

function div(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '/') {
            let res = +arr[i - 1] / +arr[i + 1];
            arr.splice(i - 1, 3, '' + res)
        }
    }
    return arr;
}



function getExpressionFromBrackets(expr) {
    let str;
    let bracketsExpr;
    if (expr.indexOf('(') !== -1) {
        let index1 = expr.indexOf('(');
        str = expr.substring(index1);
    }
    if (str.indexOf(')') !== -1) {
        let index2 = str.indexOf(')');
        bracketsExpr = str.substring(1, index2);
    }
    return bracketsExpr;
}

getExpressionFromBrackets();

expressionCalculator();