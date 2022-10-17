class Stack {
  constructor() {
    this.items = [];
  }

  push(val) {
    this.items.push(val);
  }
  pop() {
    this.items.shift(val);
  }
  peek() {
    return this.item[this.items.length - 1];
  }
  isEmpty() {
    return this.item.length === 0;
  }
}
