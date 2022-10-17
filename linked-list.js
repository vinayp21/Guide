class Node {
  constructor(value) {
    this.next = null;
    this.value = value;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.length++;
      return this;
    }
    let currentNode = this.head;
    while (currentNode.next) {
      currentNode = currentNode.next;
    }
    currentNode.next = newNode;
    this.tail = newNode;
    this.length++;
    return this;
  }

  pop() {
    if (!this.head) {
      return false;
    }
    let previousNode = this.head;
    let currentNode = this.head;
    while (currentNode.next) {
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
    previousNode.next = null;
    this.tail = previousNode;
    this.length--;
    return currentNode;
  }

  shift() {
    if (this.lenght === 1) {
      this.head = null;
      this.tail = null;
      return this.head;
    }
    const currentNode = this.head;
    this.head = currentNode.next;
    this.length--;
    return currentNode;
  }
  unshift(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    }
    const head = this.head;
    this.head = newNode;
    this.head.next = head;
    this.length++;
    return this;
  }
  get(index) {
    let currentNode = this.head.next;
    if (index < 0 || index > this.length) {
      return undefined;
    }
    if (index === 0) {
      return this.head;
    }
    if (index === this.length - 1) {
      return this.tail;
    }
    for (var i = 1; i < this.length - 1; i++) {
      if (index === i) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }
  }

  set(index, value) {
    const node = this.get(index);
    node.value = value;
  }
  remove(index) {
    if (index === 0) {
      this.shift();
      return this;
    }
    if (index === this.length - 1) {
      this.pop();
      return this;
    } else {
      const node = this.get(index - 1);
      const nextNode = this.get(index + 1);
      node.next = nextNode;
      return this;
    }
  }

  reverse() {
    let mainNode = this.head;
    const reverse = [];
    while (mainNode) {
      reverse.push(mainNode);
      mainNode = mainNode.next;
    }
    const revLL = new LinkedList();
    revLL.head = reverse.pop();
    for (var i = reverse.length - 1; i >= 0; i--) {
      revLL.push(reverse[i].value);
    }
    return revLL;
  }

  reverseWithoutStack() {
    // var current = this.head.next;
    // var newNode = new Node(this.head.value, null);
    // while (current) {
    //   var temp = newNode;
    //   newNode = new Node(current.value, null);
    //   newNode.next = temp;
    //   current = current.next;
    // }
    // return newNode;

    // or

    var current = this.head;
    var prev = null;
    var next = null;
    while (current) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    return prev;
  }

  hasLoop() {
    let firstNode = this.head;
    let nextNode = this.head;

    while (firstNode && nextNode && nextNode.next) {
      if (firstNode.value === nextNode.value) {
        return firstNode;
      }
      firstNode = firstNode.next;
      nextNode = nextNode.next.next;
    }

    return false;
  }

  detectLoop() {
    // Create a temporary node
    let temp = new Node();
    let head = this.head;
    while (head != null) {
      // This condition is for the case
      // when there is no loop
      if (head.next == null) {
        return false;
      }

      // Check if next is already
      // pointing to temp
      if (head.next == temp) {
        return true;
      }

      // Store the pointer to the next node
      // in order to get to it in the next step
      const nex = head.next;

      // Make next point to temp
      head.next = temp;

      // Get to the next node in the list
      head = nex;
    }

    return false;
  }

  getLoopNode() {
    if (this.hasLoop) {
      return this.tail.next;
    }
    return null;
  }

  middleNode() {
    const midValue = Math.floor(5 / 2 + 1);
    var currentNode = this.head;
    var count = 1;
    while (count < midValue) {
      currentNode = currentNode.next;
      count++;
    }
    return currentNode;
  }

  middleNodeWithoutlengthProp() {
    let fast = this.head;
    let slow = this.head;
    while (fast !== null) {
      fast = fast.next;
      if (fast === null) break;
      fast = fast.next;
      slow = slow.next;
    }
    return slow;
  }

  removeSortedDuplicates() {
    var current = this.head;
    while (current !== null) {
      var temp = current;
      while (temp != null && temp.value == current.value) {
        temp = temp.next;
      }
      /*Set current node next to the next different  
    element denoted by temp*/
      current.next = temp;
      current = current.next;
    }
  }

  isListPalindrome() {
    var reversedList = this.reverse();

    var node = this.head;
    var revNode = reversedList.head;
    while (node && revNode) {
      if (node.value !== revNode.value) {
        return false;
      }
      node = node.next;
      revNode = revNode.next;
    }
    return true;
  }

  DeleteNAfterMNodes() {}

  linkedlistToCircular() {
    var tail = this.tail;
    tail.next = this.head;
    return this;
  }

  isCircular() {
    var lastNode = this.tail;
    var head = this.head;
    return lastNode.next ? lastNode.next.value === head.value : false;
  }
}

