import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css"; // Imports Tailwind base styles and any global CSS

export const metadata: Metadata = {
  title: "Book Library App",
  description: "Manage your book collection easily.",
  // Basic SEO attributes
  keywords: "books, library, collection, nextjs, react, tailwindcss",
  authors: [{ name: "Your Name/Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white flex flex-col min-h-screen">
        <header>
          <nav className="bg-gray-800 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
              <Link
                href="/"
                className="text-xl font-bold text-white no-underline hover:text-indigo-300 transition-colors"
              >
                Library
              </Link>
              <div className="space-x-4">
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white no-underline transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/books"
                  className="text-gray-300 hover:text-white no-underline transition-colors"
                >
                  Books
                </Link>
                <Link
                  href="/add-book"
                  className="text-gray-300 hover:text-white no-underline transition-colors"
                >
                  Add Book
                </Link>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white no-underline transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/contacts"
                  className="text-gray-300 hover:text-white no-underline transition-colors"
                >
                  Contacts
                </Link>
              </div>
            </div>
          </nav>
        </header>
        <main className="container mx-auto p-6 flex-grow">{children}</main>
        <footer className="bg-gray-800 text-center p-4 mt-auto">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Library
          </p>
        </footer>
      </body>
    </html>
  );
}
