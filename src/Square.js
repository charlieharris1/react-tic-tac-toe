import React from "react";

// stateless functional component, simple and easy to write,
export function Square({ value, onClick }) {
  // props or properties are values passed from a parent component. You can see here the data flows in one direction, from Game to Square.
  // using JSX, which is a syntax extension, that allows you to put markup and render logic in the same files.
  // this component is rendering a DOM element.
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}