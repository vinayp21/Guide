const isPrime = number => {
  var divisor = 2;

  while (number > divisor) {
    if (number % divisor === 0) {
      return false;
    }
    divisor++;
  }
  return true;
};

function greatestCommonDivisor(a, b) {
  // if(b == 0)
  //   return a;
  // else
  //   return greatestCommonDivisor(b, a%b);

  var gcd = 1;
  var d = 2;
  if (a < d && b < d) {
    return 1;
  }
  while (a > d && b > d) {
    if (a % d === 0 && b % d === 0) {
      gcd = d;
    }
    d++;
  }
  return gcd;
}

// console.log(greatestCommonDivisor(80, 120));

function mapImplementation() {
  var arr = [1, 2, 3, 4, 5];
  var data = arr.map((ele, i) => {
    return ele * i;
  });
  Array.prototype.myMap = function() {
    var res = [];
    for (var i = 0; i < this.length; i++) {
      res.push(this[i] * i);
    }
    return res;
  };
  var mydata = arr.myMap((ele, i) => {
    return ele * 2;
  });
  // console.log(data, mydata);
}
function reduceImplementation() {
  var arr = [1, 2, 3, 4, 5];

  function add(sum, ele, i) {
    return (sum += ele);
  }
  Array.prototype.myReduce = function(fn, initalVal) {
    var res = initalVal;
    for (var i = 0; i < this.length; i++) {
      res = fn(res, this[i], i);
    }
    return res;
  };
  var myData = arr.myReduce(add, 500);

  var data = arr.reduce(add, 500);
  // console.log(data, myData);
}

//object.assign implementation
function objectAssign(target, ...sources) {
  // your code here
  if (target === undefined || target === null) {
    throw new Error("not a object");
  }
  if (typeof target !== `object`) {
    target = new target.__proto__.constructor(target);
  }

  for (const source of sources) {
    if (source === undefined || source === null) {
      continue;
    }
    Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    for (const symbol of Object.getOwnPropertySymbols(source)) {
      target[symbol] = source[symbol];
    }
  }
  return target;
}

function bindImplementation() {
  let obj1 = {
    a: 1
  };
  function testBind(b, d, c, e) {
    return this.a * b * c * d * e;
  }
  var test = testBind.bind(obj1, 2, 2);
  // console.log(test(2, 2));
  Function.prototype.mybind = function(context, ...args) {
    var self = this;
    return function(...args2) {
      return self.apply(context, [...args, ...args2]);
      // return self.call(context, ...args, ...args2);
    };
  };
  var test1 = testBind.mybind(obj1, 2, 2);
  // console.log(test1(2, 2));
}
// console.log(bindImplementation());
// -------------------------------------------------------------------->
// flat(arr)
// // [1, 2, 3, [4]]

// flat(arr, 1)
// // [1, 2, 3, [4]]

// flat(arr, 2)
function implementFlat(arr, depth) {
  var final = [];
  var count = 0;
  var isFlat = false;
  while (count < depth && !isFlat) {
    isFlat = true;
    count++;
    for (var i = 0; i < arr.length; i++) {
      if (typeof arr[i] === "object") {
        const [...ele] = arr[i];
        final.push(...ele);
        isFlat = false;
      } else {
        final.push(arr[i]);
      }
    }
    arr = final;
    final = [];
  }
  return arr;
}
//recurrsive
// function flat(arr, depth = 1) {
//   return depth
//     ? arr.reduce((acc, curr) => {
//         return [
//           ...acc,
//           ...(Array.isArray(curr) ? flat(curr, depth - 1) : [curr])
//         ];
//       }, [])
//     : arr;
// }
function flat(arr, depth = 1) {
  let res = [];
  const doFlat = (num, depth) => {
    num.map(ele => {
      if (Array.isArray(ele) && depth > 0) {
        doFlat([...ele], depth - 1);
      } else {
        res.push(ele);
      }
    });

    return res;
  };
  return doFlat(arr, depth);
}

console.log("flat", implementFlat([1, [[2]], [3, [4]]], 1));
// -------------------------------------------------------------------->

function memo(func, resolver = (...args) => args.join("_")) {
  const cache = new Map();

  return function(...args) {
    const cacheKey = resolver(...args);
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }
    const value = func.apply(this, args);
    cache.set(cacheKey, value);
    return value;
  };
}
const func = (arg1, arg2) => {
  // console.log("called");
  return arg1 + arg2;
};

