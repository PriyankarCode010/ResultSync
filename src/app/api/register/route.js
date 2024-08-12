import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/user"; // Import the User model

export async function POST(req) {
  try {
    const { name, uucms, email, password, gender, caste, role } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();

    const userData = { name, email, password: hashedPassword, gender, role };

    if (role === "student") {
      // Include additional fields specific to students
      userData.uucms = uucms;
      userData.caste = caste;
    }

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
