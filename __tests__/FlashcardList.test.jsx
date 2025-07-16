jest.mock('../src/dynamo', () => ({
  scanFlashcards: jest.fn(() =>
    Promise.resolve([
      { id: '1', term: 'JavaScript', definition: 'Language', tag: 'tech' },
      { id: '2', term: 'React', definition: 'UI library', tag: 'frontend' }
    ])
  )
}));

import React from 'react';
import { render, screen } from '@testing-library/react';
import FlashcardList from '../src/components/FlashcardList';

test('renders flashcards from mock data', async () => {
  render(<FlashcardList />);

  expect(await screen.findByText('JavaScript')).toBeInTheDocument();
  expect(await screen.findByText('React')).toBeInTheDocument();
  expect(await screen.findByText(/You’ve created 2 flashcards/i)).toBeInTheDocument();
});