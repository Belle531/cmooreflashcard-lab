import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  Stack,
  Heading,
  Textarea,
  useToast
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { createFlashcard } from "../dynamo";

export default function FlashcardForm() {
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [tag, setTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!term.trim() || !definition.trim() || !tag.trim()) {
      toast({
        title: "All fields are required.",
        status: "warning",
        duration: 3000,
        isClosable: true
      });
      return;
    }

    const newFlashcard = {
      id: uuidv4(),
      term: term.trim(),
      definition: definition.trim(),
      tag: tag.trim() || 'general'
    };

    try {
      setIsLoading(true);
      await createFlashcard(newFlashcard);
      setTerm('');
      setDefinition('');
      setTag('');
      toast({
        title: "Flashcard added!",
        status: "success",
        duration: 3000,
        isClosable: true
      });
    } catch (error) {
      console.error("Failed to save flashcard:", error);
      toast({
        title: "Error saving flashcard.",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      bg="gray.50"
      p={6}
      borderRadius="lg"
      boxShadow="lg"
      maxW="600px"
      mx="auto"
      mt={12}
    >
      <Stack spacing={6}>
        <Heading size="md" textAlign="center">
          Add a New Flashcard
        </Heading>

        <FormControl isRequired>
          <FormLabel mb={1}>Term</FormLabel>
          <Input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="e.g. React"
            variant="filled"
            autoFocus
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel mb={1}>Definition</FormLabel>
          <Textarea
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
            placeholder="e.g. A JavaScript library for building UIs"
            variant="filled"
            resize="vertical"
            minH="80px"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel mb={1}>Tag</FormLabel>
          <Input
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="e.g. frontend, aws, db"
            variant="filled"
          />
        </FormControl>

        <Button
          type="submit"
          colorScheme="teal"
          isLoading={isLoading}
          loadingText="Adding..."
          size="lg"
          _hover={{ transform: 'scale(1.01)' }}
        >
          Save Flashcard
        </Button>
      </Stack>
    </Box>
  );
}