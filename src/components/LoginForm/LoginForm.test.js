import FormLogin from "./index";
import { sendRequest } from "../../utils/sendRequest";

describe("FormLogin", () => {
  test("Renders correctly in DOM", () => {
    const onSubmit = jest.fn();
    shallow(<FormLogin onSubmit={onSubmit} />);
  });

  test("Should have an 'username' field", () => {
    const onSubmit = jest.fn();
    const wrapper = mount(<FormLogin onSubmit={onSubmit} />);
    expect(wrapper.find('input[type="email"]').length).toEqual(1);
  });

  test("Should propagate 'username' input changes through the onChange function", () => {
    const onSubmit = jest.fn();
    const wrapper = mount(<FormLogin onSubmit={onSubmit} />);

    wrapper
      .find("form")
      .find("input")
      .at(0)
      .simulate("change", {
        target: {
          name: "username",
          value: "doe@test.com",
        },
      });

    const newValue = wrapper.find("form").find("input").at(0).props().value;

    expect(newValue).toEqual("doe@test.com");
  });

  test("Should propagate 'password' input changes through the onChange function", () => {
    const onSubmit = jest.fn();
    const wrapper = mount(<FormLogin onSubmit={onSubmit} />);

    wrapper
      .find("form")
      .find("input")
      .at(1)
      .simulate("change", {
        target: {
          name: "password",
          value: "123456",
        },
      });

    const newValue = wrapper.find("form").find("input").at(1).props().value;

    expect(newValue).toEqual("123456");
  });

  test("Should contain a submit form button", async () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(<FormLogin onSubmit={onSubmit} />);

    expect(wrapper.find("button").length).toBe(1);
  });

  test("Should have proper props for 'username' field", () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(<FormLogin onSubmit={onSubmit} />);
    const emailInput = wrapper.find('input[type="email"]');

    expect(emailInput.props().type).toEqual("email");
    expect(emailInput.props().placeholder).toEqual("Username");
    expect(emailInput.props().className).toEqual("form-control");
    expect(emailInput.props().name).toEqual("username");
    expect(emailInput.props().value).toEqual("");
  });

  test("Should reach the 'login' endpoint and return a success response with the user and token payload", async () => {
    const payload = {
      username: "doe@test.com",
      password: "123456",
    };

    const user = {
      success: true,
      user: {
        username: payload.username,
        name: "John Doe",
      },
      jwtoken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE1MTYyMzkwMjJ9.4lnM9fXjW0jtT3lkh8d8D9jMPG52KOVlFXj9C0qUzTQ",
    };

    fetch.mockResponseOnce(JSON.stringify(user));
    const res = await sendRequest("login", payload);

    expect(res).toEqual(user);
  });

  test("Should executes a handler function on submittal", () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(<FormLogin onSubmit={onSubmit} />);

    wrapper.find("form").simulate("submit", {
      preventDefault: () => {},
      target: {
        elements: {
          username: { value: "doe@test.com" },
          password: { value: "123456" },
        },
      },
    });
  });
});
