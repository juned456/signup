import { render, screen, configure } from "@testing-library/react";
import Home from "./page"; // 👈 because page.test.js and page.js are in the same folder

configure({ testIdAttribute: "id" }); // because in page.js, button has id="test-id"

describe("Home Page", () => {
  // test("renders Signup link", () => {
  //   const container = render(<Home />);
  //   expect(container).toMatchSnapshot();
  // });
  test("input element is present", () => {
    render(<Home />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue("Hello");
  });
  test("button element is present", () => {
    render(<Home />);
    const buttonElement = screen.getByRole("button", { name: "Click Me" });
    expect(buttonElement).toBeInTheDocument();
  });

  test("test id override is working", () => {
    render(<Home />);
    const testIdButton = screen.getByTestId("test-id");
    expect(testIdButton).toBeInTheDocument();
  });
});
