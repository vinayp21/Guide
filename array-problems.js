const debounce = d => {
  let timer;
  return function(fn, val) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(val);
    }, d);
  };
};

const getSuggestions = debounce(200);
function print(val) {
  console.log(val);
}
// getSuggestions(print, "success");
// setTimeout(() => {
//   getSuggestions(print, "success1");
// }, 199);

// fibonacci(7);

var isHappy = function(n) {
  var result = n;
  var loop = 0;
  while (result != 1 && loop < 100) {
    loop++;
    const arr = result.toString().split("");
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
      count += arr[i] ** 2;
    }
    result = count;
  }
  if (loop === 100) {
    return false;
  }
  return true;
};

var moveZeroesWOMutate = function(nums) {
  var newArr = [];
  var zeros = [];
  for (var i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      newArr.push(nums[i]);
    } else {
      zeros.push(nums[i]);
    }
  }
  return [...newArr, ...zeros];
};

var moveZeroes = function(nums) {
  var counter = 0;
  for (var i = 0; i < nums.length; i++) {
    if (nums[i] === 0 && (nums[i] < nums[i + 1] || nums[i] > nums[i + 1])) {
      var temp = nums[counter];
      nums[counter] = nums[i + 1];
      nums[i + 1] = temp;
      counter++;
    } else if (nums[i] !== 0) {
      counter++;
    }
  }
  return nums;
};

var backspaceCompare = function(S, T) {
  var str1 = S;
  var str2 = T;
  var arr1 = str1.split("").reverse();
  var res1 = [];
  var count1 = 0;
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== "#") {
      if (!count1) {
        res1.push(arr1[i]);
      } else {
        count1--;
      }
    } else {
      count1++;
    }
  }
  var arr2 = str2.split("").reverse();
  var res2 = [];
  var count2 = 0;
  for (var i = 0; i < arr2.length; i++) {
    if (arr2[i] !== "#") {
      if (!count2) {
        res2.push(arr2[i]);
      } else {
        count2--;
      }
    } else {
      count2++;
    }
  }
  return res1.join("") === res2.join("");
};
// console.log(backspaceCompare("xywrrmp", "xywrrmu#p"));

const data = [2, 4, 6, 9];

// Array.prototype.myMap = function(callback) {
//   var result = [];
//   for (var i = 0; i < this.length; i++) {
//     result.push(callback.call(this, this[i]));
//   }
//   return result;
// };
// const modifiedData = data.myMap(item => {
//   return item * 2;
// });
// console.log(modifiedData);

// Array.prototype.myFilter = function(callback) {
//   var result = [];
//   for (var i = 0; i < this.length; i++) {
//     if (callback.call(this, this[i])) {
//       result.push(this[i]);
//     }
//   }
//   return result;
// };

// Array.prototype.myReduce = function(callback, arg = 0) {
//   var result = arg;
//   for (var i = 0; i < this.length; i++) {
//     result = callback.call(this, result, this[i]);
//   }
//   return result;
// };
// const modifiedData3 = data.myReduce((sum, item) => {
//   return sum - item;
// });
// console.log(modifiedData3);

// Input: [2,7,4,1,8,1]
// Output: 1
// Explanation:
// We combine 7 and 8 to get 1 so the array converts to [2,4,1,1,1] then,
// we combine 2 and 4 to get 2 so the array converts to [2,1,1,1] then,
// we combine 2 and 1 to get 1 so the array converts to [1,1,1] then,
// we combine 1 and 1 to get 0 so the array converts to [1] then that's the value of last stone.
const lastStone = arr => {
  while (arr.length > 2) {
    let newElement = 0;
    const sortedArr = arr.sort((a, b) => {
      return b - a;
    });
    // console.log(sortedArr);
    if (sortedArr[0] !== sortedArr[1]) {
      newElement = sortedArr[0] - sortedArr[1];
    }
    sortedArr.splice(0, 2);
    arr = sortedArr;
    if (newElement) {
      arr.push(newElement);
    }
  }
  if (arr.length === 2) {
    if (arr[0] >= arr[1]) {
      return arr[0] - arr[1];
    } else {
      return arr[1] - arr[0];
    }
  }

  return arr[0];
};

