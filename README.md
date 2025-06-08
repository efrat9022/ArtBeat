# ArtBeat – Digital Art Gallery

Final project for the React 2025 course: a full-featured digital art gallery with user authentication, product browsing, filtering, admin management, reviews, and shopping cart functionality.

## Project Highlights
- User login and registration with Formik + Yup validation
- Admin panel to add/delete artworks
- Filter artworks by name, category, and price (server-side filtering)
- Shopping cart built with Redux (client-side only)
- Reviews section (users can add/delete their own reviews)
- Toast notifications for actions using Redux state
- Dynamic routing including parameters and nested routes
- Lazy loading, useMemo usage, and custom hooks

## Tech Stack
- React + TypeScript  
- React Router DOM  
- Redux Toolkit + React-Redux  
- Formik + Yup  
- Axios  
- SCSS  
- json-server  
- Bootstrap / MUI  

## Folder Structure
/src  
  /components  
  /pages  
  /redux  
  /hooks  

/server  
  db.json  

## Installation & Run Instructions

1. Clone the repository:
   git clone https://github.com/efrat9022/ArtBeat.git  
   cd ArtBeat

2. Install dependencies:
   npm install

3. Start the frontend:
   npm start

4. In a separate terminal, start the backend (json-server):
   npx json-server --watch server/db.json --port 4000

## Notes
- Admins can manage products (add/delete).
- Filtering is performed via API queries, not on the client.
- Global state includes user info, cart contents, and message state.
- Toast messages appear for success/failure and disappear automatically.

## Developed by
Efrat Weis – Final Project for React Course 2025
