"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../Components/ui/dialog";

const RenderTable = ({ data, onDelete, refreshpage }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = async (userId) => {
    try {
      const response = await fetch('/api/deleteUser', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: userId }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
        if (onDelete) onDelete(userId);
        setOpen(false); // Close the dialog
      } else {
        console.log(data.message || "Failed to delete user");
      }
    } catch (error) {
      console.log("An error occurred while deleting the user.");
    }
  };

  return (
    <table className="w-full bg-white shadow-md rounded my-6">
      <thead>
        <tr className="bg-gray-800 text-white dark:bg-gray-700">
          <td className="py-2 px-4">Name</td>
          <td className="py-2 px-4">Email</td>
          <td className="py-2 px-4">Gender</td>
          <td></td>
        </tr>
      </thead>
      <tbody className='text-black'>
        {data.map((item) => (
          <tr key={item._id} className="border-b border-gray-200">
            <td className="py-2 px-4"><Link href="#">{item.name}</Link></td>
            <td className="py-2 px-4">{item.email}</td>
            <td className="py-2 px-4">{item.gender}</td>
            <td className='flex gap-3 justify-end items-center px-4 py-2'>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <button className='px-2 py-1 bg-red-500 rounded-md text-white hover:bg-red-600 dark:text-black' onClick={() => setOpen(true)}>Delete</button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Do you want to delete this data?</DialogTitle>
                    <DialogDescription className="flex flex-col gap-5">
                      <p className='text-white'>Are you sure you want to delete {item.name}?</p>
                      <button 
                        className='px-2 py-1 bg-red-500 rounded-md text-white hover:bg-red-600 dark:text-black' 
                        onClick={() => {
                          handleDelete(item._id);
                          refreshpage();
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className='px-2 py-1 bg-gray-500 rounded-md text-white hover:bg-gray-600 dark:text-black'
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </button>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              {/* <button 
                className='px-2 py-1 bg-green-500 rounded-md text-white hover:bg-green-600 dark:text-black' 
                onClick={() => onDelete(item._id)}
              >
                Update
              </button> */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default RenderTable;
