import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Flashcard from '../src/components/Flashcard'; // ✅ Adjusted path for tests outside /src

test('calls deleteFlashcard when Delete button is clicked', () => {
  const mockDelete = jest.fn();

  const { getByText } = render(
    <Flashcard
      id="card42"
      term="React"
      definition="UI library"
      tag="frontend"
      deleteFlashcard={mockDelete}
    />
  );

  fireEvent.click(getByText('Delete'));

  expect(mockDelete).toHaveBeenCalledTimes(1);
  expect(mockDelete).toHaveBeenCalledWith('card42');
});