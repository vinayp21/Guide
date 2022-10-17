// Input: nums = [4,2,3]
// Output: true
// Explanation: You could modify the first 4 to 1 to get a non-decreasing array.
var checkPossibility = function(nums) {
  let count = 0;
  let largest;
  let previous;
  for (let i = 0; i < nums.length; i++) {
    if (
      nums[i] > nums[i + 1] ||
      (previous && largest && largest > nums[i + 1] && previous > nums[i])
    ) {
      count++;
      largest = nums[i];
      previous = nums[i - 1];
    }
  }
  return count > 1 ? false : true;
};

// console.log(checkPossibility([1, 4, 1, 2]));

// Input: arr = [1,3,5]
// Output: 4
// Explanation: All sub-arrays are [[1],[1,3],[1,3,5],[3],[3,5],[5]]
// All sub-arrays sum are [1,4,9,3,8,5].
// Odd sums are [1,9,3,5] so the answer is 4.
var numOfSubarrays = function(arr) {};

// Input: arr = [1,2,3,10,4,2,3,5]
// Output: 3
// Explanation: The shortest subarray we can remove is [10,4,2] of length 3. The remaining elements after that will be [1,2,3,3,5] which are sorted.
// Another correct solution is to remove the subarray [3,10,4].
var findLengthOfShortestSubarray = function(arr) {
  var s = 0;
  var len = arr.length;
  while (s < len && arr[s] <= arr[s + 1]) {
    s++;
  }
  if (s === len - 1) {
    return 0;
  }
  var n = len - 1;
  while (n > s && arr[n] >= arr[n - 1]) {
    n--;
  }
  if (n === 0) {
    return len - 1;
  }
  var result = Math.min(n, len - 1 - s);

  let i = 0,
    j = n;
  while (i <= s && j < len) {
    if (arr[j] >= arr[i]) {
      result = Math.min(result, j - i - 1);
      i++;
    } else {
      j++;
    }
  }
  return result;
};

console.log(findLengthOfShortestSubarray([1, 2, 3]));

// Input: [-2,1,-3,4,-1,2,1,-5,4],
// Output: 6
// Explanation: [4,-1,2,1] has the largest sum = 6.
var maxSubArray = function(nums) {
  var indexValue = nums[0];
  var largest = nums[0];
  for (var i = 1; i < nums.length; i++) {
    indexValue =
      nums[i] > nums[i] + indexValue ? nums[i] : nums[i] + indexValue;
    if (indexValue > largest) {
      largest = indexValue;
    }
  }
  return largest;
};

console.log(maxSubArray([5, -3, -2, 6, -1, 4]));

var maxCircularSubArray = function(nums) {
  var indexValueMax = nums[0];
  var largest = nums[0];
  var indexValueMin = nums[0];
  var smallest = nums[0];
  var sum = 0;
  for (var i = 0; i < nums.length; i++) {
    sum += nums[i];
  }
  for (var i = 1; i < nums.length; i++) {
    indexValueMax =
      nums[i] > nums[i] + indexValueMax ? nums[i] : nums[i] + indexValueMax;
    if (indexValueMax > largest) {
      largest = indexValueMax;
    }
  }

  for (var i = 1; i < nums.length; i++) {
    indexValueMin =
      nums[i] > nums[i] + indexValueMin ? nums[i] + indexValueMin : nums[i];
    if (indexValueMin < smallest) {
      smallest = indexValueMin;
    }
  }
  if (sum === smallest) {
    return largest;
  }
  return Math.max(largest, sum - smallest);
};
console.log(maxCircularSubArray([2, -3, -1]));

var subarraySum = function(nums, k) {
  let sum = 0;
  let count = 0;
  let obj = { 0: 1 };
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    if (obj[sum - k]) {
      count += obj[sum - k];
    }
    obj[sum] = obj[sum] ? obj[sum] + 1 : 1;
  }
  return count;
};

// console.log("dds", subarraySum([1, 2, 3], 3));

var checkSubarraySum = function(nums, k) {
  let map = new Map();

  map.set(0, -1);

  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];

    if (map.has(sum % k)) {
      if (i - map.get(sum % k) > 1) {
        return true;
      }
    } else {
      map.set(sum % k, i);
    }
  }
  return false;
};
console.log("dds", checkSubarraySum([23, 2, 6, 4, 7], 6));

// Input: target = 7, nums = [2,3,1,2,4,3]
// Output: 2
// Explanation: The subarray [4,3] has the minimal length under the problem constraint.

var minSubArrayLen = function(target, nums) {
  var start = 0;
  var res = 0;
  var end = 0;
  var sum = 0;
  while (start < nums.length) {
    sum += nums[start];
    if (sum >= target) {
      res = res && res < start - end + 1 ? res : start - end + 1;
      end++;
      start = end;
      sum = 0;
    } else {
      start++;
    }
  }
  return res;
};
// console.log(minSubArrayLen(6, [0, 1, 2, 3, 4, 5]));

