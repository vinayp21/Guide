class Node {
  constructor(val) {
    this.value = val;
    this.left = null;
    this.right = null;
  }
}
// bfs queue-

// var queue =this.root

// while(queue.length){
//   var top = queue.pop();
//   console.log(top.val)
//   queue.push(top.left);
//   queue.push(top.right);
// }

class BST {
  constructor() {
    this.root = null;
  }

  insert(val) {
    const newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    let currentNode = this.root;
    while (currentNode) {
      if (newNode.value < currentNode.value) {
        if (currentNode.left === null) {
          currentNode.left = newNode;
          currentNode = null;
          return this;
        } else {
          currentNode = currentNode.left;
        }
      }
      if (newNode.value > currentNode.value) {
        if (currentNode.right === null) {
          currentNode.right = newNode;
          currentNode = null;
          return this;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
  }

  find(value) {
    var currentNode = this.root;
    while (currentNode) {
      if (currentNode.value === value) {
        return true;
      } else if (currentNode.value < value) {
        currentNode = currentNode.right;
      } else {
        currentNode = currentNode.left;
      }
    }
    return false;
  }

  breathFirstSearch() {
    var queue = [this.root];
    while (queue.length) {
      const visited = [...queue];
      for (var i = 0; i < visited.length; i++) {
        console.log(visited[i].value);
        if (visited[i].left) {
          queue.push(visited[i].left);
        }
        if (visited[i].right) {
          queue.push(visited[i].right);
        }
        queue.shift();
      }
    }
    // or
    // let queue1 = [this.root];
    // while (queue1.length) {
    //   let top = queue1.shift();
    //   console.log("test", top.value);
    //   if (top.left) {
    //     queue1.push(top.left);
    //   }
    //   if (top.right) {
    //     queue1.push(top.right);
    //   }
    // }
  }

  // let data = this.root;

  // print = (data) =>{
  //
  //   if(data.left){
  //     print(data.left)
  //   }
  //   if(data.right){
  //     print(data.right)
  //   }

  // }

  breathFirstSearchWithoutQ() {}

  deapthfsPreorder() {
    var data = [];
    var currentNode = this.root;
    function print(node) {
      data.push(node.value);
      if (node.left) {
        print(node.left);
      }
      if (node.right) {
        print(node.right);
      }
    }
    print(currentNode);
    console.log(data);
  }
  dfsPostorder() {
    const data = [];
    print(this.root);
    function print(node) {
      if (node.left) {
        print(node.left);
      }
      if (node.right) {
        print(node.right);
      }
      console.log(node.value);
      data.push(node.value);
    }
  }
  dfsInorder() {
    print(this.root);
    function print(node) {
      if (node.left) {
        print(node.left);
      }
      console.log(node.value);
      if (node.right) {
        print(node.right);
      }
    }
  }
  minVal() {
    var node = this.root;
    if (!node) {
      return null;
    }
    while (node.left) {
      node = node.left;
    }
    return node.value;
  }
  maxVal() {
    var node = this.root;
    if (!node) {
      return null;
    }
    while (node.right) {
      node = node.right;
    }
    return node.value;
  }

  remove(root, key) {
    var node = root || this.root;
    if (!node) {
      return null;
    }
    if (node.value > key) {
      node.left = this.remove(node.left, key);
      return node;
    } else if (node.value < key) {
      node.right = this.remove(node.right, key);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      } else if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      } else {
        var minVal = this.minVal(node.right);
        node.value = minVal;
        node.right = this.remove(node.right, minVal);
        return node;
      }
    }
  }
  isBalanced() {
    // or isAVLTree
    //with diameter calculation
    var node = this.root;
    return getNodeBalanceFactor(node);
    function getNodeBalanceFactor(node) {
      if (!node) {
        return true;
      }
      function height(node) {
        if (!node) {
          return 0;
        }
        return 1 + Math.max(height(node.left), height(node.right));
      }

      var leftHeight = height(node.left);
      var rightHeight = height(node.right);
      console.log(leftHeight, rightHeight); // diameter of tree
      if (Math.abs(leftHeight - rightHeight) > 1) {
        return false;
      }
      if (!getNodeBalanceFactor(node.left)) {
        return false;
      }
      if (!getNodeBalanceFactor(node.right)) {
        return false;
      }
      return true;
    }
  }

  getTreeHeight() {
    return getNodeHeight(this.root);
    function getNodeHeight(node) {
      if (node === null) return -1;
      return Math.max(getNodeHeight(node.left), getNodeHeight(node.right)) + 1;
    }
  }

  rotateLeft(node) {
    const tmp = node.right;
    node.right = tmp.left;
    tmp.left = node;
    return tmp;
  }

  rotateRight(node) {
    const tmp = node.left;
    node.left = tmp.right;
    tmp.right = node;
    return tmp;
  }

  rotateLR(node) {
    node.left = this.rotateLeft(node);
    return this.rotateRight(node);
  }

  rotateRL(node) {
    node.right = this.rotateRight(node);
    return this.rotateLeft(node);
  }

  insertAVLTree(key) {
    this.root = insert(this.root, key);
    function getBalanceFactor(node) {
      function getTreeHeight(node) {
        if (node === null) return -1;
        return (
          Math.max(getTreeHeight(node.left), getTreeHeight(node.right)) + 1
        );
      }
      const diff = getTreeHeight(node.left) - getTreeHeight(node.right);
      switch (diff) {
        case -2:
          return "UNBALANCED_RIGHT";
        case -1:
          return "SLIGHTLY_UNBALANCED_RIGHT";
        case 1:
          return "SLIGHTLY_UNBALANCED_LEFT";
        case 2:
          return "UNBALANCED_LEFT";
        default:
          return "BALANCED";
      }
    }
    function insert(node, key) {
      if (!node) {
        return new Node(key);
      } else if (node.value < key) {
        node.right = insert(node.right, key);
      } else if (node.value > key) {
        node.left = insert(node.left, key);
      } else {
        return node;
      }
      const factor = getBalanceFactor(node);
      if (factor === "UNBALANCED_RIGHT") {
        if (node.right.value > key) {
          node = this.rotateRL(node);
        } else {
          node = this.rotateLL(node);
        }
      }
      if (factor === "UNBALANCED_LEFT") {
        if (node.left.value > key) {
          node = this.rotateRR(node);
        } else {
          node = this.rotateLR(node);
        }
      }
      return node;
    }
    return this;
  }
}

var bst = new BST();

bst.insert(10);
bst.insert(3);
bst.insert(0);
bst.insert(5);
bst.insert(4);
bst.insert(9);

//     10
//   3
// 0   5
//   4  9

// <---------------------BST problems----------------------->

// Convert Sorted Array to Binary Search Tree
// Input: nums = [-10,-3,0,5,9]
// Output: [0,-3,9,-10,null,5]
// Explanation: [0,-10,5,null,-3,null,9] is also accepted:
const sortedArrayToBST = function(nums) {
  const createBST = (nums, start, end) => {
    if (end < start) {
      return null;
    }
    var mid = Math.ceil((start + end) / 2);
    var node = new TreeNode(nums[mid]);
    node.left = createBST(nums, start, mid - 1);
    node.right = createBST(nums, mid + 1, end);
    return node;
  };

  return createBST(nums, 0, nums.length - 1);
};

// Check if a given array can represent Preorder Traversal of Binary Search Tree

function checkpreBST(arr) {
  var root; // 2
  var stackData = []; // 4 3
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < root) {
      return false;
    }

