import { useAuthContext, AuthProvider } from "../../../context/AuthProvider";

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
});