const memoed = memo(func);
// console.log(memoed(1, 2)); // 3, func is called
// console.log(memoed(1, 2)); // 3 is returned right away without calling func
// console.log(memoed(1, 3)); // 4, new arguments, so func is called
// ------------------------------------------------------------------------------------>

class EventEmitter {
  constructor() {
    this.eventNames = [];
    id: 0;
  }

  subscribe(eventName, callback) {
    const eventDetails = {
      name: eventName,
      func: callback,
      id: this.id++
    };
    this.eventNames.push(eventDetails);
    var self = this;
    return {
      release: function() {
        const data = self.eventNames.filter(event => {
          return eventName !== event.name;
        });
        self.eventNames = data;
      }
    };
  }

  emit(eventName, ...args) {
    const eventObj = this.eventNames.filter(event => {
      return event.name === eventName;
    });
    eventObj.forEach(obj => {
      obj.func(...args);
    });
  }
}

const eventEmitter = new EventEmitter();
const sub1 = eventEmitter.subscribe("event1", func);
const sub2 = eventEmitter.subscribe("event1", func);
console.log(eventEmitter.emit("event1", 1, 2));

function sum1(a) {
  return function(b) {
    if (b) {
      return sum1(a + b);
    }
    return a;
  };
}

// console.log(sum1(2)(3)(4)());
function sayHello() {
  // console.log("hello");
}
// throttle with leading and trailing
// const throttle = (func, wait, options = { leading: true, trailing: true }) => {
//   let timer = null;
//   let lastContext = null;
//   let lastArgs = null;
//   return function(...args) {
//     // 1. if called within cool time, then store it for later call
//     if (timer !== null) {
//       lastContext = this;
//       lastArgs = args;
//       return;
//     }

//     // 2. if other than cool time, execute it
//     if (options.leading !== false) {
//       func.call(this, ...args);
//     } else {
//       // save for trailing call if needed
//       lastContext = this;
//       lastArgs = args;
//     }

//     // 3. set a timeout to clear the cool, time
//     // and run the stored context
//     const timeup = () => {
//       if (options.trailing !== false && lastArgs !== null) {
//         func.call(lastContext, ...lastArgs);
//         lastContext = null;
//         lastArgs = null;
//         timer = setTimeout(timeup, wait);
//       } else {
//         timer = null;
//       }
//     };

//     timer = setTimeout(timeup, wait);
//   };
// };
// function throttle(func, wait) {
//   let timer = null;
//   let lastArgs = null;

//   return (args) => {
//     // If we already have a timer running we will preserve the arguments so that we can call them
//     // whenever our next setTimeout gets called.
//     if (!timer) {
//         // Calling the function immediately as we don't have anything running
//         func.call(this, args);
//         timer = setTimeout(() => {
//           // Calling function again if we have any saved arguments.
//           lastArgs && func.call(this, lastArgs);
//           timer = null;
//           lastArgs = null;
//         }, wait)
//       } else {
//         lastArgs = [...args];
//       }
//   }
// }
const throttle = calls => {
  let flag = 0;
  let callCount = 0;
  return function(duration) {
    // if (flag === 0 || callCount < calls) {
    //   sayHello();
    //   flag = 1;
    //   callCount++;
    // }
    // setTimeout(() => {
    //   flag = 0;
    // }, duration);
    // if(flag===1) return
    // flag=1;
    // setTimeout(() => {
    //   sayHello();
    //   flag=0;
    // }, duration);
  };
};
const testThrottle = throttle(1);
// console.log(testThrottle(1000));
// console.log(testThrottle(1000));
// console.log(testThrottle(1000));

//generators
const iterableObj = {
  [Symbol.iterator]() {
    let step = 0;
    return {
      next() {
        step++;
        if (step === 1) {
          return { value: "This", done: false };
        } else if (step === 2) {
          return { value: "is", done: false };
        } else if (step === 3) {
          return { value: "iterable.", done: false };
        }
        return { value: "", done: true };
      }
    };
  }
};

for (const val of iterableObj) {
  // console.log(val);
}
function* giterableObj() {
  yield "This";
  yield "is";
  yield "iterable.";
}
for (const val of giterableObj()) {
  // console.log(val);
}
// This
// is
// iterable.

var prom1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("p1");
    resolve("success from prom1");
  }, 1000);
});
var prom2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("p2");
    resolve("success from prom2");
  }, 500);
});