    while (stackData.length > 0 && stackData[0] < arr[i]) {
      root = stackData[0];
      stackData.pop();
    }
    stackData.push(arr[i]);
  }
  return true;
}

console.log("tree", checkpreBST([1, 2, 4, 5, 3]));

function invert(node) {
  if (!node) {
    return null;
  }
  // your code here
  var left = node.left;
  node.left = node.right;
  node.right = left;
  if (node.left) {
    invert(node.left);
  }
  if (node.right) {
    invert(node.right);
  }
  return node;
}

const levelOrderIsOfBST = arr => {
  const q = [];
  const n = arr.length;
  let i = 0;
  // node details for the
  // root of the BST
  let newNode = {};
  newNode.data = arr[i];
  newNode.min = -9999;
  newNode.max = 99999;
  q.push(newNode);
  i++;

  while (q.length !== 0) {
    // extracting NodeDetails of a
    // node from the queue
    const temp = q.pop();

    // check whether there are more elements
    // in the arr[] and arr[i] can be left child
    // of 'temp.data' or not
    let newNode = {};
    if (i < n && arr[i] < temp.data && arr[i] > temp.min) {
      // Create NodeDetails for newNode
      /// and add it to the queue
      newNode.data = arr[i];
      newNode.min = temp.min;
      newNode.max = temp.data;
      i++;
      q.push(newNode);
    }
    let newNode1 = {};

    // check whether there are more elements
    // in the arr[] and arr[i] can be right child
    // of 'temp.data' or not
    if (i < n && arr[i] > temp.data && arr[i] < temp.max) {
      // Create NodeDetails for newNode
      /// and add it to the queue
      newNode1.data = arr[i];
      newNode1.min = temp.data;
      newNode1.max = temp.max;
      i++;
      q.push(newNode1);
    }
  }
  // given array represents level
  // order traversal of BST
  if (i === n) return true;

  // given array do not represent
  // level order traversal of BST
  return false;
};
console.log(levelOrderIsOfBST([7, 4, 12, 3, 6, 8, 1, 5, 10]));
