## Plan for Book Selling Website Development

### Overview
This plan outlines the steps required to develop a book selling website using Next.js, TypeScript, SQLite, and Prisma. The website will feature an attractive frontend for customers and an admin panel for managing books. The implementation will include a database schema, UI components, and necessary API routes.

### Step-by-Step Outline

#### 1. Database Setup
- **File:** `prisma/schema.prisma`
  - Define the database schema for books with the following fields:
    - `id`: Int, @id, @default(autoincrement())
    - `title`: String
    - `author`: String
    - `genre`: String
    - `publisher`: String
    - `price`: Float
    - `stock`: Int
    - `image1`: String (URL for the first image)
    - `image2`: String (URL for the second image)
  - Run `npx prisma migrate dev --name init` to create the initial migration.

#### 2. Prisma Client Setup
- **File:** `src/lib/prisma.ts`
  - Import and instantiate Prisma Client.
  - Export the Prisma Client instance for use in API routes.

#### 3. API Routes for CRUD Operations
- **Files:** Create the following API routes in `src/app/api/books/`
  - **GET** `/api/books`: Fetch all books.
  - **POST** `/api/books`: Add a new book.
  - **DELETE** `/api/books/[id]`: Delete a book by ID.
  - **PUT** `/api/books/[id]`: Update a book's details.

  Each route will handle the respective database operations using Prisma Client.

#### 4. Frontend Pages
- **File:** `src/app/page.tsx`
  - Create a homepage that displays all books with:
    - Book title
    - Author
    - Price
    - Availability status (available or sold out)
    - Two images for each book
    - A search bar and filter options for genres

- **File:** `src/app/admin.tsx`
  - Create an admin page for adding and deleting books:
    - Form fields for title, author, genre, publisher, price, stock, and image URLs.
    - A button to submit the form to add a new book.
    - A list of existing books with delete buttons.

#### 5. UI Components
- **Files:** Create reusable UI components in `src/components/ui/`
  - **BookCard.tsx**: Display individual book details.
  - **BookForm.tsx**: Form for adding/editing books.
  - **SearchBar.tsx**: Component for searching books.
  - **FilterMenu.tsx**: Component for filtering books by genre.

#### 6. Styling
- **File:** `src/app/globals.css`
  - Use Tailwind CSS for styling the components.
  - Ensure a modern and responsive design.

#### 7. Error Handling
- Implement error handling in API routes to return appropriate HTTP status codes and messages.
- Use try-catch blocks in async functions to handle potential errors.

#### 8. Testing
- **Files:** Create test files in the same directory as components (e.g., `BookCard.test.tsx`).
  - Use Jest and React Testing Library to test rendering and interactions.

### UI/UX Considerations
- Ensure the homepage is visually appealing with a grid layout for books.
- Use clear typography and spacing for readability.
- Provide feedback on actions (e.g., book added, deleted) using toast notifications.

### Summary
- Set up a SQLite database with Prisma for book management.
- Create API routes for CRUD operations on books.
- Develop a customer-facing homepage and an admin page for book management.
- Implement reusable UI components styled with Tailwind CSS.
- Ensure error handling and testing are in place for reliability.

This plan provides a comprehensive approach to developing the book selling website, ensuring all necessary components and functionalities are covered.
