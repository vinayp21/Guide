//Count of subarrays of size K with elements having even frequencies
var frequency = (arr, target) => {
  sliceIndex = 0;
  var count = 0;
  for (var i = 1; i < arr.length; i++) {
    while (arr[i] + arr[i - 1] === arr[i] + arr[i + 1] && count < 2) {
      if (count === 0) {
        sliceStartIndex = i - 1;
      }
      i++;
      count++;
    }
    if (count === 2) {
      return arr.slice(sliceStartIndex, i + 1);
    }
    count = 0;
  }
};
console.log(frequency([1, 4, 1, 10, 4, 1, 10, 20], 4));

var firstUniqChar = function(s) {
  var str = s;
  var index = -1;
  while (str.length !== 0) {
    var char = str[0];
    var res = new RegExp(char, "g");
    var str1 = str.replace(res, "");
    if (str1.length === str.length - 1) {
      index = s.indexOf(char);
      break;
    } else {
      str = str1;
    }
  }

  return index;
};

console.log(firstUniqChar("loveleetcode"));

var uniquePathsWithObstacles = function(obstacleGrid) {
  let m = obstacleGrid.length;
  let n = obstacleGrid[0].length;

  obstacleGrid[0][0] = 1;

  for (let i = 1; i < n; i++) {
    obstacleGrid[0][i] = obstacleGrid[0][i] === 1 ? 0 : obstacleGrid[0][i - 1];
  }
  for (let i = 1; i < m; i++) {
    obstacleGrid[i][0] = obstacleGrid[i][0] === 1 ? 0 : obstacleGrid[i - 1][0];
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (obstacleGrid[i][j] === 1) {
        obstacleGrid[i][j] = 0;
      } else {
        obstacleGrid[i][j] = obstacleGrid[i - 1][j] + obstacleGrid[i][j - 1];
      }
    }
  }
  return obstacleGrid[m - 1][n - 1];
};

console.log(
  uniquePathsWithObstacles([
    [0, 1],
    [0, 0]
  ])
);
