import React from "react";
import "./styles.css";

class App extends React.Component {
  state = {
    inputValue: ""
  };

  debounce = d => {
    let timer;
    return function(val) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        console.log(val);
      }, d);
    };
  };

  throttle = d => {
    let timer;
    let lastarg;
    return function(val) {
      if (timer) {
        lastarg = val;
        return;
      }
      timer = setTimeout(() => {
        if (lastarg) {
          console.log(lastarg);
          timer = null;
        }
      }, d);
    };
  };

  callFn = this.debounce(1000);

  changeInput = e => {
    const { value } = e.target;
    this.setState({ inputValue: value });
    this.callFn(value);
  };
  render() {
    return (
      <div className="App">
        <div>
          <input
            type="text"
            value={this.state.inputValue}
            onChange={this.changeInput}
          />
        </div>
      </div>
    );
  }
}

export default App;

// functional component

import React, { useState } from "react";
import "./styles.css";

const App = () => {
  const [inputValue, setInputValue] = useState();

  const throttle = d => {
    let timer;
    let lastarg;
    return function(val) {
      if (timer) {
        lastarg = val;
        return;
      }
      timer = setTimeout(() => {
        if (lastarg) {
          console.log(lastarg);
          timer = null;
        }
      }, d);
    };
  };
  const debounce = d => {
    let timer;
    return function(val) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        console.log(val);
      }, d);
    };
  };

  const callFn = debounce(1000);

  const changeInput = e => {
    const { value } = e.target;
    setInputValue(inputValue);
    callFn(value);
  };

  return (
    <div className="App">
      <div>
        <input type="text" value={inputValue} onChange={changeInput} />
      </div>
    </div>
  );
};

export default App;
