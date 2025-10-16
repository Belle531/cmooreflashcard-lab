import React, { useEffect, useState } from 'react';
import { Box, Text, Button, HStack, VStack } from '@chakra-ui/react';
import { scanFlashcards } from '../dynamo';
import Flashcard from './Flashcard';

function FlashcardList() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const currentCard = flashcards[currentIndex];

  return (
    <Box my={8} maxW="600px" mx="auto">
      <VStack spacing={6}>
        <Text fontSize="2xl" fontWeight="bold">
          Study Mode
        </Text>

        {currentCard ? (
          <>
            <Flashcard
              id={currentCard.id}
              term={currentCard.term}
              definition={currentCard.definition}
              tag={currentCard.tag}
              deleteFlashcard={(deletedId) => {
                const updated = flashcards.filter(fc => fc.id !== deletedId);
                setFlashcards(updated);
                setCurrentIndex((prev) => Math.max(prev - 1, 0));
              }}
              updateFlashcard={(updatedId, updatedFields) => {
                setFlashcards(prev =>
                  prev.map(fc =>
                    fc.id === updatedId ? { ...fc, ...updatedFields } : fc
                  )
                );
              }}
            />

            <HStack spacing={4}>
              <Button
                onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
                isDisabled={currentIndex === 0}
              >
                Previous
              </Button>
              <Text fontSize="md">
                Card {currentIndex + 1} of {flashcards.length}
              </Text>
              <Button
                onClick={() =>
                  setCurrentIndex((i) => Math.min(i + 1, flashcards.length - 1))
                }
                isDisabled={currentIndex === flashcards.length - 1}
              >
                Next
              </Button>
            </HStack>
          </>
        ) : (
          <Text color="gray.500" fontStyle="italic">
            No flashcards available.
          </Text>
        )}
      </VStack>
    </Box>
  );
}

export default FlashcardList;