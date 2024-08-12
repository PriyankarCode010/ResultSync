// /pages/api/deleteUser.js
import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/user"; // Import the User model

export async function DELETE(req) {
  try {
    // Parse the request to get the user identifier (e.g., _id)
    const { _id } = await req.json(); // Expecting _id in the request body

    // Connect to MongoDB
    await connectMongoDB();

    // Delete the user by _id
    const result = await User.deleteOne({ _id });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "User deletion failed", error: err.message },
      { status: 500 }
    );
  }
}
