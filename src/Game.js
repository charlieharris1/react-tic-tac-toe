import React from "react";

import { Board } from "./Board";
import calculateWinner from './calculateWinner';

export class Game extends React.Component {
  constructor(props) {
    // Calling super gives you access to the functions of the objects parent, which in this case is
    super(props);
    // Components can have state, which allows them to hold data/remember what has happened

    /*
      history: [
        {
          squares: [
            null, X, null,
            X, O, O,
            null, X, null,
          ]
        },
        stepNumber: 0,
        xIsNext: true,
      */

    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1); // creates a copy of the history array.
    const current = history[history.length - 1]; // take the last element of the history array
    const squares = current.squares.slice(); // get the squares in the last element of the history array.
    // do nothing if there is a winner or the square already has a value
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // set the value of the square.
    squares[i] = this.state.xIsNext ? "X" : "O";

    // update state
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  // sends you to a specific step when you click a move button.
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0 // 0, 2, 4 (even numbers are X's)
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    // last updated.
    // you can use .map() to describe an array of elements.
    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            <span
              className={`foo ${this.state.stepNumber === move ? 'foo--bar' : ''}`}
              style={{
                fontWeight: this.state.stepNumber === move ? "bold" : "normal"
              }}
            >
              {desc}
            </span>
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}