import mongoose, { Schema, Document, models, model } from "mongoose";
export interface IBook extends Document {
  title: string;
  author: string;
  description?: string;
  isbn?: string;
  publishedYear?: number; // Added publishedYear
  genre?: string; // Added genre
}

const BookSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for the book."],
      maxlength: [100, "Title cannot be more than 100 characters"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Please provide the author of the book."],
      maxlength: [100, "Author name cannot be more than 100 characters"],
      trim: true,
    },
    description: {
      type: String,
      maxlength: [500, "Description cannot be more than 500 characters"],
      trim: true,
    },
    isbn: {
      type: String,
      trim: true,
      maxlength: [20, "ISBN cannot be more than 20 characters"],
    },
    publishedYear: {
      type: Number,
    },
    genre: {
      type: String,
      trim: true,
      maxlength: [50, "Genre cannot be more than 50 characters"],
    },
  },
  {
    timestamps: true,
  }
);

export default models.Book || model<IBook>("Book", BookSchema);
