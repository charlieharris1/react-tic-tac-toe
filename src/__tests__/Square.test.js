import React from "react";
import { mount } from "enzyme";

import { Square } from "../Square";

describe("Square", () => {
  test("displays the value passed in", () => {
    const square = mount(<Square value="X" onClick={() => {}} />);

    expect(square.find('button').text()).toEqual("X");
  });

  test("sets the correct class", () => {
    const square = mount(<Square value="X" onClick={() => {}} />);

    expect(square.find('button').hasClass("square")).toEqual(true);
  });


  test("calls the on click function when clicked", () => {
    const onClick = jest.fn();
    const square = mount(<Square value="X" onClick={onClick} />);

    square.simulate('click');

    expect(onClick).toHaveBeenCalled();
  });
});
