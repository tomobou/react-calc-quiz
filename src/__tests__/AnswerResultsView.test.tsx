import { render, screen } from '@testing-library/react';
import AnswerResultsView, { getGrade } from '../components/AnswerResultsView';
import { AnswerResult } from '../domain/AnswerResult';
import Quiz from '../domain/Quiz';

// Helper quiz
const quiz: Quiz = { q: '1+1', a: 2 };

describe('getGrade', () => {
  it('returns 5 for perfect score', () => {
    const results: AnswerResult[] = [{ quiz, wrongCount: 0, startTime: 0, endTime: 1000 }];
    expect(getGrade(results)).toBe('5');
  });

  it('returns 1 for 100% wrong', () => {
    const results: AnswerResult[] = [{ quiz, wrongCount: 1, startTime: 0, endTime: 1000 }];
    expect(getGrade(results)).toBe('1');
  });
});

describe('AnswerResultsView rendering', () => {
  const results: AnswerResult[] = [
    { quiz, wrongCount: 0, startTime: 0, endTime: 800 },
    { quiz, wrongCount: 1, startTime: 800, endTime: 1600 },
  ];

  test('renders table rows', () => {
    render(<AnswerResultsView results={results} />);
    // should show two rows
    const rows = screen.getAllByRole('row');
    // first row is header, expect 3 rows
    expect(rows.length).toBe(3);
  });
});
