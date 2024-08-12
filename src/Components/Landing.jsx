"use client";
import React from 'react';
import { useRouter } from 'next/navigation'; // Use `useRouter` from `next/navigation` for client-side navigation

const Landing = () => {
    const router = useRouter(); // Initialize useRouter

    const handleClick = () => {
        router.push('/login'); // Use router.push for client-side navigation
    };

    return (
        <div className="h-screen w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
            {/* Radial gradient for the container to give a faded look */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div className='flex flex-col'>
                <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
                    ResultSync
                </p>
                <button onClick={handleClick} className='bg-black px-4 py-2 dark:bg-blue-600 text-white text-2xl rounded-lg hover:bg-gray-800 dark:hover:bg-blue-800'>
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default Landing;
