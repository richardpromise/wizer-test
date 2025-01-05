import { render, fireEvent } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import NotFound from "../components/404";

describe("NotFound Component", () => {
  it("should render correctly and navigate when the button is clicked", () => {
    const navigate = vi.fn();

    const { getByText } = render(<NotFound />);

    const button = getByText(/Go to Dashboard/);

    fireEvent.click(button);

    expect(navigate).toHaveBeenCalledWith("/");
  });
});
