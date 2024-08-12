"use client";
import React from 'react';
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { redirect, useRouter } from 'next/navigation';

export default function Signin() {
    const { data: session } = useSession();
    console.log(session);
    // if (!session) redirect("/login");

    return (
      <div className={`flex justify-center items-center h-screen w-auto  ${session?.user?.role=="admin"?"dark:bg-emerald-950":(session?.user?.role=="teacher"?"dark:bg-red-950":"dark:bg-gray-9 00")}`}>
        <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col gap-2 my-6 dark:bg-gray-700">
          <div>
            Name: <span className="font-bold">{session?.user?.name}</span>
          </div>
          <div>
            Email: <span className="font-bold">{session?.user?.email}</span>
          </div>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
          >
            Log Out
          </button>
        </div>
      </div>
    );
}
