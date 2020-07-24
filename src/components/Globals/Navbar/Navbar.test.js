import { useAuthContext, AuthProvider } from "../../../context/AuthProvider";
import { sendRequest } from "../../../utils/sendRequest";

describe("Navbar", () => {
  test("Renders correctly in DOM", () => {
    const MockedNavbar = () => {
      const { user, logout } = useAuthContext();

      return (
        <>
          <div data-testid="value">{!user}</div>
          <button onClick={logout}>Logout</button>
        </>
      );
    };

    mount(
      <AuthProvider>
        <MockedNavbar />
      </AuthProvider>
    );
  });

  test("Should save authenticated user to localStorage", () => {
    const KEY = "jwtToken";
    const VALUE = {
      success: true,
      jwtoken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE1MTYyMzkwMjJ9.4lnM9fXjW0jtT3lkh8d8D9jMPG52KOVlFXj9C0qUzTQ",
      user: { name: "John Doe", username: "doe@test.com" },
    };

    localStorage.setItem(KEY, JSON.stringify(VALUE));

    expect(localStorage.setItem).toHaveBeenLastCalledWith(
      KEY,
      JSON.stringify(VALUE)
    );
    expect(localStorage.__STORE__[KEY]).toBe(JSON.stringify(VALUE));
    expect(Object.keys(localStorage.__STORE__).length).toBe(1);
  });

  test("Should get authenticated user from localStorage", () => {
    const KEY = "jwtToken";
    const VALUE = {
      success: true,
      jwtoken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE1MTYyMzkwMjJ9.4lnM9fXjW0jtT3lkh8d8D9jMPG52KOVlFXj9C0qUzTQ",
      user: { name: "John Doe", username: "doe@test.com" },
    };

    expect(localStorage.getItem).toHaveBeenLastCalledWith(KEY);
    expect(localStorage.__STORE__[KEY]).toBe(JSON.stringify(VALUE));
  });

  test("Should contain a logout button", async () => {
    const MockedNavbar = () => {
      const { user, logout } = useAuthContext();

      return (
        <>
          <div data-testid="value">{!!user}</div>
          <button onClick={logout}>Logout</button>
        </>
      );
    };

    const wrapper = mount(
      <AuthProvider>
        <MockedNavbar />
      </AuthProvider>
    );

    expect(wrapper.find("button").length).toBe(1);
  });

  test("Should remove token from LocalStorage when 'logout'", async () => {
    const KEY = "jwtToken";

    const response = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "Logged out successfully" }),
    };

    localStorage.removeItem(KEY);

    fetch.mockResponseOnce(JSON.stringify(response));
    const res = await sendRequest("logout", undefined);

    expect(res).toEqual(response);

    expect(localStorage.removeItem).toHaveBeenLastCalledWith(KEY);
    expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
    expect(localStorage.__STORE__).toEqual({});
    expect(localStorage.length).toBe(0);
  });
});

test("Should reach the 'logout' endpoint and return a success response and a proper message", async () => {
  const response = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: "Logged out successfully" }),
  };

  fetch.mockResponseOnce(JSON.stringify(response));
  const res = await sendRequest("logout", undefined);

  expect(res).toEqual(response);
});