const testPromise = async () => {
  const p1 = await prom1;
  const p2 = await prom2;
  return [p1, p2];
};

testPromise().then(result => {
  console.log(result);
});

// setTimeout(() => {
//   console.log(testThrottle(1000));
// }, 1000);

// implement curry function ---------------------------->
const join = (a, b, c, d) => {
  console.log("test", a + b + c + d);
  return a + b + c + d;
};

var curry = func => {
  return function curried(...args) {
    if (args.length < func.length) {
      return curried.bind(this, ...args);
    } else {
      return func.apply(this, args);
    }
  };
};

// without bind
// function curry(fn) {
//   return function curryInner(...args) {
//     if (args.length >= fn.length) return fn(...args);
//     return (...args2) => curryInner(...args, ...args2);
//   };
// }

const curriedJoin = curry(join);

// console.log(curriedJoin(1, 2, 3, 4)); // '1_2_3_4'

console.log(curriedJoin(1)(2, 3, 4)); // '1_2_3_4'

// console.log(curriedJoin(1)(2)(3)(4)); // '1_2_3_4'

function pipe(funcs) {
  return function(arg) {
    return funcs.reduce((result, func) => {
      return func.call(this, result);
    }, arg);
  };
}
const times = y => x => x * y;
const plus = y => x => x + y;
const subtract = y => x => x - y;
const divide = y => x => x / y;
console.log("pipe", pipe([times(2), plus(3), times(4)])(3));

function summ(num) {
  // your code here
  function inner(num2) {
    return num2 ? summ(num + num2) : num; // #3
  }
  inner.valueOf = () => num;
  return inner;
}

// console.log(summ(1)(2)(3)==6);

function reorder() {
  const items = ["A", "B", "C", "D", "E", "F"];
  const newOrder = [1, 5, 4, 3, 2, 0];
  let i = 0;
  while (i < items.length) {
    if (i != newOrder[i]) {
      let newIndex = newOrder[i];
      [items[i], items[newIndex]] = [items[newIndex], items[i]];
      [newOrder[i], newOrder[newIndex]] = [newOrder[newIndex], newOrder[i]];
    }
    i++;
  }
  return items;
}
// console.log(reorder());

function binarySearch(arr, target, index = 0) {
  const context = index;
  const mid = Math.floor(arr.length / 2);
  if (!arr.length) {
    return -1;
  }
  if (arr.length === 1) {
    return arr[0] === target ? mid + context : -1;
  }
  if (arr[mid] === target) {
    return mid + context;
  }
  if (target < arr[mid]) {
    return binarySearch(arr.slice(0, mid), target, context);
  }
  if (target > arr[mid]) {
    return binarySearch(arr.slice(mid, arr.length), target, context + mid);
  }
}
console.log(binarySearch([1, 2, 3, 4, 100, 1000, 10000], 4));

function Person(name, age) {
  this.name = name;
  this.age = age;
}
//  new implementation
let obj = {};
obj.__proto__ = Person.prototype;
console.log("ss", Person.call(obj, "vinay", 12));
console.log(obj);

function cloneDeep(data) {
  if (typeof data !== "object" || !data) {
    return data;
  }
  if (Array.isArray(data)) {
    var result = [];
    for (item of data) {
      result.push(cloneDeep(item));
    }
    return result;
  }
  if (typeof data === "object") {
    return Object.assign({}, data);
  }
}
console.log(cloneDeep({ a: { b: { c: 3 }, d: 4 } }));

function findMeetingSlots(schedules) {
  // your code here
  var obj = {};
  for (let i = 0; i < schedules.length; i++) {
    for (let j = 0; j < schedules[i].length; j++) {
      obj[schedules[i][j][0]] = schedules[i][j][1] - schedules[i][j][0];
    }
  }
  if (Object.keys(obj).length === 0) return [[0, 24]];

  let min = 0;
  let res = [];
  let i = 0;
  while (i <= 24) {
    if (obj[i]) {
      if (min !== i) {
        res.push([min, i]);
      }
      i = i + obj[i];
      min = i;
    } else {
      i++;
    }
  }
  res.push([min, 24]);
  return res;
}

console.log(
  findMeetingSlots([
    [
      [13, 15],
      [11, 12],
      [10, 13]
    ], //schedule for member 1
    [[8, 9]], // schedule for member 2
    [[13, 18]] // schedule for member 3
  ])
);