// console.log(lastStone([2, 7, 4, 1, 8, 1]));

// Input: target = 7, nums = [2,3,1,2,4,3]
// Output: 2
// Explanation: The subarray [4,3] has the minimal length under the problem constraint.
var sumSubarrayMins = function(target, nums) {
  var i = 0;
  var res = Infinity;
  var end = 0;
  var sum = 0;
  while (i <= nums.length) {
    if (sum < target) {
      sum += nums[i];
      i++;
    } else if (sum >= target) {
      res = Math.min(res, i - end);
      sum -= nums[end];
      end++;
    }
  }
  return res === Infinity ? 0 : res;
};

console.log(sumSubarrayMins(7, [2, 3, 1, 2, 4, 3]));

var checkValidString = function(s) {
  if (s.length === 1) {
    return false;
  }
  var eq = 0;
  var star = 0;
  var newArr = [];
  for (var i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      eq++;
      newArr.push("(");
    } else if (s[i] === ")" && eq > 0) {
      if (newArr[newArr.length - 1] !== "*") {
        newArr.pop();
      } else {
        for (var j = newArr.length - 2; j >= 0; j--) {
          if (newArr[j] !== "*") {
            newArr.splice(j, 1);
            break;
          }
        }
      }
      eq--;
    } else if (s[i] === "*") {
      star++;
      newArr.push("*");
    }
  }
  // console.log(newArr);
  if (eq === 0 || Math.abs(eq) === star || Math.abs(eq) < star) {
    return true;
  }
  return false;
};

// console.log(checkValidString("(*))"));

var checkStraightLine = function(coordinates) {
  var flag = 0;
  for (var i = 1; i < coordinates.length; i++) {
    var xDiff = coordinates[i][1] - coordinates[i][0];
    var yDiff = coordinates[i - 1][1] - coordinates[i - 1][0];
    if (xDiff !== yDiff && xDiff !== 0 && yDiff !== 0) {
      flag = 1;
      break;
    }
  }
  if (flag) {
    return false;
  }
  return true;
};

var removeKdigits = function(num, k) {
  if (num.length === k) {
    return "0";
  }

  for (var i = 1; i <= k; i++) {
    var index = 0;
    var flag = 0;
    while (index < num.length - 1) {
      if (num[index] > num[index + 1]) {
        num = num.slice(0, index) + num.slice(index + 1);
        flag = 1;
        break;
      }
      index++;
    }
    if (flag === 0) {
      if (num[num.length - 2] < num[num.length - 1]) {
        num = num.slice(0, num.length - 1);
      } else {
        num = num.slice(0, num.length - 2) + num.slice(num.length - 1);
      }
    }
  }
  for (var i = 0; i < num.length; i++) {
    if (num[i] !== "0") {
      num = num.slice(i, num.length);
      break;
    }
  }
  return +num ? num : 0;
};

// console.log(removeKdigits("100", 1));
var groupAnagrams = function(strs) {
  var obj = {};
  for (var i = 0; i < strs.length; i++) {
    var str = strs[i]
      .split("")
      .sort()
      .join("");
    if (obj[str]) {
      obj[str].push(strs[i]);
    } else {
      obj[str] = [strs[i]];
    }
  }

  var keys = Object.keys(obj);
  var res = [];
  for (var i = 0; i < keys.length; i++) {
    res.push(obj[keys[i]]);
  }
  return res;
};

// console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));

// Input:
// s: "abab" p: "ab"

