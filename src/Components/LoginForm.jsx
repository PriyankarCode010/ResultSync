"use client";
import { useState } from 'react';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { signIn } from 'next-auth/react';

const authenticateUser = async (email) => {
  try{

    const resUserExists = await fetch("api/userExists",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email})
    });
    const {user} = await resUserExists.json();
    return(user);

  }catch(err){
    console.log(err);
  }
};
export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials",{
        email,
        password,
        redirect:false
      });
      if(res.error){
        setError("Invalid credentials")
        return;
      }
      const user = await authenticateUser(email);

      if (user) {
        if (user.role === 'admin') router.push('/admin');
        else if (user.role === 'teacher') router.push('/teacher');
        else if (user.role === 'student' || "undefined" ) router.push('/student');
      } else {
        setError('role is not defined');
      }
    } catch (error) {

      console.error('Login error:', error);
      setError('An error occurred while logging in');
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-screen dark:bg-gray-900 select-none">
      <div className="w-full sm:w-96 drop-shadow-2xl p-5 rounded-lg border-t-4 bg-gray-100 border-green-600 dark:bg-gray-700">
        <div className='flex flex-row justify-between mb-4'>
          <div className="text-3xl font-bold">Login</div>
          <div className='text-2xl p-2 bg-gray-200 rounded-full dark:text-black'><ThemeToggle/></div>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white rounded-md px-4 py-2 focus:outline-none hover:bg-gray-200 active:bg-gray-200 dark:text-white dark:bg-gray-600 dark:placeholder:text-white dark:hover:bg-gray-500"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white rounded-md px-4 py-2 focus:outline-none hover:bg-gray-200 active:bg-gray-200 dark:text-white dark:bg-gray-600 dark:placeholder:text-white dark:hover:bg-gray-500"
          />
          <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 ">Login</button>
          {error && <div className="bg-red-600 text-white px-2 py-1 rounded-lg w-fit">{error}</div>}
          <div className='text-sm text-right'>Don &apos; t have an account? <Link href="/register"><span className='hover:text-blue-700 hover:underline'>Register</span></Link></div>
        </form>
      </div>
    </div>
  );
}