const transform = num => {
  let currentDigit = "";
  let currentCount = 0;
  let result = "";
  for (let i = 0; i <= num.length; i++) {
    if (num[i] === currentDigit) {
      currentCount += 1;
    } else {
      if (currentCount > 0) {
        result += currentCount + currentDigit;
      }

      currentDigit = num[i];
      currentCount = 1;
    }
  }
  return result;
};

/**
 * @param {number} n - integer
 * @returns {string}
 */
function getNthNum(n) {
  let num = "1";

  while (n > 1) {
    num = transform(num);
    n -= 1;
  }

  return num;
}

console.log(getNthNum(2));

function chunk(items, size) {
  // your code here
  let res = [];
  for (let i = 0; i < items.length; i = i + size) {
    res.push(items.slice(i, i + size));
  }
  return res;
}

console.log(chunk([1, 2, 3, 4, 5], 2));

var aa = 130;

function vtest() {
  return this.aa;
}
const v1 = vtest.bind({ aa: 123 });

console.log(v1());

var multiply = function(num1, num2) {
  let product = new Array(num1.length + num2.length).fill(0);
  for (let i = num1.length; i--; ) {
    let carry = 0;
    for (let j = num2.length; j--; ) {
      product[1 + i + j] += carry + num1[i] * num2[j];
      carry = Math.floor(product[1 + i + j] / 10);
      product[1 + i + j] = product[1 + i + j] % 10;
    }
    product[i] += carry;
  }
  return product.join("").replace(/^0*(\d)/, "$1");
};

// [0,0,1,1,1,1,2,3,3]
// Output: 7, nums = [0,0,1,1,2,3,3,_,_]

var minimumTotal = function(triangle) {
  let sum = 0;
  for (let i = 0; i < triangle.length; i++) {
    let arr = triangle[i];
    let smallest = arr[0];
    for (let j = 0; j < arr.length; j++) {
      if (smallest > arr[j]) {
        smallest = arr[j];
      }
    }
    sum += smallest;
  }
  return sum;
};
// console.log("dsalgo" + minimumTotal([[-1], [2, 3], [1, -1, -3]]));

var maxSlidingWindow = function(nums, k) {
  let result = [];
  let _stack = [];
  let n = nums.length;

  for (let i = 0; i < n; i++) {
    // 1. stack storage the number from large to small
    //    and elements are index in order
    //    to check the number is in window or not.
    while (_stack.length > 0 && nums[i] >= nums[_stack.slice(-1)[0]]) {
      _stack.pop();
    }

    _stack.push(i);

    // 2. Checking the 1st element. If the index is out of the window,
    //    removing this element , and keeping the first element is the maximum.
    while (i - _stack[0] >= k) _stack.shift();

    // 3. Adding the largest element to result array.
    if (i >= k - 1) result.push(nums[_stack[0]]);
  }

  return result;
};

// console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));

var exist = function(board, word) {
  let rows = board.length;
  let columns = board[0].length;
  let wordArr = word.split("");

  const findWord = (i, j, wordIndex) => {
    if (i < 0 || i >= rows || j < 0 || j >= columns) return false;
    if (wordIndex > wordArr.length - 1) return false;
    if (board[i][j] === "-" || board[i][j] !== wordArr[wordIndex]) return false;
    if (wordIndex === wordArr.length - 1) true;
    let temp = board[i][j];
    board[i][j] = "-";

    const found =
      findWord(i + 1, j, wordIndex + 1) ||
      findWord(i - 1, j, wordIndex + 1) ||
      findWord(i, j + 1, wordIndex + 1) ||
      findWord(i, j - 1, wordIndex + 1);

    board[i][j] = temp;
    return found;
  };
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (board[i][j] === wordArr[0]) {
        const found = findWord(i, j, 0);
        if (found) return true;
      }
    }
  }
  return false;
};

// console.log(
//   exist(
//     [
//       ["A", "B", "C", "E"],
//       ["S", "F", "C", "S"],
//       ["A", "D", "E", "E"]
//     ],
//     "ABCCED"
//   )
// );

function getCount(nums, difference) {
  let i = 0,
    j = 0,
    result = 0,
    count = 0;

  while (i < nums.length) {
    while (j < nums.length && nums[j] - nums[i] <= difference) {
      if (i !== j) {
        count++;
      }
      result += j - i;
      j++;
    }

    i++;
  }
  console.log(count, result, "qqq");
  return result;
}

