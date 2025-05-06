"use client";

import { useState, useEffect, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { IBook } from "@/models/Book";

export default function EditBookPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string | undefined; // Get ID from URL path

  const [book, setBook] = useState<Partial<IBook & { publishedYear?: number }>>(
    {
      title: "",
      author: "",
      description: "",
      isbn: "",
      publishedYear: undefined,
      genre: "",
    }
  );
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch book data when component mounts or ID changes
  useEffect(() => {
    if (!id) {
      setError("Book ID is missing.");
      setLoading(false);
      return;
    }

    const fetchBookData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/books/${id}`);
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.message || "Failed to fetch book data");
        }
        setBook({
          ...data.data,
          publishedYear: data.data.publishedYear ?? "", // Set to empty string if null/undefined for input
        }); // Populate state with fetched book data
      } catch (err: any) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, [id]); // Re-run effect if ID changes

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      // Convert year back to number if it's the year input, otherwise use value directly
      [name]: type === "number" ? (value ? Number(value) : "") : value,
    }));
  };

  // Handle form submission for updating the book
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) {
      setError("Cannot update book without an ID.");
      return;
    }
    setSubmitting(true);
    setError(null);

    // Prepare data, ensuring year is a number or undefined
    const updateData = {
      ...book,
      publishedYear: book.publishedYear
        ? Number(book.publishedYear)
        : undefined,
    };

    try {
      const res = await fetch(`/api/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData), // Send updated book data including new fields
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        let errorMessage = data.message || "Failed to update book";
        if (data.errors) {
          errorMessage +=
            ": " +
            Object.values(data.errors)
              .map((err: any) => err.message)
              .join(", ");
        }
        throw new Error(errorMessage);
      }

      // Success
      router.push(`/books?updated=1&id=${id}`); // Redirect back to the book list with update message
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading book details...</p>;
  if (error && !book.title)
    return <p className="text-red-500">Error: {error}</p>; // Show error prominently if loading failed

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Edit Book</h1>
      {error && !book.title && (
        <p className="text-red-500 mb-4">Error loading book data: {error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        {error && book.title && (
          <p className="text-red-500 text-sm mb-4">Error: {error}</p>
        )}

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={book.title || ""}
            onChange={handleChange}
            required
            className="custom-input"
          />
        </div>
        <div>
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700"
          >
            Author <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={book.author || ""}
            onChange={handleChange}
            required
            className="custom-input"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={book.description || ""}
            onChange={handleChange}
            className="custom-input"
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="isbn"
            className="block text-sm font-medium text-gray-700"
          >
            ISBN
          </label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={book.isbn || ""}
            onChange={handleChange}
            className="custom-input"
          />
        </div>

        <div>
          <label
            htmlFor="publishedYear"
            className="block text-sm font-medium text-gray-700"
          >
            Published Year
          </label>
          <input
            type="number"
            id="publishedYear"
            name="publishedYear"
            value={book.publishedYear || ""}
            onChange={handleChange}
            className="custom-input"
          />
        </div>

        <div>
          <label
            htmlFor="genre"
            className="block text-sm font-medium text-gray-700"
          >
            Genre
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={book.genre || ""}
            onChange={handleChange}
            className="custom-input"
          />
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={submitting || loading || !id}
            className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
              submitting || loading || !id
                ? "bg-indigo-300"
                : "bg-indigo-600 hover:bg-indigo-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 no-underline`}
          >
            {submitting ? "Updating..." : "Update Book"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 no-underline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
