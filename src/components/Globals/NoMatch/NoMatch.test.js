import NoMatch from "./index";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/example/path",
  }),
}));

describe("NoMatch", () => {
  test("Renders correctly in DOM", () => {
    shallow(<NoMatch />);
  });
});
