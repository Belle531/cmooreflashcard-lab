import React, { useState, useEffect, useCallback } from 'react';
import { Box, Heading, VStack, useToast } from '@chakra-ui/react';
import FlashcardForm from './components/FlashcardForm.jsx';
import FlashcardList from './components/FlashcardList.jsx';
import FaqAccordion from './components/FaqAccordion.jsx';
import { scanFlashcards, updateFlashcard, deleteFlashcard } from './dynamo';

export default function App() {
  const [flashcards, setFlashcards] = useState([]);
  const toast = useToast();

  const loadFlashcards = useCallback(async () => {
    try {
      const data = await scanFlashcards();
      setFlashcards(data);
    } catch (err) {
      console.error(err);
      toast({
        title: 'Failed to load flashcards',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }
  }, [toast]);

  useEffect(() => {
    loadFlashcards();
  }, [loadFlashcards]);

  const handleAdd = (newCard) => {
    setFlashcards(prev => [...prev, newCard]);
  };

  const handleLocalUpdate = (id, fields) => {
    setFlashcards(prev =>
      prev.map(fc => fc.id === id ? { ...fc, ...fields } : fc)
    );
  };

  const handleLocalDelete = (id) => {
    setFlashcards(prev => prev.filter(fc => fc.id !== id));
  };

  return (
    <Box maxW="900px" mx="auto" p={6}>
      <VStack spacing={6}>
        <Heading size="2xl" textAlign="center" color="green.400" mt={4}>
          CMOORE FLASHCARD LAB
        </Heading>

        <FlashcardForm onFlashcardAdded={handleAdd} />

        <FlashcardList
          flashcards={flashcards}
          onUpdate={handleLocalUpdate}
          onDelete={handleLocalDelete}
          refresh={loadFlashcards}
          persistUpdate={updateFlashcard}
          persistDelete={deleteFlashcard}
        />

        <FaqAccordion />
      </VStack>
    </Box>
  );
}
