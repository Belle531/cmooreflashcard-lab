import React, { useState } from 'react';
import {
  Box,
  Text,
  Badge,
  VStack,
  Button,
  Input,
  Flex,
  Spacer,
  useToast,
  Heading,
  FormControl,
  FormLabel
} from '@chakra-ui/react';

function Flashcard({
  id,
  term,
  definition,
  tag,
  deleteFlashcard,
  updateFlashcard
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTerm, setEditedTerm] = useState(term);
  const [editedDefinition, setEditedDefinition] = useState(definition);
  const [editedTag, setEditedTag] = useState(tag);
  const toast = useToast();

  const handleDelete = async () => {
    if (typeof deleteFlashcard === 'function') {
      deleteFlashcard(id);
      toast({
        title: 'Flashcard deleted.',
        status: 'info',
        duration: 3000,
        isClosable: true
      });
    } else {
      console.error('Delete function not provided');
    }
  };

  const handleUpdate = async () => {
    const updatedFields = {
      term: editedTerm,
      definition: editedDefinition,
      tag: editedTag
    };

    if (typeof updateFlashcard === 'function') {
      updateFlashcard(id, updatedFields);
      toast({
        title: 'Flashcard updated.',
        status: 'success',
        duration: 3000,
        isClosable: true
      });
    } else {
      console.error('Update function not provided');
    }

    setIsEditing(false);
  };

  return (
    <Box
      minH="320px"
      maxW="600px"
      mx="auto"
      bg="white"
      p={6}
      borderRadius="lg"
      boxShadow="xl"
      transition="all 0.2s ease"
    >
      <VStack align="stretch" spacing={5}>
        <Heading size="md" textAlign="center">
          Flashcard
        </Heading>

        {isEditing ? (
          <>
            <FormControl>
              <FormLabel>Term</FormLabel>
              <Input
                value={editedTerm}
                onChange={(e) => setEditedTerm(e.target.value)}
                variant="filled"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Definition</FormLabel>
              <Input
                value={editedDefinition}
                onChange={(e) => setEditedDefinition(e.target.value)}
                variant="filled"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Tag</FormLabel>
              <Input
                value={editedTag}
                onChange={(e) => setEditedTag(e.target.value)}
                variant="filled"
              />
            </FormControl>
          </>
        ) : (
          <>
            <Text fontSize="lg" fontWeight="semibold">
              {term}
            </Text>
            <Text fontSize="md" color="gray.700">
              {definition}
            </Text>
            {tag && (
              <Badge colorScheme="teal" fontSize="0.85em" mt={1}>
                {tag}
              </Badge>
            )}
          </>
        )}

        <Flex pt={4}>
          {isEditing ? (
            <>
              <Button size="sm" colorScheme="green" onClick={handleUpdate}>
                Save
              </Button>
              <Spacer />
              <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button size="sm" colorScheme="red" onClick={handleDelete}>
                Delete
              </Button>
              <Spacer />
              <Button
                size="sm"
                colorScheme="blue"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
            </>
          )}
        </Flex>
      </VStack>
    </Box>
  );
}

export default Flashcard;