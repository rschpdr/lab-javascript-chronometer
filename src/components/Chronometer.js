import React, { Component } from "react";
import "../assets/styles/styles.css";

let interval = null;

class Chronometer extends Component {
  state = {
    currentTime: 0,
    isRunning: false,
    splits: [],
    startBtn: {
      className: "start",
      btnText: "START",
    },
    resetBtn: {
      className: "reset",
      btnText: "RESET",
    },
  };

  getMinutes = () => {
    return Math.floor(this.state.currentTime / (60 * 100));
  };

  getSeconds = () => {
    return Math.floor((this.state.currentTime / 100) % 60);
  };

  getMilliseconds = () => {
    return this.state.currentTime % 100;
  };

  twoDigitsNumber(number) {
    if (number < 10) {
      return "0" + number;
    }

    return "" + number;
  }

  formatSplit() {
    return (
      this.twoDigitsNumber(this.getMinutes()) +
      ":" +
      this.twoDigitsNumber(this.getSeconds()) +
      ":" +
      this.twoDigitsNumber(this.getMilliseconds())
    );
  }

  onStartClick = () => {
    if (this.state.isRunning) {
      clearInterval(interval);

      this.setState({
        startBtn: {
          className: "start",
          btnText: "START",
        },
        resetBtn: {
          className: "reset",
          btnText: "RESET",
        },
        isRunning: false,
      });
    } else {
      interval = setInterval(() => {
        this.setState((previousState) => ({
          currentTime: previousState.currentTime++,
        }));
      }, 10);

      this.setState({
        startBtn: {
          className: "stop",
          btnText: "STOP",
        },
        resetBtn: {
          className: "split",
          btnText: "SPLIT",
        },
        isRunning: true,
      });
    }
  };

  onResetClick = () => {
    if (this.state.isRunning) {
      this.setState((previousState) => {
        return { splits: [...previousState.splits, this.formatSplit()] };
      });
    } else {
      this.setState({ currentTime: 0 });
    }
  };

  render() {
    return (
      <div>
        <section id="splits-container">
          <h3>Splits</h3>
          <ol id="splits">
            {this.state.splits.map((split) => (
              <li>{split}</li>
            ))}
          </ol>
        </section>

        <div className="leash leash-top"></div>

        <section id="clock">
          <div id="sphere">
            <span className="number">
              {this.twoDigitsNumber(this.getMinutes())}
            </span>
            <span>:</span>
            <span className="number">
              {this.twoDigitsNumber(this.getSeconds())}
            </span>

            <div id="milliseconds">
              <span>{this.twoDigitsNumber(this.getMilliseconds())}</span>
            </div>

            <button
              onClick={this.onStartClick}
              id="btnLeft"
              className={`btn ${this.state.startBtn.className}`}
            >
              {this.state.startBtn.btnText}
            </button>
            <button
              onClick={this.onResetClick}
              id="btnRight"
              className={`btn ${this.state.resetBtn.className}`}
            >
              {this.state.resetBtn.btnText}
            </button>
          </div>
        </section>

        <div className="leash leash-bottom">
          <div className="hole"></div>
          <div className="hole"></div>
          <div className="hole"></div>
        </div>
      </div>
    );
  }
}

export default Chronometer;
