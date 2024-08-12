"use client";
import RenderTable from '@/Components/RenderTable';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Page = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/users?role=teacher`);
      console.log('Response:', response.data);
      setData(response.data.users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="m-5 p-5 rounded-xl font-bold bg-gray-600 text-white dark:bg-slate-800">
      <div className='flex justify-between'>
        Teacher
      </div>
      <RenderTable data={data} refreshpage={()=>fetchData()}/>
    </div>
  );
};

export default Page;
