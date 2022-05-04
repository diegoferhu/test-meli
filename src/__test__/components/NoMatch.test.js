import "jsdom-global/register";
import React from "react";
import Enzyme from "enzyme";
import NoMatch from "../../shared/components/NoMatch";

describe("NoMatch", () => {
  test("should render NoMatch component", () => {
    const wrapper = Enzyme.mount(<NoMatch />);
    expect(wrapper.find("h2").text()).toBe("404 Not Found");
    expect(wrapper).toMatchSnapshot();
  });
});
