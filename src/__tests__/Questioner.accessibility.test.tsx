import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Questioner from '../components/Questioner';
import Quiz from '../domain/Quiz';

describe('Questioner accessibility', () => {
  const mockQuiz: Quiz = { q: '1+1', a: 2 };
  const mockSetQuizs = jest.fn();
  const mockToggle = jest.fn();

  const renderComponent = (voiceEnabled: boolean) => {
    render(
      <Questioner
        quizs={[mockQuiz]}
        currentQuiz={mockQuiz}
        whichQuiz={0}
        setQuizs={mockSetQuizs}
        voiceEnabled={voiceEnabled}
        onToggleVoice={mockToggle}
        wrongCount={1}
      />
    );
  };

  test('button has aria-pressed reflecting voiceEnabled', () => {
    renderComponent(true);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'true');

    // toggle should work
    fireEvent.click(button);
    expect(mockToggle).toHaveBeenCalled();
  });

  test('button aria-pressed false when voiceEnabled false', () => {
    renderComponent(false);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });
});
