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
  useToast
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
      minH="250px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      borderWidth="1px"
      borderRadius="md"
      boxShadow="sm"
      p={4}
      bg="white"
      _hover={{ boxShadow: 'md', transform: 'scale(1.02)' }}
      transition="all 0.2s ease-in-out"
    >
      <Flex direction="column" justify="space-between" height="100%">
        <Box>
          {isEditing ? (
            <>
              <Input
                size="sm"
                value={editedTerm}
                onChange={(e) => setEditedTerm(e.target.value)}
                mb={2}
              />
              <Input
                size="sm"
                value={editedDefinition}
                onChange={(e) => setEditedDefinition(e.target.value)}
                mb={2}
              />
              <Input
                size="sm"
                value={editedTag}
                onChange={(e) => setEditedTag(e.target.value)}
              />
            </>
          ) : (
            <>
              <Text fontSize="lg" fontWeight="bold">{term}</Text>
              <Text fontSize="md" noOfLines={4}>{definition}</Text>
              {tag && (
                <Badge colorScheme="teal" fontSize="0.8em">
                  {tag}
                </Badge>
              )}
            </>
          )}
        </Box>

        <Flex mt={4}>
          {isEditing ? (
            <>
              <Button size="sm" colorScheme="green" onClick={handleUpdate}>
                Save
              </Button>
              <Spacer />
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
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
      </Flex>
    </Box>
  );
}

export default Flashcard;