class LRUCache {
  constructor(capacity) {
    this.container = {};
    this.capacity = capacity;
  }

  changeProirity(key, deleteLastPriority = false) {
    const getPriority = this.container[key]["priority"];

    const keys = Object.keys(this.container);
    keys.forEach(key => {
      if (this.container[key].priority < getPriority) {
        this.container[key].priority++;
      } else if (this.container[key].priority === getPriority) {
        this.container[key].priority = 1;
      }
      if (
        deleteLastPriority &&
        this.container[key].priority === this.capacity
      ) {
        delete this.container[key];
      }
    });
    if (getPriority > this.capacity) {
      this.container[key].priority = 1;
    }
  }
  get(key) {
    if (this.container[key]) {
      this.changeProirity(key);
    }
    return this.container[key] ? this.container[key]["value"] : -1;
  }

  put(key, value) {
    this.container[key] = {
      value: value,
      priority: this.capacity + 1
    };
    this.changeProirity(key, true);
  }
}

const cache = new LRUCache(3);

cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1)); // returns 1
cache.put(3, 3); // evicts key 2
console.log(cache.get(2)); // returns -1 (not found)
cache.put(4, 4); // evicts key 1
console.log(cache.get(1)); // returns -1 (not found)
console.log(cache.get(3)); // returns 3
console.log(cache.get(4)); // returns 4

// =============
// function test(a) {
//   var data = 5;
//   return function(b) {
//     data = data + a + b;
//     return data;
//   };
// }

// const myFunc = test(5);
// // console.log(myFunc(5))
// // console.log(myFunc(5))
// // console.log(myFunc(5))
// // ===========
// function abc() {
//   this.count++;

//   return this.count;
// }
// const ab = abc.bind({count:0});
// console.log(abc());

// ===========
// var a=10;

// function test(a){
//   a =20;
//   console.log(a)
// }
// console.log(a)
// test(a)
// console.log(a)

// // ===========
// function test(){
//   console.log(a);
//   console.log(b)
//  const a;
//  var b;
// }

// ===========

// const obj = {
//   a: 1,
//   getA: () => this.a
// };

// "hello" === new String("hello");

// 1 ->one
// 2 ->two

// 999

// async defer & event bubble/capture

// check if two obj are same
