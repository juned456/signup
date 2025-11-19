import { render, screen } from "@testing-library/react";
import SigninPage from "./page";

describe("Signin Page", () => {
  test("Signin link", () => {
    render(<SigninPage />);
    expect(
      screen.getByText("Please sign", { exact: false })
    ).toBeInTheDocument();
  });
});
