import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { email, uucms } = await req.json();
    
    // Query for a user by email or uucms
    const user = await User.findOne({ $or: [{ email }, { uucms }] });

    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error occurred" }, { status: 500 });
  }
}
