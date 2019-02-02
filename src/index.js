import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

// stateless functional component, simple and easy to write,
function Square({ value, onClick }) {
  // props or properties are values passed from a parent component. You can see here the data flows in one direction, from Game to Square.
  // using JSX, which is a syntax extension, that allows you to put markup and render logic in the same files.
  // this component is rendering a DOM element.
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

// Class extends React.Component, which allows you to hook in to lifecycle methods and other functions like setState.
class Board extends React.Component {
  // function that belongs to Board, that returns a React component. It keeps the render function clean.
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]} // pass the current value of the square as a property to the Square component.
        onClick={() => this.props.onClick(i)} // the onClick function that is passed as a prop to from Game is passed down to square. Neither Square nor Board know anything about the function.
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
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

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

// React element is rendered into the DOM in the supplied container,
ReactDOM.render(<Game />, document.getElementById("root"));