const linkedList = new LinkedList();
linkedList.push(1);
linkedList.push(2);
linkedList.push(3);
linkedList.push(4);
linkedList.push(5);
// linkedList.push(6);
// linkedList.pop();
// linkedList.tail.next = linkedList.head;

const linkedList2 = new LinkedList();
// linkedList2.push(2);
// // linkedList.push(2);
// linkedList2.push(4);
// // linkedList.push(2);
// // linkedList.push(1);
// linkedList2.push(6);
function mergeTwoLLAtAlternatePlace(a, b) {
  //1->3 ->5 ,  2->4->6
  var firstNode = a.head;
  var secondNode = b.head;
  while (firstNode && secondNode) {
    //1 2  1->2
    var currentNode = firstNode.next; //1
    firstNode.next = secondNode; //
    if (!secondNode.next) {
      a.tail = secondNode;
    }
    secondNode = secondNode.next;

    firstNode.next.next = currentNode;
    firstNode = currentNode;
  }
  return a;
}
console.log(mergeTwoLLAtAlternatePlace(linkedList, linkedList2));

// Input: head = [1,2,3,4,5], n = 2
// Output: [1,2,3,5]

var removeNthFromEnd = function(head, n) {
  if (!head.next) return null;
  const newHead = new ListNode(null, head);
  let slow = newHead;
  let runner = head;
  while (runner) {
    runner = runner.next;
    if (n > 0) {
      n--;
    } else {
      slow = slow.next;
    }
  }
  slow.next = slow.next.next;
  return newHead.next;
};

// Merger 2 sorted list

var mergeTwoLists = function(l1, l2) {
  const head = new ListNode();
  let current = head;

  while (l1 && l2) {
    if (l1.val <= l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }

    current = current.next;
  }
  // get any left over values in l1 and l2
  // we are guaranteed that current is not null because
  // while loop only runs when l1 and l2 are defined
  if (l1) {
    current.next = l1;
  } else {
    current.next = l2;
  }

  return head.next;
};
// Input: lists = [[1,4,5],[1,3,4],[2,6]]
// Output: [1,1,2,3,4,4,5,6]
var mergeKLists = function(lists) {
  if (!lists.length) {
    return [];
  }
  var current = lists[0];
  for (var i = 1; i < lists.length; i++) {
    var head = new ListNode();
    var result = head;
    var l1 = lists[i];
    while (current && l1) {
      if (l1.val <= current.val) {
        result.next = new ListNode(l1.val, null);
        l1 = l1.next;
      } else {
        result.next = new ListNode(current.val, null);
        current = current.next;
      }
      result = result.next;
    }

    if (l1) {
      result.next = l1;
    }
    if (current) {
      result.next = current;
    }
    current = head.next;
  }
  return current;
};

// Input: head = [1,2,3,4]
// Output: [2,1,4,3]
var swapPairs = function(head) {
  var newList = new ListNode();
  var current = newList;
  while (head) {
    if (head.next) {
      current.next = new ListNode(head.next.val, null);
      current.next.next = new ListNode(head.val, null);
      head = head.next.next;
      current = current.next.next;
    } else {
      current.next = new ListNode(head.val, null);
      head = head.next;
    }
  }
  return newList.next;
};
// find middle
const findMedian = head => {
  let fast = head,
    slow = head;
  while (fast !== null) {
    fast = fast.next;
    if (fast === null) break;
    fast = fast.next;
    slow = slow.next;
  }
  return slow;
};
// BST from a sorted linked list
var sortedListToBST = function(head) {
  const getMidNode = headNode => {
    let fast = headNode;
    let slow = headNode;
    while (fast !== null) {
      fast = fast.next;
      if (fast === null) {
        break;
      }
      fast = fast.next;
      slow = slow.next;
    }
    return slow;
  };

  const getPrev = (headNode, tail) => {
    if (headNode === tail) return null;
    var current = headNode;
    while (current.next !== tail) {
      current = current.next;
    }
    return current;
  };

  function createBST(head) {
    if (head === null) return null;
    let mid = getMidNode(head);
    let root = new TreeNode(mid.val);
    root.right = createBST(mid.next);
    let prev = getPrev(head, mid);
    if (prev) {
      prev.next = null;
      root.left = createBST(head);
    } else {
      root.left = null;
    }
    return root;
  }
  return createBST(head);
};
// 1->2->3->-4> k=1 4->1->2->3
var rotateRight = function(head, k) {
  //find the length
  let length = 1;
  let pt = head;
  while (pt && pt.next) {
    length++;
    pt = pt.next;
  }

  //we're using modulo for the edge case of if the length is smaller than k
  k = k % length;

  //edge case -> if k is 0, we don't need a rotation
  if (k === 0) {
    return head;
  }

  //find the new tail
  let newTail = head;
  let spaces = length - k;
  while (spaces > 1) {
    spaces--;
    newTail = newTail.next;
  }

  //save the new head and reset appropriately
  let newHead = newTail.next;
  newTail.next = null;
  pt.next = head;
  return newHead;
};
