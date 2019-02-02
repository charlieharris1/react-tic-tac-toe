import React from "react";
import { shallow } from "enzyme";

import { Square } from "../Square";

describe("Square", () => {
  test("displays the value passed in", () => {
    const square = shallow(<Square value="X" onClick={() => {}} />);

    expect(square.text()).toEqual("X");
  });

  test("sets the correct class", () => {
    const square = shallow(<Square value="X" onClick={() => {}} />);

    expect(square.prop('className')).toEqual("square");
  });


  test("calls the on click function when clicked", () => {
    const onClick = jest.fn();
    const square = shallow(<Square value="X" onClick={onClick} />);

    square.simulate('click');

    expect(onClick).toHaveBeenCalled();
  });

});
