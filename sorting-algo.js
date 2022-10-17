const data = [9, 8, 7, 1, 5, 4, 3, 2];
const bubble = () => {
  const arr = [...data];
  for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[i]) {
        const temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      }
    }
  }
  return arr;
};

const selection = () => {
  const arr = [...data];
  for (var i = 0; i < arr.length; i++) {
    var low = i;
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[low]) {
        low = j;
      }
    }
    const temp = arr[i];
    arr[i] = arr[low];
    arr[low] = temp;
  }
  return arr;
};

const insertionSort = () => {
  const arr = [...data];
  for (var i = 1; i < arr.length; i++) {
    var current = arr[i];
    var j = i;
    while (arr[j - 1] > current && j) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = current;
  }
  return arr;
};
// insertion other way

// for(var i=0; i<arr.length; i++){
//     var val=arr[i]
//     var j=i
//     while(val<arr[j-1] && j>0){
//       var temp=val;
//       arr[j]=arr[j-1]
//       arr[j-1]=temp
//       j--;
//     }
//   }

const mergeArray = (a, b) => {
  var arr = [];
  var i = 0;
  var j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] < b[j]) {
      arr.push(a[i]);
      i++;
    } else {
      arr.push(b[j]);
      j++;
    }
  }
  while (i < a.length) {
    arr.push(a[i]);
    i++;
  }
  while (j < b.length) {
    arr.push(b[j]);
    j++;
  }
  return arr;
};

const merge = arr => {
  while (arr.length === 1) {
    return arr;
  }
  const length = Math.floor(arr.length / 2);
  const arrA = arr.slice(0, length);
  const arrB = arr.slice(length, arr.length);
  return mergeArray(merge(arrA), merge(arrB));
};

const pivot = (arr, startIndex, end) => {
  let pIndex = startIndex;
  for (var i = startIndex + 1; i <= end; i++) {
    if (arr[i] < arr[startIndex]) {
      pIndex++;
      if (i !== pIndex) {
        const temp = arr[i];
        arr[i] = arr[pIndex];
        arr[pIndex] = temp;
      }
    }
  }
  const tem = arr[startIndex];
  arr[startIndex] = arr[pIndex];
  arr[pIndex] = tem;
  return pIndex;
};

const quick = (arr, left = 0, right = arr.length - 1) => {
  if (left < right) {
    var pIndex = pivot(arr, left, right);
    quick(arr, left, pIndex - 1);
    quick(arr, pIndex + 1, right);
  }
  return arr;
};

console.log(bubble());
console.log(selection());
console.log(insertionSort());
console.log(merge([9, 8, 7, 5, 4, 3, 2, 1]));
console.log(quick([9, 8, 7, 5, 4, 3, 2, 1], 0, 7));
