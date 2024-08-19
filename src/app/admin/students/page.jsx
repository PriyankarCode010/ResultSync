"use client";
import React, { useState } from 'react';
import Sem1Student from '../../../Components/Sem1Student';
import Sem2Student from '../../../Components/Sem2Student';
import Sem3Student from '../../../Components/Sem3Student';
import Sem4Student from '../../../Components/Sem4Student';
import Sem5Student from '../../../Components/Sem5Student';
import Sem6Student from '../../../Components/Sem6Student';

const ReportPage = () => {
  const [selectedBatch, setSelectedBatch] = useState("21");
  const [selectedSem, setSelectedSem] = useState("1");

  const renderReport = () => {
    switch (selectedSem) {
      case '1':
        return <Sem1Student batch={selectedBatch} />;
      case '2':
        return <Sem2Student batch={selectedBatch} />;
      case '3':
        return <Sem3Student batch={selectedBatch} />;
      case '4':
        return <Sem4Student batch={selectedBatch} />;
      case '5':
        return <Sem5Student batch={selectedBatch} />;
      case '6':
        return <Sem6Student batch={selectedBatch} />;
      default:
        return <div>Please select a valid semester.</div>;
    }
  };

  return (
    <div className='p-9'>
      <div className='flex gap-5'>
        <div className='mb-4'>
          <label htmlFor="batch" className='mr-2'>Select Batch:</label>
          <select
            id="batch"
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className='p-2 border rounded'
          >
            <option value="21">2021-22</option>
            <option value="22">2022-23</option>
            <option value="23">2023-24</option>
            <option value="24">2024-25</option>
          </select>
        </div>

        <div className='mb-4'>
          <label htmlFor="sem" className='mr-2'>Select Sem:</label>
          <select
            id="sem"
            value={selectedSem}
            onChange={(e) => setSelectedSem(e.target.value)}
            className='p-2 border rounded'
          >
            <option value="1">Sem 1</option>
            <option value="2">Sem 2</option>
            <option value="3">Sem 3</option>
            <option value="4">Sem 4</option>
            <option value="5">Sem 5</option>
            <option value="6">Sem 6</option>
          </select>
        </div>
      </div>
      <div>
        {renderReport()}
      </div>
    </div>
  );
};

export default ReportPage;
