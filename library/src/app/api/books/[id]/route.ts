import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Book, { IBook } from "@/models/Book";
import mongoose from "mongoose";

interface Params {
  id: string;
}

// Helper function to validate ObjectId
function isValidObjectId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { id } = await params;

  if (!isValidObjectId(id)) {
    return NextResponse.json(
      { success: false, message: "Invalid Book ID format" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    const book = await Book.findById(id);
    if (!book) {
      return NextResponse.json(
        { success: false, message: "Book not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: book }, { status: 200 });
  } catch (error: any) {
    console.error(`API GET /api/books/${id} Error:`, error);
    return NextResponse.json(
      { success: false, message: error.message || "Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { id } = await params;

  if (!isValidObjectId(id)) {
    return NextResponse.json(
      { success: false, message: "Invalid Book ID format" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    const body = await request.json();
    const book = await Book.findByIdAndUpdate(id, body, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators on update
    });
    if (!book) {
      return NextResponse.json(
        { success: false, message: "Book not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: book }, { status: 200 });
  } catch (error: any) {
    console.error(`API PUT /api/books/${id} Error:`, error);
    if (error.name === "ValidationError") {
      return NextResponse.json(
        { success: false, message: "Validation Error", errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: error.message || "Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { id } = await params;

  if (!isValidObjectId(id)) {
    return NextResponse.json(
      { success: false, message: "Invalid Book ID format" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    const deletedBook = await Book.deleteOne({ _id: id });
    if (deletedBook.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Book not found" },
        { status: 404 }
      );
    }
    // Return 204 No Content or 200 OK with success message
    // return new NextResponse(null, { status: 204 });
    return NextResponse.json(
      { success: true, message: "Book deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(`API DELETE /api/books/${id} Error:`, error);
    return NextResponse.json(
      { success: false, message: error.message || "Server Error" },
      { status: 500 }
    );
  }
}
