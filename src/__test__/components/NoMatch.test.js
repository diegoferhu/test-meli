import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";
import NoMatch from "../../shared/components/NoMatch";

describe("NoMatch", () => {
  test("should render NoMatch component", () => {
    const wrapperNoMatch = mount(<NoMatch />);
    expect(wrapperNoMatch.find("h2").text()).toBe("404 Not Found");
    expect(wrapperNoMatch).toMatchSnapshot();
  });
});