// Output:
// [0, 1, 2]
var findAnagrams1 = function(s, p) {
  if (s.length === p.length && s === p) {
    return [0];
  }
  var res = [];
  var str2 = p
    .split("")
    .sort()
    .join("");
  var str1 = s.slice(0, p.length).split("");
  if ([...str1].sort().join("") === str2) {
    res.push(0);
  }
  var count = 0;
  for (var i = p.length; i < s.length; i++) {
    count++;
    var [first, ...rest] = str1;
    str1 = [...rest, s[i]];
    if ([...str1].sort().join("") === str2) {
      res.push(count);
    }
  }
  return res;
};

var findAnagrams2 = function(s, p) {
  var res = [];
  if (!s || p.length > s.length) {
    return [];
  }
  sArr = new Array(26).fill(0);
  pArr = new Array(26).fill(0);
  function isSame(pArr, sArr) {
    for (var i = 0; i < pArr.length; i++) {
      if (pArr[i] !== sArr[i]) {
        return false;
      }
    }
    return true;
  }
  for (var i = 0; i < p.length; i++) {
    pArr[p[i].charCodeAt(0) - 97] = pArr[p[i].charCodeAt(0) - 97]
      ? pArr[p[i].charCodeAt(0) - 97] + 1
      : 1;
  }
  var mainArr = [];
  for (var i = 0; i < p.length; i++) {
    sArr[s[i].charCodeAt(0) - 97] = sArr[s[i].charCodeAt(0) - 97]
      ? sArr[s[i].charCodeAt(0) - 97] + 1
      : 1;
    mainArr.push(s[i]);
  }
  if (isSame(pArr, sArr)) {
    res.push(0);
  }
  var count = 0;
  for (var i = p.length; i < s.length; i++) {
    count++;
    var [first, ...rest] = mainArr;
    mainArr = [...rest, s[i]];
    sArr[first.charCodeAt(0) - 97] -= 1;
    sArr[s[i].charCodeAt(0) - 97] = sArr[s[i].charCodeAt(0) - 97]
      ? sArr[s[i].charCodeAt(0) - 97] + 1
      : 1;

    if (isSame(pArr, sArr)) {
      res.push(count);
    }
  }
  return res;
};
// console.log(findAnagrams("abab", "ab"));

var frequencySort = function(s) {
  var map = new Map();
  for (var i = 0; i < s.length; i++) {
    if (map.has(s[i])) {
      map.set(s[i], map.get(s[i]) + 1);
    } else {
      map.set(s[i], 1);
    }
  }
  var res = new Map();
  var countArr = [];
  map.forEach((value, key) => {
    countArr.push(value);
    if (res.has(value)) {
      var arr = res.get(value);
      res.set(value, [...arr, key]);
    } else {
      res.set(value, [key]);
    }
  });
  sortedCountArr = countArr.sort((a, b) => {
    return b - a;
  });

  // for (var i = 0; i < arr.length; i++) {
  //   var res = map.get(arr[i]);
  // }
  return map;
};

console.log("freq", frequencySort("Aabndqjdquowbuboidb"));

// Longest Substring Without Repeating Characters
const lengthOfLongestSubstring = s => {
  let left = 0;
  let right = 0;
  const set = new Set();
  let max = 0;
  while (right < s.length) {
    let char = s.charAt(right);
    if (!set.has(char)) {
      set.add(char);
      max = Math.max(max, set.size);
      right++;
    } else {
      set.delete(s[left]);
      left++;
    }
  }
  return max;
};
// console.log(lengthOfLongestSubstring("dvdvfd"));

// Median of Two Sorted Arrays
// Input: nums1 = [1,3], nums2 = [2]
// Output: 2.00000
// Explanation: merged array = [1,2,3] and median is 2.

