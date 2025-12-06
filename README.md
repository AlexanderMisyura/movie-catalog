# Movie Catalog

A Single Page Application for browsing movies based on OMDb API.

Live demo: [movie-catalog](https://alexandermisyura-movie-catalog.netlify.app)

## Features

- **React 19:** Utilizes the `use` api and `Suspense` for data fetching logic.
- **TypeScript:** Strict typing, Zod schemas for runtime API response validation.
- **Custom Pagination:** Implemented without third-party libraries.
- **Testing:** Using Vitest, React Testing Library and Mock Service Worker (MSW).
- **CSS Modules:** No UI frameworks used.
- **Quality Control:** ESLint, Stylelint, Prettier and Husky hooks (commitlint, lint-staged).

## Tech Stack

- **Core:** React 19, TypeScript, Vite, React Router v7
- **Styling:** CSS Modules
- **Quality Control:** Vitest, React Testing Library, ESLint, Stylelint, Husky
- **API:** OMDb API

## Decisions & Trade-offs

### API vs. Design Discrepancy (Pagination)

The provided design mockup suggests displaying **8 items per page**. However, the **OMDb API strictly returns 10 items per page** and does not support `limit` or `offset` parameters.

To ensure data consistency and avoid complex client-side caching/slicing, I decided to stick to the API's native pagination (10 items). This prioritizes application stability and network performance over perfect adherence to the item count in the mockup.

### React 19 & Data Fetching

Using external fetching and caching tools such as RTK Query or TanStack Query for this application would be redundant.
In addition, instead of using the "standard" `useEffect` method for fetching data, I used React `use` API and `Suspense` component.

## Workflow and Development Process

The project was managed using **GitHub Projects: [Movie Catalog](https://github.com/users/AlexanderMisyura/projects/2)**.

- Each feature was developed in a separate branch.
- Changes were merged via Pull Requests to maintain a clean history.

## Time Log

### Total Time Spent: ~ 23 hours

| Task Category | Time Spent | Notes |
| :--- | :--- | :--- |
| **Setup and Config** | ~1.5h | Vite, TS, linters, Husky |
| **Base structure** | ~2.5h | Routing, directory structure and core components |
| **API Logic** | ~3.5h | Zod schemas, fetching, error handling |
| **Core UI** | ~2h | Responsive Grid, card layout, header layout |
| **Search feature** | ~1.5h | Debounce, URL update and synchronization |
| **Pagination feature** | ~4h | Pages creation logic, pagination UI |
| **Testing** | ~5h | Msw and vitest setup, tests |
| **Refactoring and Polish** | ~3.5h | Improvements and code cleanup |

## Setting Up and Running the App

### Prerequisites

- **Node.js** (v24 or higher)
- **npm** (v11 or higher)

### Local Setup

- Make a fork of the [repository](https://github.com/AlexanderMisyura/movie-catalog).
- Clone the forked repository to your local machine.
- Install dependencies with `npm install`.
- Get the API key from [omdbapi.com](https://www.omdbapi.com/).
- Create a `.env` file and add the API key to it according to [`.env.example`](https://github.com/AlexanderMisyura/movie-catalog/blob/dev/.env.example).
- Start the dev server with `npm run dev`.
- Open your browser and navigate to `http://localhost:5173`.

### Running Tests

- Run tests with `npm run test`.
- Run coverage report with `npm run test:coverage`.
