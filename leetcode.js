var countAndSay = function(n) {
  let res = "1";
  if (n === 1) {
    return res;
  }
  let i = 1;
  const getResult = data => {
    let str = "";
    let cnt = 1;
    for (let i = 0; i < data.length; i++) {
      if (data[i] === data[i + 1]) {
        cnt++;
      } else {
        str += "" + cnt + data[i];
        cnt = 1;
      }
    }
    return str;
  };
  while (i < n) {
    res = getResult(res);
    i++;
  }
  return res;
};
console.log(countAndSay(6));

var combinationSum = function(candidates, target) {
  let res = [];
  dfsTraversal(candidates, 0, target, [], res);
  return res;
  // T.C: O(N^M), where N = # of candidate elements and M = target
  // S.C: O(N^M)
};

const dfsTraversal = (candidates, startIdx, remaining, curPath, res) => {
  if (remaining === 0) {
    res.push(curPath.slice());
  }
  for (let i = startIdx; i < candidates.length; i++) {
    if (remaining - candidates[i] >= 0) {
      curPath.push(candidates[i]);

      dfsTraversal(candidates, i, remaining - candidates[i], curPath, res);

      curPath.pop();
    }
  }
};

console.log(combinationSum([2, 3, 5], 8));

var kthSmallest = function(matrix, k) {
  if (!matrix.length) return null;
  const mergeTwo = (arr1, arr2) => {
    let l = 0;
    let r = 0;
    let res = [];
    while (l < arr1.length && r < arr2.length) {
      if (arr1[l] <= arr2[r]) {
        res.push(arr1[l]);
        l++;
      } else {
        res.push(arr2[r]);
        r++;
      }
    }
    res.push(...arr1.slice(l, arr1.length));
    res.push(...arr2.slice(r, arr2.length));
    return res;
  };
  let main = matrix[0] || [];
  for (let i = 1; i < matrix.length; i++) {
    main = mergeTwo(main, matrix[i]);
  }
  return main[k - 1];
};

console.log(
  kthSmallest(
    [
      [1, 4],
      [2, 5]
    ],
    2
  )
);

var combinationSum2 = function(candidates, target) {
  let res = [];
  const getResult = (sum, path, sIndex) => {
    if (sum === target) {
      res.push([...path]);
    }
    for (let i = sIndex; i < candidates.length; i++) {
      if (candidates[i] + sum <= target) {
        const currSum = candidates[i] + sum;
        path.push(candidates[i]);
        getResult(currSum, path, i);
        path.pop();
      }
    }
  };
  getResult(0, [], 0);
  return res;
};

console.log(combinationSum2([2, 1, 5], 8));

function longestIncreasingSequence(nums) {
  if (!nums.length) return 0;
  const piles = [];
  for (const n of nums) {
    if (!piles.length || n > piles[piles.length - 1]) {
      piles.push(n);
      continue;
    }
    let left = 0;
    let right = piles.length - 1;
    while (left < right) {
      const mid = Math.floor((right + left) / 2);
      if (piles[mid] < n) {
        left = mid + 1;
        continue;
      }
      right = mid;
    }

    piles[left] = n;
  }
  return piles.length;
}

console.log(longestIncreasingSequence([10, 9, 2, 5, 3, 7, 101, 18]));
