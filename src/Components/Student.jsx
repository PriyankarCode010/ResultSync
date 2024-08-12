"use client";
import { useEffect, useState } from 'react';
import MainResultPage from '@/Components/MainResultPage';
import { db } from '@/utils/dbConfig';
import { Students } from '@/utils/schema';
import { eq } from 'drizzle-orm';

const Student = ({ name, uucmsId,role }) => {
  const [selectedSem, setSelectedSem] = useState("sem1");

  const handleSemChange = (e) => {
    setSelectedSem(e.target.value);
  };

  return (
    <div className='p-10'>
      <div className='flex items-center justify-between'>
        <h2 className='font-extrabold text-xl'>{name}</h2>
        <h2 className='font-extrabold text-xl'>{uucmsId}</h2>
        <div className="flex justify-end items-center">
          <label className="mr-2">Semester:</label>
          <select 
            value={selectedSem} 
            onChange={handleSemChange} 
            className="p-1 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="sem1">Semester 1</option>
            <option value="sem2">Semester 2</option>
            <option value="sem3">Semester 3</option>
            <option value="sem4">Semester 4</option>
            <option value="sem5">Semester 5</option>
            <option value="sem6">Semester 6</option>
          </select>
        </div>
      </div>
      <MainResultPage semester={selectedSem} id={uucmsId} role={role}/>
    </div>
  );
};

export default Student;