// Input: [0,1,0]
// Output: 2
// Explanation: [0, 1] (or [1, 0]) is a longest contiguous subarray with equal number of 0 and 1.
var findMaxLength = function(nums) {
  var count = 0;
  var max = 0;
  var map = new Map();
  map.set(0, -1);
  for (var i = 0; i < nums.length; i++) {
    count += nums[i] == 1 ? 1 : -1;
    if (map.has(count)) {
      max = Math.max(max, i - map.get(count)); //2
    } else {
      map.set(count, i);
    }
  }
  return max;
};

var insert = function(intervals, newInterval) {
  let newStart = newInterval[0];
  let newEnd = newInterval[1];
  let res = [];
  for (let i = 0; i < intervals.length; i++) {
    const start = intervals[i][0];
    const end = intervals[i][1];

    if (
      (start <= newStart && end >= newStart) ||
      (start >= newStart && newEnd >= start)
    ) {
      newStart = Math.min(newStart, start);
      newEnd = Math.max(newEnd, end);
    } else {
      if (newStart < start) {
        res.push([newStart, newEnd]);
      }
      res.push(intervals[i]);
    }
  }
  return res;
};
console.log(
  insert(
    [
      [1, 2],
      [3, 5],
      [6, 7],
      [8, 10],
      [12, 16]
    ],
    [2, 8]
  )
);
// Input: arr = [1,3,5]
// Output: 4
// Explanation: All subarrays are [[1],[1,3],[1,3,5],[3],[3,5],[5]]
// All sub-arrays sum are [1,4,9,3,8,5].
// Odd sums are [1,9,3,5] so the answer is 4.
var numOfSubarrays = function(arr) {
  let mod = 1e9 + 7,
    sum = 0,
    odds = 0,
    evens = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    odds += Number(sum % 2 == 1);
    evens += Number(sum % 2 == 0);
  }
  return (odds * evens + odds) % mod;

  //even
  // let res = 0;
  // // to keep track of subarrays with even
  // // sum starting from index i
  // let s = 0;
  // for (let i = n - 1; i >= 0; i--) {
  //   if (a[i] % 2 == 1) {
  //     // s is the count of subarrays starting from
  //     // index i+1 whose sum was even
  //     /*if a[i] is odd then all subarrays starting
  //               from index i+1 which was odd becomeseven
  //               when a[i] gets added to it.*/
  //     s = n - i - 1 - s;
  //   } else {
  //     /*if a[i] is even then all subarrays
  //       starting from index i+1 which was even remainseven
  //       and one extra a[i] even subarray gets added to it.*/
  //     s = s + 1;
  //   }
  //   res = res + s;
  // }
  // return res;
};
// 1,2,3 ->1,3,2
var nextPermutation = function(nums) {
  let start = nums.length - 2;

  while (start >= 0 && nums[start] >= nums[start + 1]) {
    start--;
  }

  let idx1 = start; //0
  if (idx1 !== -1) {
    start = nums.length - 1;
    while (start > 0 && nums[start] <= nums[idx1]) {
      start--;
    }
    swap(start, idx1);
  }

  // [nums[start], nums[idx1]] = [nums[idx1], nums[start]];

  let end = nums.length - 1;
  start = idx1 + 1;
  while (start < end) {
    swap(start, end);
    start++;
    end--;
  }
  function swap(start, end) {
    let temp = nums[start];
    nums[start] = nums[end];
    nums[end] = temp;
  }
  return nums;
};

// console.log("nextPermutation", nextPermutation([1, 5, 1]));

// Input: s = "PAYPALISHIRING", numRows = 4
// Output: "PINALSIGYAHRPI"
// P     I    N
// A   L S  I G
// Y A   H R
// P     I
function zigzag(s, numRows) {
  if (numRows <= 1) return s;

  let store = Array(numRows).fill("");
  let len = (numRows - 1) * 2; // Determine the distance of the "v" shape of zigzag

  while (!!s[0]) {
    // Math.min determine whether s.length or len is shorter, then use that
    for (let j = 0; j < Math.min(s.length, len); j++) {
      let p = j >= numRows ? numRows - (j - numRows + 2) : j;

      store[p] = store[p] + s[j];
    }
    s = s.substring(len);
  }

  return store.join("");
}

// console.log("sdfsd", zigzag("PAYPALISHIRING", 3));

function excludeItems(items, newOrder) {
  const newItem = new Array(items.length).fill(-1);
  for (let i = 0; i < items.length; i++) {
    [items[newOrder[i]], items[i]] = [items[i], items[newOrder[i]]];
  }
  return items;
}

console.log(excludeItems(["A", "B", "C", "D", "E", "F"], [1, 5, 4, 3, 2, 0]));
// ['F', 'A', 'E', 'D', 'C', 'B']
