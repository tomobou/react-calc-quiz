import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Game from "../components/Game";

// Helper to click a quiz selector button by its name
const clickQuizButton = (name: string) => {
  const button = screen.getByText(name);
  fireEvent.click(button);
};

// Helper to click a number button
const clickNumber = (value: string) => {
  const button = screen.getByRole("button", { name: value });
  fireEvent.click(button);
};

describe("Game component integration", () => {
  test("starts a quiz, answers correctly, and can reset", async () => {
    render(<Game />);

    // Choose a quiz – pick the first button (e.g., たしざん１)
    clickQuizButton("たしざん１");

    // The first quiz from tasizan1 has answer 2; click the number 2
    clickNumber("2");

    // Wait for the result view to appear
    await waitFor(() => {
      expect(screen.getByText("しゅうりょうー")).toBeInTheDocument();
    });

    // Reset the game by clicking the results container
    const resultContainer = screen.getByText("しゅうりょうー").closest("div[style]");
    if (resultContainer) {
      fireEvent.click(resultContainer);
    }

    // The result view should no longer be in the document
    await waitFor(() => {
      expect(screen.queryByText("しゅうりょうー")).not.toBeInTheDocument();
    });
  });
});