console.log(getCount([1, 4, 5, 6, 7, 8, 9, 9, 10, 10], 5));

function fourNumberSum(array, targetSum) {
  // Write your code here.
  let pair = {};
  let result = [];

  for (let i = 1; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      let currentSum = array[i] + array[j];
      let difference = targetSum - currentSum;
      if (difference in pair) {
        for (const pairArr of pair[difference]) {
          result.push(pairArr.concat([array[i], array[j]]));
        }
      }
    }
    for (let k = 0; k < i; k++) {
      let currentSum = array[i] + array[k];
      if (!(currentSum in pair)) {
        pair[currentSum] = [[array[i], array[k]]];
      } else {
        pair[currentSum].push([array[i], array[k]]);
      }
    }
  }

  return result;
}
// console.log("sum", fourNumberSum([7, 6, 4, -1, 1, 2], 16));
function comb(arr, k) {
  const getResult = (i, sum) => {
    if (sum === k) {
      return true;
    }
    if (i === arr.length - 1) {
      return false;
    }

    if (getResult(i + 1, sum + arr[i + 1])) return true;
    return getResult(i + 1, sum - arr[i + 1]);
  };

  return getResult(0, arr[0]);
}

// console.log("comb", comb([1, 2, 3, 4], 0));

function lexNext(str) {
  let strArr = str.split("");
  let b = [];
  let res = [];
  while (strArr.length > 0) {
    if (!b.length) {
      b.push(strArr.shift());
    } else {
      if (b[b.length - 1].charCodeAt() > strArr[0].charCodeAt()) {
        b.push(strArr.shift());
        res.push(b.pop());
      } else {
        res.push(b.pop());
      }
    }
  }
  return [...res, ...b].join("");
}
console.log("lex", lexNext("dcba"));

function queen(n) {
  let res = [];
  let grid = new Array(n).fill().map(row => new Array(n).fill("."));
  getResult(0, grid);
  return res;

  function getResult(row, grid) {
    if (row === n) {
      res.push(grid.map(row => row.join("")));
      return;
    }
    for (let col = 0; col < n; col++) {
      if (isValid(col, row, grid)) {
        grid[row][col] = "Q";
        getResult(row + 1, grid);
        grid[row][col] = ".";
      }
    }
  }

  function isValid(col, row, grid) {
    for (let i = 0; i < row; i++) {
      if (grid[i][col] === "Q") {
        return false;
      }
    }
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (grid[i][j] === "Q") return false;
    }

    // check top-right
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (grid[i][j] === "Q") return false;
    }
    return true;
  }
}
console.log("queeen", queen(4));

function update(data, command) {
  // your code here
  for (const [key, value] of Object.entries(command)) {
    switch (key) {
      case "$push":
        return [...data, ...value];
      case "$set":
        return value;
      case "$merge": //merge objects
        if (!(data instanceof Object)) {
          throw new Error();
        } else {
          return { ...data, ...value };
        }
      case "$apply": //function
        return value(data);
      default:
        if (Array.isArray(data)) {
          data[key] = update(data[key], value);
          return data;
        } else {
          return {
            ...data,
            [key]: update(data[key], value)
          };
        }
    }
  }
}
const asyncTimes2 = (callback, num) => {
  setTimeout(() => callback(null, num * 2), 100);
};

function rrr(arr) {
  // your code here
  let i = 0;
  for (let j = 1; j < arr.length; j++) {
    if (arr[i] !== arr[j]) {
      i++;
      arr[i] = arr[j];
    }
  }
  arr.splice(i + 1);
  return arr;
}
console.log(rrr([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7]));

// maplimit
const myFn = (value, callback) => {
  let random = Math.floor(Math.random() * 10) + 1 * 100;
  setTimeout(() => {
    callback(`test${value}`);
  }, random);
};

function myMap(input, limit, fn, mainCallback) {
  let output = [];
  const promiseCallback = function(res) {
    const index = this.idx;
    output[index] = res;
    if (input.length === output.length) {
      mainCallback(output);
    }
  };

  let i = 0;
  for (const val of input) {
    const inner = promiseCallback.bind({ idx: i });
    fn(val, inner);
    i++;
  }
}

myMap([1, 2, 3, 4, 5], 2, myFn, result => {
  console.log(result);
});
