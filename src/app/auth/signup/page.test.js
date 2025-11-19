import { render, screen } from "@testing-library/react";
import SignupPage from "./page";

describe("Signup Page", () => {
  test("renders Signup link", () => {
    render(<SignupPage />);
    expect(screen.getByText("Create an Account")).toBeInTheDocument();
  });
});
