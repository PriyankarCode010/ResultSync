"use client";
import { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useRouter } from "next/navigation";
import db from "../utils/dbConfig";
import { Students } from '../utils/schema';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [uucms, setUucms] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [caste, setCaste] = useState("");
  const [section, setSection] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("student"); // Default to student role

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!name || !password || !email || !gender) {
      setError("Please fill in all required fields.");
      return;
    }

    if (role === "student" && (!uucms || !caste || !section)) {
      setError("Please fill in all required fields for students.");
      return;
    }

    try {
      // Check if user already exists based on role
      const resUserExists = await fetch("/api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ uucms: role === "student" ? uucms : "", email: role === "teacher" ? email : "" })
      });

      if (!resUserExists.ok) {
        throw new Error("Failed to check user existence.");
      }

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      // Register the user
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          uucms: role === "student" ? uucms : email,
          email,
          password,
          role,
          gender,
          caste: role === "student" ? caste : "",
          section: role === "student" ? section : ""
        })
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "User registration failed.");
      }

      // Insert student data into the database if the role is student
      if (role === "student") {
        await db.insert(Students).values({
          name,
          uucms,
          section,
          caste,
          gender,
        }).execute();
      }

      // Clear form on successful registration
      setName("");
      setEmail("");
      setUucms("");
      setPassword("");
      setGender("");
      setCaste("");
      setSection("");
      setRole("student");
      router.push("/login");
    } catch (err) {
      console.error("An error occurred:", err);
      setError(err.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-900 select-none">
      <div className="w-full sm:w-96 drop-shadow-2xl p-5 rounded-lg border-t-4 bg-gray-100 border-blue-600 dark:bg-gray-700">
        <div className='flex flex-row justify-between mb-4'>
          <div className="text-3xl font-bold">Register</div>
          <div className='text-2xl p-2 bg-gray-200 rounded-full'>
            <ThemeToggle />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="student"
                checked={role === "student"}
                onChange={(e) => setRole(e.target.value)}
                className="form-radio"
              />
              <span className="ml-2">Student</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="teacher"
                checked={role === "teacher"}
                onChange={(e) => setRole(e.target.value)}
                className="form-radio"
              />
              <span className="ml-2">Teacher</span>
            </label>
          </div>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Username"
            value={name}
            className="bg-white rounded-md px-4 py-2 focus:outline-none hover:bg-gray-200 dark:text-white dark:bg-gray-600 dark:placeholder:text-white dark:hover:bg-gray-500"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            value={email}
            className="bg-white rounded-md px-4 py-2 focus:outline-none hover:bg-gray-200 dark:text-white dark:bg-gray-600 dark:placeholder:text-white dark:hover:bg-gray-500"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            value={password}
            className="bg-white rounded-md px-4 py-2 focus:outline-none hover:bg-gray-200 dark:text-white dark:bg-gray-600 dark:placeholder:text-white dark:hover:bg-gray-500"
          />

          {role === "student" && (
            <>
              <input
                onChange={(e) => setUucms(e.target.value)}
                type="text"
                placeholder="UUCMS / ID"
                value={uucms}
                className="bg-white rounded-md px-4 py-2 focus:outline-none hover:bg-gray-200 dark:text-white dark:bg-gray-600 dark:placeholder:text-white dark:hover:bg-gray-500"
              />
              <select
                onChange={(e) => setSection(e.target.value)}
                value={section}
                className="bg-white rounded-md px-4 py-2 focus:outline-none hover:bg-gray-200 dark:text-white dark:bg-gray-600 dark:placeholder:text-white dark:hover:bg-gray-500"
              >
                <option value="">Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
              <select
                onChange={(e) => setCaste(e.target.value)}
                value={caste}
                className="bg-white rounded-md px-4 py-2 focus:outline-none hover:bg-gray-200 dark:text-white dark:bg-gray-600 dark:placeholder:text-white dark:hover:bg-gray-500"
              >
                <option value="">Caste</option>
                <option value="general">General</option>
                <option value="obc">OBC</option>
                <option value="sc">SC</option>
                <option value="st">ST</option>
              </select>
            </>
          )}
          
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="M"
                checked={gender === "M"}
                onChange={(e) => setGender(e.target.value)}
                className="form-radio"
              />
              <span className="ml-2">Male</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="F"
                checked={gender === "F"}
                onChange={(e) => setGender(e.target.value)}
                className="form-radio"
              />
              <span className="ml-2">Female</span>
            </label>
          </div>
          <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Register
          </button>
          {error && <div className="bg-red-600 text-white px-2 py-1 rounded-lg w-fit">{error}</div>}
          <div className='text-sm text-right'>
            Already have an account? <Link href="/login"><span className='hover:text-blue-700 hover:underline'>Login</span></Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
