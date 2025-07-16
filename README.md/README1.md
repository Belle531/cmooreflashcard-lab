# Markdown

## Flashcard Learner App Setup

This guide walks you through setting up a simple Flashcard Learner application using React and integrating it with AWS DynamoDB.

---

## 1. Project Initialization

First, let's set up the basic project structure.

```bash
mkdir src
cd src
touch index.js App.jsx App.scss dynamo.js
mkdir components __tests__
2. src/index.js Configuration
This file is the entry point for your React application, rendering the main App component into the DOM.

JavaScript

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.scss';

ReactDOM.render(<App />, document.getElementById('root'));
3. public/index.html Setup
This HTML file serves as the root for your React application. The div with id="root" is where your React components will be rendered.

HTML

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Flashcard Learner</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
4. src/App.jsx - Main Wrapper Component
This will be your main wrapper component, bringing together the flashcard form and list.

JavaScript

import React from 'react';
import FlashcardList from './components/FlashcardList';
import FlashcardForm from './components/FlashcardForm';

function App() {
  return (
    <div className="App">
      <h1>Flashcard Learner</h1>
      <FlashcardForm />
      <FlashcardList />
    </div>
  );
}

export default App;
5. src/components/FlashcardForm.jsx
This component provides a UI form to add new flashcards. It manages its own state for the term and definition, and will eventually trigger the createFlashcard() function.

JavaScript

import React, { useState } from 'react';

function FlashcardForm() {
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call createFlashcard() here
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={term} onChange={e => setTerm(e.target.value)} placeholder="Term" />
      <input value={definition} onChange={e => setDefinition(e.target.value)} placeholder="Definition" />
      <button type="submit">Add Flashcard</button>
    </form>
  );
}

export default FlashcardForm;
6. src/components/FlashcardList.jsx
This component will be responsible for fetching and displaying a list of flashcards.

JavaScript

import React, { useEffect, useState } from 'react';
import Flashcard from './Flashcard';

function FlashcardList() {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    // Call scanFlashcards() from dynamo.js
  }, []);

  return (
    <div>
      {flashcards.map(card => (
        <Flashcard key={card.id} {...card} />
      ))}
    </div>
  );
}

export default FlashcardList;
7. src/components/Flashcard.jsx
This component renders a single flashcard visually.

JavaScript

import React from 'react';

function Flashcard({ term, definition }) {
  return (
    <div className="flashcard">
      <h3>{term}</h3>
      <p>{definition}</p>
    </div>
  );
}

export default Flashcard;
8. Project Folder Structure
After completing the above steps, your src/ folder should look like this:

src/
├── index.js
├── App.jsx
├── App.scss
├── dynamo.js
├── components/
│   ├── FlashcardList.jsx
│   ├── FlashcardForm.jsx
│   └── Flashcard.jsx
└── __tests__/
    └── dynamo.test.js
9. src/ Structure Overview
Here's a breakdown of the purpose of each file and folder within src/:

File / Folder

Purpose

App.jsx

Main React component, imports form and list.

index.js

Renders <App /> into the DOM.

App.scss

Sass styling for layout and responsiveness.

dynamo.js

All DynamoDB CRUD functions (create, read, update, delete).

components/

Holds your split-out UI logic for reusability.

__tests__/

Holds Jest test files (e.g., dynamo.test.js).


Export to Sheets
10. components/ Folder Overview
These components handle specific UI logic for better organization and reusability:

Component

Role

FlashcardForm.jsx

UI form to add new flashcards, uses state & triggers createFlashcard().

FlashcardList.jsx

Fetches and maps list of flashcards, displays multiple Flashcard components.

Flashcard.jsx

Renders a single flashcard visually.


Export to Sheets
11. Next Steps
Now that the basic structure is in place, let's integrate with DynamoDB and refine the application.

Wire up DynamoDB logic in dynamo.js.

Connect form submission to createFlashcard().

Map data in FlashcardList.jsx with .map().

Style your components in App.scss.

Add responsive tweaks and Chakra (if desired).

Write async tests for Dynamo functions.

Part 1: Implement createFlashcard() in dynamo.js
This section sets up the AWS SDK client and defines the createFlashcard function to save data to DynamoDB.

JavaScript

import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({
  region: process.env.REACT_APP_AWS_REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  },
});

const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = 'FlashcardLearner'; // Make sure this matches your DynamoDB table

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
Part 2: Wire Up handleSubmit in FlashcardForm.jsx
Open src/components/FlashcardForm.jsx. Here's an updated version with createFlashcard connected and basic input validation.

JavaScript

import React, { useState } from 'react';
import { createFlashcard } from '../dynamo';
import { v4 as uuidv4 } from 'uuid';

function FlashcardForm() {
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [tag, setTag] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!term.trim() || !definition.trim()) {
      alert("Term and definition are required.");
      return;
    }

    const newFlashcard = {
      id: uuidv4(),
      term: term.trim(),
      definition: definition.trim(),
      tag: tag.trim() || 'general',
    };

    try {
      await createFlashcard(newFlashcard);
      setTerm('');
      setDefinition('');
      setTag('');
      alert("Flashcard added!");
    } catch (error) {
      console.error("Failed to save flashcard:", error);
      alert("Error saving flashcard. See console for details.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flashcard-form">
      <input
        type="text"
        value={term}
        onChange={e => setTerm(e.target.value)}
        placeholder="Term"
      />
      <input
        type="text"
        value={definition}
        onChange={e => setDefinition(e.target.value)}
        placeholder="Definition"
      />
      <input
        type="text"
        value={tag}
        onChange={e => setTag(e.target.value)}
        placeholder="Tag (e.g. JavaScript)"
      />
      <button type="submit">Add Flashcard</button>
    </form>
  );
}

export default FlashcardForm;
Final Launch Steps
Once everything's wired together, you can run your application.

1. Run Dev Mode
If you're still editing and testing interactively:

Bash

npm start
This opens your app at [http://localhost:3000].

2. Build for Production
To make sure everything compiles cleanly for deployment:

Bash

npm run build
This will output your production-ready bundle in the /dist folder (if you're using manual Webpack) or /build (if using Create React App). You can serve it locally with:

Bash

npm install -g serve
serve -s dist
Alternatively, you might combine the build and start steps for convenience:

Bash

npm run build && npm start
Note: If you're using a manual Webpack setup, make sure your package.json scripts are configured correctly. For example:

JSON

"scripts": {
  "start": "webpack serve --open",
  "build": "webpack --mode production"
}
