import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  test("renders learn react link", () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("renders the app header", () => {
    render(<App />);
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass("App-header");
  });

  test("renders the logo image", () => {
    render(<App />);
    const logo = screen.getByAltText(/logo/i);
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveClass("App-logo");
  });

  test("renders edit instruction text", () => {
    render(<App />);
    const editText = screen.getByText(/edit/i);
    expect(editText).toBeInTheDocument();
    expect(editText.textContent).toContain("src/App.tsx");
  });

  test("learn react link has correct attributes", () => {
    render(<App />);
    const link = screen.getByRole("link", { name: /learn react/i });
    expect(link).toHaveAttribute("href", "https://reactjs.org");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("renders App component without crashing", () => {
    const { container } = render(<App />);
    expect(container.querySelector(".App")).toBeInTheDocument();
  });
});
