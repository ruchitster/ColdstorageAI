import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";

test("renders login button", () => {
  render(<button>Login</button>);
  expect(screen.getByText("Login")).toBeInTheDocument();
});