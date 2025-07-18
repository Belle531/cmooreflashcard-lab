import React, { useEffect, useState } from 'react';
import { SimpleGrid, Text, Box } from '@chakra-ui/react';
import { scanFlashcards, updateFlashcard as updateFlashcardInDb } from '../dynamo';
import Flashcard from './Flashcard';

function FlashcardList() {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await scanFlashcards();
        setFlashcards(data);
      } catch (err) {
        console.error('Error fetching flashcards:', err);
      }
    }

    loadData();
  }, []);

  const handleDeleteFlashcard = (deletedId) => {
    setFlashcards(prev => prev.filter(fc => fc.id !== deletedId));
  };

  const handleUpdateFlashcard = async (updatedId, updatedFields) => {
    try {
      await updateFlashcardInDb(updatedId, updatedFields);
      setFlashcards(prev =>
        prev.map(fc =>
          fc.id === updatedId ? { ...fc, ...updatedFields } : fc
        )
      );
    } catch (err) {
      console.error('Failed to update flashcard:', err);
    }
  };

  return (
    <Box my={8}>
      <Text fontSize="2xl" fontWeight="semibold" mb={4}>
        Flashcard List
      </Text>
      <Text fontSize="md" mb={4} color="gray.600">
        You’ve created {flashcards.length} flashcard{flashcards.length !== 1 ? 's' : ''}.
      </Text>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
        {flashcards.map(card => (
          <Flashcard
            key={card.id}
            id={card.id}
            term={card.term}
            definition={card.definition}
            tag={card.tag}
            deleteFlashcard={handleDeleteFlashcard}
            updateFlashcard={handleUpdateFlashcard}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default FlashcardList;