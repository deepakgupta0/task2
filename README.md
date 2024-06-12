# Invoice Tool

This project is an Invoice Management Tool built using React and Tailwind CSS. It allows users to list, import, and manually add invoices.

## Table of Contents

- [Features](#features)
- [Routes](#routes)
- [Technology Used](#technology-used)
- [Architecture Pattern](#architecture-pattern)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

## Features

- List invoices
- Import invoices via Excel
- Manually add invoices
- Fallback 404 Page
- User-friendly toast messages

## Routes

- `/` - List invoices
- `/import` - Import invoices
- `/create` - Manually add invoice
- `*` - Fallback 404 Page

## Technology Used

- React
- Tailwind CSS
- React Toastify

## Architecture Pattern

- Provider Pattern Using Context API

## Key Features

1. **Code Splitting**: Implemented to keep bundle size minimal and load time faster.
2. **Configurable Fields**: Followed industry standards for creating filters and forms by keeping all fields configurable via a constants file.
3. **Global Store**: Created a global store and passed it to all children using Context API.
4. **State Management**: Decoupled state update logic into a Provider component using the `useReducer` hook.
5. **Fallback 404 Page**: Added a creative 404 page for undefined routes.
6. **User-friendly Toast Messages**: Implemented using React Toastify.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