const findMedianSortedArrays = (nums1, nums2) => {
  var left = 0;
  var right = 0;
  var res = [];
  while (left < nums1.length && right < nums2.length) {
    if (nums1[left] < nums2[right]) {
      res.push(nums1[left]);
      left++;
    } else if (nums1[left] > nums2[right]) {
      res.push(nums2[right]);
      right++;
    } else {
      if (nums1 !== 0) {
        res.push(nums1[left]);
        res.push(nums2[right]);
        right++;
        left++;
      }
    }
  }
  res = [
    ...res,
    ...nums1.slice(left, nums1.length),
    ...nums2.slice(right, nums2.length)
  ];
  if (!res.length) return 0;

  if (res.length % 2 === 0) {
    var upper = res.length / 2;
    var lower = upper - 1;
    return (res[lower] + res[upper]) / 2;
  } else {
    var mid = res[Math.floor(res.length / 2)];
    return mid;
  }
};
// console.log(findMedianSortedArrays([1, 1], [1, 2]));

// Longest Palindromic Substring
// Input: s = "babad"
// Output: "bab"
// Note: "aba" is also a valid answer.

const longestPalindrome = s => {
  let start = 0;
  let end = 0;
  let max = 0;

  for (let i = 0; i < s.length; i++) {
    let tempStart = i;
    let tempEnd = i;

    while (s[i] == s[tempEnd + 1]) tempEnd++;

    while (
      tempStart >= 0 &&
      tempEnd < s.length &&
      s[tempStart - 1] == s[tempEnd + 1]
    ) {
      tempStart--;
      tempEnd++;
    }

    if (max < tempEnd - tempStart + 1) {
      start = tempStart;
      end = tempEnd;
      max = tempEnd - tempStart + 1;
    }
  }
  return s.substring(start, end + 1);
};

// console.log(longestPalindrome("babad"));

// // threeSum
// Input: nums = [-1,0,1,2,-1,-4]
// Output: [[-1,-1,2],[-1,0,1]]

const letterCombinations = digits => {
  var phone = {
    "2": "abc",
    "3": "def",
    "4": "ghi",
    "5": "jkl",
    "6": "mno",
    "7": "pqrs",
    "8": "tuv",
    "9": "wxyz"
  };
  var n = 0;
  var arr = [];
  for (var i = 1; i < digits.length; i++) {
    arr.push(phone[digits[i]]);
  }
  var res = [];
  var result = phone[digits[0]].split("");
  var final = [];
  for (var i = 0; i < arr.length; i++) {
    res = [...result];
    for (var j = 0; j < arr[i].length; j++) {
      for (var k = 0; k < res.length; k++) {
        var data = res[k] + arr[i][j];
        if (data.length === digits.length) {
          final.push(data);
        }
        result.push(res[k] + arr[i][j]);
      }
    }
  }
  return final;
};
// console.log(letterCombinations("2342"));

const isValid = s => {
  var open = ["(", "{", "["];
  var close = [")", "}", "]"];
  var res = [];
  for (var i = 0; i < s.length; i++) {
    if (open.indexOf(s[i]) > -1) {
      res.push(close[open.indexOf(s[i])]);
    } else if (s[i] === res[res.length - 1]) {
      res = res.slice(0, res.length - 1);
    } else {
      return false;
    }
  }
  return res.length > 0 ? false : true;
};
// console.log(isValid("([)]"));

// A password is considered strong if the below conditions are all met:

