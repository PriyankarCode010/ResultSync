"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ProfileDashboard = ({name,email}) => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 dark:bg-emerald-950 p-4">
      <div className="w-full max-w-6xl bg-white dark:bg-emerald-900 rounded-lg shadow-lg p-6 mt-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <img
              src="./user.png" // Use a default profile image or replace with a real one
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-blue-600"
            />
            <div className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.232 5.232a4.5 4.5 0 00-6.364 6.364L12 15.75l3.232-3.232a4.5 4.5 0 000-6.364z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 6.5l1.25 1.25"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {name}
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">{email}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
            {"Admin"}
          </p>
        </div>

        {/* Dashboard Options */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Manage Teachers
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Add, update, or remove teachers from the system.
            </p>
            <button
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
              onClick={() => router.push("/admin/teachers")}
            >
              Manage
            </button>
          </div>

          <div className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Manage Students
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Add, update, or remove students from the system.
            </p>
            <button
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
              onClick={() => router.push("/admin/result")}
            >
              Manage
            </button>
          </div>

          <div className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              View Reports
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Access system reports and analytics.
            </p>
            <button
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
              onClick={() => router.push("/admin/reports")}
            >
              View Reports
            </button>
          </div>

          <div className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Logout
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Sign out of the system.
            </p>
            <button
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
