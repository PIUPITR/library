import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Book from "@/models/Book";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const books = await Book.find({}); // Find all books
    return NextResponse.json({ success: true, data: books }, { status: 200 });
  } catch (error: any) {
    console.error("API GET Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    console.log("Received book data:", body);
    const book = await Book.create(body); // Create new book
    console.log("Book created successfully:", book);
    return NextResponse.json({ success: true, data: book }, { status: 201 }); // 201 Created
  } catch (error: any) {
    console.error("API POST Error:", error);
    // Handle validation errors specifically if needed
    if (error.name === "ValidationError") {
      return NextResponse.json(
        { success: false, message: "Validation Error", errors: error.errors },
        { status: 400 }
      ); // 400 Bad Request
    }
    // Handle potential duplicate key errors
    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "Duplicate Key Error",
          details: error.keyValue,
        },
        { status: 409 }
      ); // 409 Conflict
    }
    return NextResponse.json(
      { success: false, message: error.message || "Server Error" },
      { status: 500 }
    );
  }
}
