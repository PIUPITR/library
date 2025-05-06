import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book Library",
  description: "A simple book library application",
  keywords: "books, library, nextjs, react, mongodb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link
              href="/"
              className="text-lg font-bold text-white no-underline"
            >
              Library
            </Link>
            <ul className="flex space-x-4 list-none p-0 m-0">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white no-underline"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/books"
                  className="text-gray-300 hover:text-white no-underline"
                >
                  Books
                </Link>
              </li>
              <li>
                <Link
                  href="/add-book"
                  className="text-gray-300 hover:text-white no-underline"
                >
                  Add Book
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white no-underline"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <main className="container mx-auto p-4 mt-4">{children}</main>
        <footer className="text-center p-4 mt-8 text-gray-600 border-t border-gray-200">
          © {new Date().getFullYear()} Book Library
        </footer>
      </body>
    </html>
  );
}
