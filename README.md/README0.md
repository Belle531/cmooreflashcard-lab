# CMooREFlashcard Lab

CMooREFlashcard Lab is a full-stack React learning application built to help users study and retain knowledge using dynamic flashcards. It integrates with AWS DynamoDB for real-time database storage, uses Chakra UI for responsive and accessible design, and demonstrates modern development practices like validation, styling, and testing.
Built as a Capstone project by Cassandra Moore, this app blends polished UI with practical backend integration — showcasing scalable architecture and a user-friendly experience.

## Live Preview (Optional)

Add deployment link here if hosted on Vercel, Netlify, or GitHub Pages.

### Tech Stack

- Frontend: React (CRA), Chakra UI, Sass
- Backend Integration: AWS SDK, DynamoDB, dotenv-webpack
- Styling: Chakra UI + SCSS
- Testing: Jest (planned)
- Build Tools: Webpack, Babel, Dotenv

#### Features

- Add custom flashcards with a term, definition, and tag
- View all saved flashcards in a responsive grid
- Input validation & feedback messages for better UX
- DynamoDB integration for cloud-based storage
- Real-time card counter display
- FAQ accordion for new users
- Toast notifications and loading indicators
- Automatic form reset after successful submission
- Upcoming: Filter flashcards by tag (e.g., frontend/backend)

Screenshots (Recommended)
Add screenshots here showing the UI, flashcard layout, form submission, and validation messages.

##### Setup Instructions

To run locally:
git clone [https://github.com/your-username/CMooreFlashcardLab.git]
cd CMooreFlashcardLab
npm install
npm start

###### Create a .env file in the root with

REACT_APP_AWS_REGION=your-region
REACT_APP_AWS_ACCESS_KEY_ID=your-access-key
REACT_APP_AWS_SECRET_ACCESS_KEY=your-secret-key

##### Make sure your DynamoDB table (CMooreFlashcardLab) is set up with at least these fields

- id: string
- term: string
- definition: string
- tag: string

### Future Enhancements

- Filter flashcards by tag (category selection)
- Mobile-first enhancements and animations with Framer Motion
- Jest test coverage for form and backend
- Deployment to Vercel or Netlify
- Expand FAQ and dynamic loading via backend

### Author

Built with by Cassandra Moore
Capstone Project – Software Development Track
[Portfolio Link] (optional)
[LinkedIn or Email] (optional)

### Setup Instructions // To run locally Bash

git clone [https://github.com/your-username/CMooreFlashcardLab.git]
cd CMooreFlashcardLab
npm install
npm start

### Create a .env file ;in the root with

REACT_APP_AWS_REGION=your-region
REACT_APP_AWS_ACCESS_KEY_ID=your-access-key
REACT_APP_AWS_SECRET_ACCESS_KEY=your-secret-key

Make sure your DynamoDB table (CMooreFlashcardLab) is set up with at least these fields

- id: string
- term: string
- definition: string
- tag: string
