"use client";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const StudentDashboard = ({name,email}) => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-6xl bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 mt-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <img
              src="/default-profile.jpg" // Use a default profile image or replace with a real one
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
            {"student"}
          </p>
        </div>

        {/* Dashboard Options */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              View Result
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Check your academic grades and performance.
            </p>
            <button
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
              onClick={() => router.push("/student/result")}
            >
              View Result
            </button>
          </div>

          {/* <div className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Access Course Materials
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Download and view your course materials and assignments.
            </p>
            <button
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
              onClick={() => router.push("/student/materials")}
            >
              Access Materials
            </button>
          </div> */}

          <div className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              View Schedule
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Check your class schedule and upcoming events.
            </p>
            <button
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
              onClick={() => router.push("/student/schedule")}
            >
              View Schedule
            </button>
          </div>

          {/* <div className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Update Profile
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Update your personal information and settings.
            </p>
            <button
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
              onClick={() => router.push("/student/profile")}
            >
              Update Profile
            </button>
          </div> */}

          {/* <div className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Contact Support
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Reach out for any issues or help with your studies.
            </p>
            <button
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
              onClick={() => router.push("/student/support")}
            >
              Contact Support
            </button>
          </div> */}

          <div className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Logout
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Sign out of your account.
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

export default StudentDashboard;
