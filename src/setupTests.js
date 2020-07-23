import React from "react";
import Enzyme, { shallow, render, mount } from "enzyme";
import fetchMock from "jest-fetch-mock";
import Adapter from "enzyme-adapter-react-16";
require("jest-localstorage-mock");

Enzyme.configure({ adapter: new Adapter() });
fetchMock.enableMocks();

// Make Enzyme functions available in all test files
global.React = React;
global.shallow = shallow;
global.render = render;
global.mount = mount;
