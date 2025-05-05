# Book Library - Next.js Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It's a simple web application for managing a book collection, built as a university project.

## Features

- View a list of books
- View details for a specific book
- Add new books to the collection
- Update existing book details
- Delete books from the collection
- Uses MongoDB for data storage
- Styled with Tailwind CSS and Bootstrap

## Prerequisites

- [Node.js](https://nodejs.org/) (version 20.x or later recommended)
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/), or [bun](https://bun.sh/) (choose one package manager)
- A [MongoDB](https://www.mongodb.com/) database (e.g., a free cluster on MongoDB Atlas)

## Getting Started

Follow these steps to set up and run the project locally:

**1. Clone the Repository (if applicable)**

If you haven't already, clone the project repository to your local machine:

```bash
git clone <your-repository-url>
cd library
```

**2. Install Dependencies**

Navigate to the project directory in your terminal and install the required libraries using your preferred package manager:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

This command reads the `package.json` file and downloads all the necessary libraries listed under `dependencies` and `devDependencies`, such as Next.js, React, Mongoose, Bootstrap, Tailwind CSS, etc.

**3. Set Up Environment Variables**

You need to connect the application to your MongoDB database.

- Create a file named `.env.local` in the root directory of the project (`c:\Projects\library\library\.env.local`).
- Add your MongoDB connection string to this file. Replace `<username>`, `<password>`, and `<your-cluster-url>` with your actual MongoDB Atlas credentials and cluster details. Replace `libraryDB` if you chose a different database name.

  ```bash
  # c:\Projects\library\library\.env.local

  MONGODB_URI=mongodb+srv://<username>:<password>@<your-cluster-url>/libraryDB?retryWrites=true&w=majority
  ```

  **Important:** The `.env.local` file is included in `.gitignore` by default, so your sensitive credentials won't be committed to version control.

**4. Run the Development Server**

Start the Next.js development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

This command starts the application in development mode with hot-reloading enabled. It uses Turbopack for faster development builds (`--turbopack` flag in `package.json`).

**5. Open the Application**

Open [http://localhost:3000](http://localhost:3000) with your browser to see the running application.

You can start editing the pages by modifying files in the `src/app/` directory. The page auto-updates as you edit the files.

## Project Structure Highlights

- `src/app/`: Contains the application's pages and layouts (using Next.js App Router).
- `src/app/api/`: Contains the backend API route handlers.
- `src/lib/`: Utility functions, like the database connection (`dbConnect.ts`).
- `src/models/`: Mongoose data models (e.g., `Book.ts`).
- `public/`: Static assets like images.
- `tailwind.config.ts`: Configuration for Tailwind CSS.
- `postcss.config.mjs`: Configuration for PostCSS (used by Tailwind).
- `.env.local`: Environment variables (ignored by Git).
- `package.json`: Project dependencies and scripts.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Remember to configure the `MONGODB_URI` environment variable in your Vercel project settings.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
