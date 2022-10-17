class MyPromise {
  constructor() {
    this.state = "pending";
    this.result = "";
    this.handlers = [];
    executor(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve(value) {
    if (this.state === "pending") return;
    this.state = "fulfilled";
    this.result = value;
    this.executeHandlers();
  }

  reject(error) {
    if (this.state === "pending") return;
    this.state = "rejected";
    this.result = error;
    this.executeHandlers();
  }

  executeHandlers() {
    if (this.state === "pending") return;
    for (let handler of handlers) {
      queueMicrotask(() => {
        handler[this.state](this.result);
      });
    }
  }

  then(fulfilled, rejected) {
    return new MyPromise((resolve, reject) => {
      this.handlers.push({
        fulfilled: value => {
          if (typeof fulfilled !== "function") {
            resolve(value);
          } else {
            try {
              resolve(fulfilled(value));
            } catch (err) {
              reject(err);
            }
          }
        },
        rejected: error => {
          if (typeof rejected !== "function") {
            reject(error);
          } else {
            try {
              reject(rejected(error));
            } catch (err) {
              reject(err);
            }
          }
        }
      });
      this.executeHandlers();
    });
  }
}
