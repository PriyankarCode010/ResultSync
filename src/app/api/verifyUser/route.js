// app/api/verifyUser/route.js
import { connectMongoDB } from "../../../lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    await connectMongoDB();

    // Parse the request body to get user ID and verified status
    const { _id, verified } = await req.json();

    // Validate the inputs
    if (!_id || typeof verified !== 'boolean') {
      return NextResponse.json({ message: 'Invalid request data' }, { status: 400 });
    }

    // Find the user by ID and update the verified status
    const user = await User.findByIdAndUpdate(
      _id,
      { verified: verified },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Respond with the updated user data
    return NextResponse.json({
      message: 'User verification status updated successfully',
      user,
    });
  } catch (error) {
    console.error('Error updating user verification status:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
