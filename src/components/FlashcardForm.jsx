import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
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
      p={4}
      borderRadius="md"
      boxShadow="md"
    >
      <VStack spacing={4}>
        <Input
          placeholder="Term"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <Input
          placeholder="Definition"
          value={definition}
          onChange={(e) => setDefinition(e.target.value)}
        />
        <Input
          placeholder="Tag (e.g. frontend, aws, db)"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <Button
          type="submit"
          colorScheme="green"
          isLoading={isLoading}
          loadingText="Adding..."
        >
          Add Flashcard
        </Button>
      </VStack>
    </Box>
  );
}