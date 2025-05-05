"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AddBookPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publishedYear, setPublishedYear] = useState<number | string>("");
  const [genre, setGenre] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    // Trim ISBN and check if it's empty
    const trimmedIsbn = isbn.trim();
    if (!trimmedIsbn) {
      setError("ISBN is required and cannot be empty.");
      setSubmitting(false);
      return;
    }

    const bookData = {
      title: title.trim(),
      author: author.trim(),
      description: description.trim(),
      isbn: trimmedIsbn,
      genre: genre.trim(),
      publishedYear: publishedYear ? Number(publishedYear) : undefined,
    };

    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        let errorMessage = data.message || "Failed to add book";
        if (data.errors) {
          errorMessage +=
            ": " +
            Object.values(data.errors)
              .map((err: any) => err.message)
              .join(", ");
        }
        throw new Error(errorMessage);
      }

      alert("Book added successfully!");
      setTitle("");
      setAuthor("");
      setDescription("");
      setIsbn("");
      setPublishedYear("");
      setGenre("");
      router.push("/books");
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Add a New Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="isbn"
            className="block text-sm font-medium text-gray-700"
          >
            ISBN <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {error && <p className="text-red-500 text-sm">Error: {error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
            submitting ? "bg-indigo-300" : "bg-indigo-600 hover:bg-indigo-700"
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          {submitting ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
}
