import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/user";

export async function POST(req) {
  try {
    const { name, uucms, email, password, gender, caste, role } = await req.json();

    // Basic validation
    if (!name || !email || !password || !gender || !role) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    await connectMongoDB();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare user data
    const userData = { name, email, password: hashedPassword, gender, role };

    // Add conditional fields based on role
    if (role === "student") {
      if (!uucms) {
        return NextResponse.json({ message: "UUCMS is required for students" }, { status: 400 });
      }
      userData.uucms = uucms;
      userData.caste = caste;
    } else if (role === "teacher") {
      userData.uucms = email; // Assign email as UUCMS for teachers
    }

    // Create the user in the database
    await User.create(userData);

    return NextResponse.json({ message: "User registered" }, { status: 201 });

  } catch (err) {
    console.error("Error during user registration:", err);
    return NextResponse.json(
      { message: "User registration failed", error: err.message },
      { status: 500 }
    );
  }
}
