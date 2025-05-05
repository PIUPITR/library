import mongoose, { Document, Schema, Model } from "mongoose";

// Interface for the Book document
export interface IBook extends Document {
  title: string;
  author: string;
  isbn?: string; // International Standard Book Number
  publishedYear?: number;
  genre?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Mongoose Schema for Book
const BookSchema: Schema<IBook> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for the book."],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    author: {
      type: String,
      required: [true, "Please provide the author's name."],
      trim: true,
      maxlength: [100, "Author name cannot be more than 100 characters"],
    },
    isbn: {
      type: String,
      trim: true,
      // Basic validation example (can be enhanced)
      // match: [/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/, 'Please add a valid ISBN']
    },
    publishedYear: {
      type: Number,
      // Basic validation example
      // min: [0, 'Published year cannot be negative'],
      // max: [new Date().getFullYear(), `Published year cannot be in the future`]
    },
    genre: {
      type: String,
      trim: true,
      maxlength: [50, "Genre cannot be more than 50 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
  },
  {
    // Add timestamps for createdAt and updatedAt
    timestamps: true,
  }
);

// Prevent mongoose from recompiling the model if it already exists
const Book: Model<IBook> =
  mongoose.models.Book || mongoose.model<IBook>("Book", BookSchema);

export default Book;
