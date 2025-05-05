"use client"; // Make this a Client Component

import { useState, useEffect } from "react";
import Link from "next/link";
import { IBook } from "@/models/Book"; // Import the IBook interface

// Define the structure of the book data received from the API, including the _id
interface BookWithId extends IBook {
  _id: string;
  // Add createdAt and updatedAt if you need to display them
  createdAt?: string;
  updatedAt?: string;
  // Ensure new fields are potentially included from API
  publishedYear?: number;
  genre?: string;
}

export default function BooksPage() {
  const [books, setBooks] = useState<BookWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch books from the API
  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/books");
      if (!res.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await res.json();
      if (data.success) {
        setBooks(data.data);
      } else {
        throw new Error(data.message || "Failed to fetch books");
      }
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch books when the component mounts
  useEffect(() => {
    fetchBooks();
  }, []);

  // Handle deleting a book
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this book?")) {
      return;
    }
    try {
      const res = await fetch(`/api/books/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to delete book");
      }
      // Remove the deleted book from the local state
      setBooks(books.filter((book) => book._id !== id));
      alert("Book deleted successfully!");
    } catch (err: any) {
      setError(err.message);
      console.error(err);
      alert(`Error deleting book: ${err.message}`);
    }
  };

  if (loading) return <p>Loading books...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Book Collection</h1>
      {books.length === 0 ? (
        <p>
          No books found.{" "}
          <Link href="/add-book" className="text-indigo-600 hover:underline">
            Add one now!
          </Link>
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Author
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Year
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Genre
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {books.map((book) => (
                <tr key={book._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <Link
                      href={`/books/${book._id}`}
                      className="text-indigo-600 hover:underline"
                    >
                      {book.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {book.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {book.publishedYear || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {book.genre || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 max-w-xs truncate">
                    {book.description || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <Link
                      href={`/edit-book/${book._id}`}
                      className="text-indigo-600 hover:text-indigo-900 hover:underline"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="text-red-600 hover:text-red-900 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-6">
        <Link
          href="/add-book"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add New Book
        </Link>
      </div>
    </div>
  );
}
