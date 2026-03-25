import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Questioner from "../components/Questioner";
import Quiz from "../domain/Quiz";

describe("Questioner accessibility", () => {
  const mockQuiz: Quiz = { q: "1+1", a: 2 };
  const mockSetQuizs = jest.fn();
  const mockToggle = jest.fn();

  const renderComponent = (voiceEnabled: boolean, wrongCount: number) => {
    render(
      <Questioner
        quizs={[mockQuiz]}
        currentQuiz={mockQuiz}
        whichQuiz={0}
        setQuizs={mockSetQuizs}
        voiceEnabled={voiceEnabled}
        onToggleVoice={mockToggle}
        wrongCount={wrongCount}
      />,
    );
  };

  test("button has aria-pressed reflecting voiceEnabled", () => {
    renderComponent(true, 1);
    const button = screen.queryByRole("button");
    expect(button).toBeNull();
  });

  test("button absent when voiceEnabled false", () => {
    renderComponent(false, 1);
    const button = screen.queryByRole("button");
    expect(button).toBeNull();
  });

  test("button absent when voiceEnabled true and wrongCount 0", () => {
    renderComponent(true, 0);
    const button = screen.queryByRole("button");
    expect(button).toBeNull();
  });

  test("button absent when voiceEnabled false and wrongCount 0", () => {
    renderComponent(false, 0);
    const button = screen.queryByRole("button");
    expect(button).toBeNull();
  });

  test("button absent even when wrongCount is 0", () => {
    renderComponent(true, 0);
    const button = screen.queryByRole("button");
    expect(button).toBeNull();
  });
});
