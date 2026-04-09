import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the starter instructions and documentation link", () => {
  render(<App />);
  expect(screen.getByText(/edit/i)).toBeInTheDocument();
  expect(screen.getByText("src/App.tsx")).toBeInTheDocument();

  const linkElement = screen.getByRole("link", { name: /learn react/i });

  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveAttribute("href", "https://reactjs.org");
  expect(linkElement).toHaveAttribute("target", "_blank");
});
