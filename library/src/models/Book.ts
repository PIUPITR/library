import mongoose, { Schema, Document, models, model } from "mongoose";

// Interface representing a document in MongoDB.
export interface IBook extends Document {
  title: string;
  author: string;
  description?: string; // Optional description
  isbn?: string; // Optional ISBN
  // Add other fields like publicationYear, genre, etc. if needed
}

// Schema corresponding to the document interface.
const BookSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for the book."],
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    author: {
      type: String,
      required: [true, "Please provide the author of the book."],
      maxlength: [100, "Author name cannot be more than 100 characters"],
    },
    description: {
      type: String,
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    isbn: {
      type: String,
      unique: true, // Assuming ISBN should be unique if provided
      sparse: true, // Allow multiple null/undefined values for uniqueness
      maxlength: [20, "ISBN cannot be more than 20 characters"],
    },
    // Add other fields here
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Export the model, creating it if it doesn't exist yet.
export default models.Book || model<IBook>("Book", BookSchema);
