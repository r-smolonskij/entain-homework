# Entain Homework

React app for browsing movies and viewing details, built with Create React App and Redux Toolkit.

## Features
- Movie list with pagination
- Movie details view with gallery and modal
- Loading and error states

Note: The UI shows 20 movies per page (TMDB API default). The task spec asked for 10, but TMDB does not support offset-based pagination, so limiting to 10 would desync total pages.

## Tech Stack
- React, React Router
- Redux Toolkit
- TypeScript
- Sass

## Getting Started
Install dependencies:
```
npm install
```

Start the app:
```
npm start
```

The app runs at `http://localhost:3000`.

## Live Preview
You can preview the app at `https://entain-homework.vercel.app/`.

## API Configuration
The UI expects the API at `http://localhost:3001/api`.

You can override it with an env var:
```
REACT_APP_API_BASE_URL=http://localhost:3001/api
```

## Scripts
- `npm start` - run the dev server
- `npm test` - run tests in watch mode
- `npm run build` - create a production build

## Tests
Unit tests live next to the code under `src/` and can be run with:
```
npm test
```
