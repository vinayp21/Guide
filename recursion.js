function factorial(num) {
    if (num === 0) {
        return 1;
    }
    return num * factorial(num - 1)
}

console.log(factorial(5));

function sum(arr) {
    if (arr.length === 1) {
        return arr[0]
    }
    return arr.shift() + sum(arr)
}

console.log(sum([1, 2, 3, 4, 5, 6, 9, 19]));

function expo(num, exp) {
    if (exp === 1) {
        return num
    }
    return num * expo(num, exp - 1)
}

console.log(expo(4, 2));

function oddOrEven(num) {
    return num % 2 === 0 ? 'even' : 'odd'
}

console.log(oddOrEven(-3));
