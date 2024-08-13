"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { db } from '../utils/dbConfig';
import { eq, getTableColumns } from 'drizzle-orm';
import { Students } from '../utils/schema';

function ResultClient({ session }) {
  const [batch, setBatch] = useState('');
  const [sem, setSem] = useState('');
  const [data, setData] = useState(null);

  const getResult = async () => {
    try {
      let query = db.select({
        ...getTableColumns(Students),
      }).from(Students).where(eq(Students.batch, batch));

      if (sem) {
        query = query.where(eq(Students.sem, sem));
      }

      const result = await query.execute();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleVerify = async (student) => {
    try {
      await db.update(Students).set({ verified: true }).where(eq(Students.uucms, student.uucms)).execute();
      const updatedData = data.map((item) =>
        item.uucms === student.uucms ? { ...item, verified: true } : item
      );
      setData(updatedData);
      alert('Student verified successfully');
    } catch (error) {
      console.error('Error verifying student:', error);
      alert('Failed to verify student');
    }
  };

  const handleDelete = async (student) => {
    try {
      await db.delete(Students).where(eq(Students.uucms, student.uucms)).execute();
      const updatedData = data.filter((item) => item.uucms !== student.uucms);
      setData(updatedData);
      alert('Student deleted successfully');
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Failed to delete student');
    }
  };

  const handlePromote = async (student) => {
    try {
      const newSemester = (parseInt(student.sem) + 1).toString();
      await db.update(Students).set({ sem: newSemester }).where(eq(Students.uucms, student.uucms)).execute();
      const updatedData = data.map((item) =>
        item.uucms === student.uucms ? { ...item, sem: newSemester } : item
      );
      setData(updatedData);
      alert('Student promoted successfully');
    } catch (error) {
      console.error('Error promoting student:', error);
      alert('Failed to promote student');
    }
  };

  if (!session?.user?.verified) {
    return <div className='flex justify-center items-center'>You are not authorized to view this page. Please verify your account.</div>;
  }

  return (
    <div className='p-4'>
      <div>
        <h2 className='text-2xl md:text-3xl'>Student Results</h2>
        <div className='p-5 flex flex-wrap gap-4 md:gap-6'>
          <select
            onChange={(e) => setBatch(e.target.value)}
            value={batch}
            className="w-full md:w-auto bg-white rounded-md px-4 py-2 focus:outline-none hover:bg-gray-200 dark:text-white dark:bg-gray-600 dark:placeholder:text-white dark:hover:bg-gray-500"
          >
            <option value="">Batch</option>
            <option value="21">2021</option>
            <option value="22">2022</option>
            <option value="23">2023</option>
            <option value="24">2024</option>
          </select>

          <select
            onChange={(e) => setSem(e.target.value)}
            value={sem}
            className="w-full md:w-auto bg-white rounded-md px-4 py-2 focus:outline-none hover:bg-gray-200 dark:text-white dark:bg-gray-600 dark:placeholder:text-white dark:hover:bg-gray-500"
          >
            <option value="">Semester</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>

          <button onClick={getResult} className="w-full md:w-auto bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">
            Get Results
          </button>
        </div>

        {data && (
          <div className='overflow-x-auto'>
            <h3 className='text-xl md:text-2xl mt-4'>Results for Batch {batch}, Semester {sem || 'All'}</h3>
            <table className="table-auto w-full text-left mt-4">
              <thead>
                <tr>
                  <th className="px-2 md:px-4 py-2">Name</th>
                  <th className="px-2 md:px-4 py-2">UUCMS</th>
                  <th className="px-2 md:px-4 py-2">Gender</th>
                  <th className="px-2 md:px-4 py-2">Section</th>
                  <th className="px-2 md:px-4 py-2">Batch</th>
                  <th className="px-2 md:px-4 py-2">Semester</th>
                  <th className="px-2 md:px-4 py-2">Verified</th>
                  <th className="px-2 md:px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((student, index) => (
                  <tr key={index} className='hover:bg-gray-100 dark:hover:bg-gray-700'>
                    <td className="px-2 md:px-4 py-2">
                      <Link href={`/teacher/result/${student.uucms}`}>
                        {student.name}
                      </Link>
                    </td>
                    <td className="px-2 md:px-4 py-2">{student.uucms}</td>
                    <td className="px-2 md:px-4 py-2">{student.gender}</td>
                    <td className="px-2 md:px-4 py-2">{student.section}</td>
                    <td className="px-2 md:px-4 py-2">{student.batch}</td>
                    <td className="px-2 md:px-4 py-2">{student.sem}</td>
                    <td className="px-2 md:px-4 py-2">{student.verified ? 'Yes' : 'No'}</td>
                    <td className="px-2 md:px-4 py-2">
                      <div className="flex gap-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleVerify(student)}
                            disabled={student.verified}
                            className={`bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 ${student.verified ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            Verify
                          </button>
                          <button
                            onClick={() => handleDelete(student)}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                        <div>
                          <button
                            onClick={() => handlePromote(student)}
                            disabled={!student.verified}
                            className={`bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 ${!student.verified ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            Promote
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultClient;
