import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, feedback } = body;

    // Basic validation
    if (!feedback || typeof feedback !== "string" || feedback.trim() === "") {
      return NextResponse.json(
        { success: false, message: "Feedback message is required." },
        { status: 400 }
      );
    }
    if (email && (typeof email !== "string" || !email.includes("@"))) {
      return NextResponse.json(
        { success: false, message: "Invalid email format." },
        { status: 400 }
      );
    }

    // In a real application, you would save this data to a database,
    // send an email, or integrate with a CRM/support tool.
    console.log("Feedback Received:");
    console.log("Name:", name || "Not provided");
    console.log("Email:", email || "Not provided");
    console.log("Feedback:", feedback);

    // Simulate successful processing
    return NextResponse.json(
      { success: true, message: "Feedback received successfully!" },
      { status: 201 } // 201 Created (or 200 OK)
    );
  } catch (error: any) {
    console.error("API Feedback POST Error:", error);
    if (error instanceof SyntaxError) {
      // Handle JSON parsing errors
      return NextResponse.json(
        { success: false, message: "Invalid request format." },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Server Error: Could not process feedback.",
      },
      { status: 500 }
    );
  }
}