// It has at least 6 characters and at most 20 characters.
// It contains at least one lowercase letter, at least one uppercase letter, and at least one digit.
// It does not contain three repeating characters in a row (i.e., "...aaa..." is weak, but "...aa...a..." is strong, assuming other conditions are met).
const strongPasswordChecker = password => {
  let count = 0;
  let digit = 1;
  let lower = 1;
  let upper = 1;
  // let k = -10;
  var variations = 0;
  let variationValue = "";
  let lLength = 0;
  let mLength = 0;
  var delVariations = 0;
  let delVariationValue = "";
  let j = -10;
  if (password.length < 6) {
    lLength = 6 - password.length;
  } else if (password.length > 20) {
    mLength = password.length - 20;
  }
  var k = mLength;
  for (var i = 0; i < password.length; i++) {
    const charCode = password[i].charCodeAt(0);
    if (charCode >= 48 && charCode <= 57) {
      digit = 0;
    } else if (charCode >= 65 && charCode <= 90) {
      upper = 0;
    } else if (charCode >= 97 && charCode <= 122) {
      lower = 0;
    }
    if (password[i - 1] === password[i] && password[i] === password[i + 1]) {
      if (password[i] !== variationValue) {
        variations++;
      }
      variationValue = password[i];
      if (k) {
        if (password[i] !== delVariationValue) {
          delVariations++;
        }
        delVariationValue = password[i];
        password = password.replace(password[i], "");
        i = i - 1;
        k--;
      } else {
        if (i > j + 2) {
          count++;
          j = i;
        }
      }
    } else {
      variationValue = "";
    }
  }

  const misMatch = digit + lower + upper;
  const steps = lLength > misMatch ? lLength : misMatch;
  // const final = steps + mLength;
  let deleted =
    mLength > variations ? variations - delVariations : delVariations - mLength;
  if (mLength === variations) {
    deleted = 0;
  }
  const toBeReplaced = mLength ? count - deleted : count;

  const final = toBeReplaced > steps ? toBeReplaced : steps;
  if (mLength) {
    return mLength + final;
  }
  return final;
};

// console.log(strongPasswordChecker(".................!!!"));

// Input: nums = [1,2,3,4,5,6,7], k = 3
// Output: [5,6,7,1,2,3,4]

var rotate = function(nums, k) {
  var t = [1, 2, 3];
  return nums;
};
// console.log(rotate([1, 2, 3, 4, 5, 6, 7], 3)); [3,1,4,1,5]
// 2
var findPairs = function(nums, k) {
  if (nums.length < 2) {
    return 0;
  }
  return Array.from(new Set(nums));

  var obj = {};
  var res = [];
  var resObj = {};
  var sum = false;
  nums = nums.sort((a, b) => {
    sum = a + b;
    return a - b;
  });
  if (!sum && nums[0] !== 0) {
    return 1;
  }
  for (var i = 0; i < nums.length; i++) {
    var temp = k + nums[i];
    if (nums[i] === 0 && obj[nums[i]] === 0) {
      if (!resObj[nums[i]] && resObj[nums[i]] !== 0) {
        res.push([nums[i], obj[nums[i]] - k]);
      }
      resObj[nums[i]] = nums[i];
    }
    if (obj[nums[i]]) {
      if (!resObj[nums[i]]) {
        res.push([nums[i], obj[nums[i]] - k]);
      }
      resObj[nums[i]] = nums[i];
      obj[temp] = temp;
    } else {
      obj[temp] = temp;
    }
  }
  if (obj[nums[0]] && k !== 0) {
    if (!resObj[nums[0]]) {
      res.push([nums[0], obj[nums[0]] - k]);
    }
  }

  return res.length;
};
// console.log(findPairs([3, 1, 4, 1, 5], 0));

// Input: [3, 2, -2, 5, -3]
// Output: 3
// Write a function that, given an array A of N integers, returns the lagest integer K > 0 such that both values K and -K exist in array A. If there is no such integer, the function should return 0.

const lagestInteger = nums => {
  var largest = 0;
  var obj = {};
  for (var data in nums) {
    if (nums[data] < 0) {
      if (obj[nums[data] * -1]) {
        largest =
          obj[nums[data] * -1] > largest ? obj[nums[data] * -1] : largest;
      } else {
        obj[nums[data]] = nums[data];
      }
    } else {
      if (obj[nums[data] * -1]) {
        largest = nums[data] > largest ? nums[data] : largest;
      } else {
        obj[nums[data]] = nums[data];
      }
    }
  }
  return largest;
};
// console.log("test", lagestInteger([5, 2, -2, -5, -3, 3, 11, -11]));
const numsss = [7, 3, 9, 1, 78, 3, 56];
numsss.sort((a, b) => {
  const num1 = "" + a + b;
  const num2 = "" + b + a;
  if (num1 < num2) {
    return 1;
  }
  return -1;
});
console.log(numsss);
