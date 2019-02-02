import React from "react";

import { Square } from "./Square";

// Class extends React.Component, which allows you to hook in to lifecycle methods and other functions like setState.
export class Board extends React.Component {
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