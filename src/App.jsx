import React from 'react';
import { Box, Heading, VStack } from '@chakra-ui/react';
import FlashcardForm from './components/FlashcardForm.jsx';
import FlashcardList from './components/FlashcardList.jsx';
import FaqAccordion from './components/FaqAccordion.jsx';

export default function App() {
  return (
    <Box maxW="800px" mx="auto" p={6}>
      <VStack spacing={6}>
        <Heading size="2xl" textAlign="center" color="green.400" mt={4}>
          CMOORE FLASHCARD LAB
        </Heading>
        <FlashcardForm />
        <FlashcardList />
        <FaqAccordion />
      </VStack>
    </Box>
  );
}
