import { useAuthContext, AuthProvider } from "./context/AuthProvider";

describe("App", () => {
  test("Renders correctly in DOM", () => {
    const MockedAppRoutes = () => {
      const { user } = useAuthContext();

      return (
        <>
          <div>{!user}</div>
        </>
      );
    };

    mount(
      <AuthProvider>
        <MockedAppRoutes />
      </AuthProvider>
    );
  });
});
