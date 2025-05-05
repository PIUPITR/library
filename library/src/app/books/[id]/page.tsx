"use client"; // Required for hooks and react-bootstrap

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { IBook } from "@/models/Book";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner"; // For loading state
import Alert from "react-bootstrap/Alert"; // For error state

// Define the structure of the book data received from the API, including the _id
interface BookWithId extends IBook {
  _id: string;
  createdAt?: string; // Include timestamps if needed
  updatedAt?: string;
  // Ensure new fields are potentially included from API
  publishedYear?: number;
  genre?: string;
}

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string | undefined;

  const [book, setBook] = useState<BookWithId | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setBook(data.data);
      } catch (err: any) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, [id]);

  // Handle deleting a book (optional on detail page, or link to edit/delete elsewhere)
  const handleDelete = async () => {
    if (!id || !confirm("Are you sure you want to delete this book?")) {
      return;
    }
    try {
      const res = await fetch(`/api/books/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to delete book");
      }
      alert("Book deleted successfully!");
      router.push("/books"); // Redirect to book list after deletion
    } catch (err: any) {
      setError(err.message); // Show error on the detail page
      alert(`Error deleting book: ${err.message}`);
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "200px" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>;
  }

  if (!book) {
    return <Alert variant="warning">Book not found.</Alert>;
  }

  return (
    <div>
      {/* Using Tailwind for main heading */}
      <h1 className="text-3xl font-bold mb-4">Book Details</h1>

      {/* Using react-bootstrap Card for displaying book info */}
      <Card className="mb-4">
        <Card.Header as="h5">{book.title}</Card.Header>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
            By {book.author}
            {/* Display year if available */}
            {book.publishedYear && ` (${book.publishedYear})`}
          </Card.Subtitle>
          <Card.Text>
            <strong>Description:</strong> {book.description || "N/A"}
          </Card.Text>
          <Card.Text>
            <strong>ISBN:</strong> {book.isbn || "N/A"}
          </Card.Text>
          {/* Display Genre if available */}
          {book.genre && (
            <Card.Text>
              <strong>Genre:</strong> {book.genre}
            </Card.Text>
          )}
          {/* Optionally display timestamps */}
          {book.createdAt && (
            <Card.Text>
              <small className="text-muted">
                Added: {new Date(book.createdAt).toLocaleString()}
              </small>
            </Card.Text>
          )}
          {book.updatedAt && (
            <Card.Text>
              <small className="text-muted">
                Last Updated: {new Date(book.updatedAt).toLocaleString()}
              </small>
            </Card.Text>
          )}

          {/* Action Buttons using react-bootstrap */}
          <div className="d-flex gap-2 mt-3">
            <Link href={`/edit-book/${book._id}`} passHref legacyBehavior>
              <Button variant="primary">Edit Book</Button>
            </Link>
            <Button variant="danger" onClick={handleDelete}>
              Delete Book
            </Button>
            <Button variant="secondary" onClick={() => router.back()}>
              Go Back
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
