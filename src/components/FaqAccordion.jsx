import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box
} from '@chakra-ui/react';

function FaqAccordion() {
  return (
    <Box maxW="700px" mx="auto" my={10}>
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">What is CMooreFlashcards?</Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            A React learning app that uses AWS DynamoDB to store and retrieve flashcards in real time.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">How do I add a flashcard?</Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            Fill out the form with a term, definition, and tag, then click “Add Flashcard.”
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}

export default FaqAccordion;