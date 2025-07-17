
import { PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { DeleteCommand } from '@aws-sdk/lib-dynamodb';




// ✅ Define this early so it's available to both functions
const TABLE_NAME = 'CMooreFlashcardLab';



const client = new DynamoDBClient({
  region: process.env.REACT_APP_AWS_REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  },
});

const docClient = DynamoDBDocumentClient.from(client);

// ✅ Create new flashcard
export async function createFlashcard(flashcard) {
  try {
    console.log("Creating flashcard:", flashcard);
    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: flashcard,
    });
    await docClient.send(command);
    console.log("Flashcard saved to DynamoDB.");
  } catch (error) {
    console.error("Error creating flashcard:", error);
    throw error;
  }
}

// ✅ Read all flashcards
export async function scanFlashcards() {
  try {
    const command = new ScanCommand({ TableName: TABLE_NAME });
    const { Items } = await docClient.send(command);
    console.log("Flashcards loaded:", Items);
    return Items || [];
  } catch (error) {
    console.error("Error loading flashcards:", error);
    throw error;
  }
}

// ✅ Delete flashcard by ID
export async function deleteFlashcard(id) {
  try {
    const command = new DeleteCommand({
      TableName: TABLE_NAME,
      Key: { id },
    });
    await docClient.send(command);
    console.log(`Flashcard with ID '${id}' deleted.`);
  } catch (error) {
    console.error("Error deleting flashcard:", error);
    throw error;
  }
}



// ✅ Update flashcard by ID
export async function updateFlashcard(id, updatedFields) {
  try {
    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        id,
        ...updatedFields,
      },
    });
    await docClient.send(command);
    console.log(`Flashcard ${id} updated.`);
  } catch (error) {
    console.error("Error updating flashcard:", error);
    throw error;
  }
}

