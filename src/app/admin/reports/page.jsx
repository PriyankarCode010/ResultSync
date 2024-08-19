"use client";
import React, { useState } from 'react';
import Sem1Report from '../../../Components/Sem1Report';
import Sem2Report from '../../../Components/Sem2Report';
import Sem3Report from '../../../Components/Sem3Report';
import Sem4Report from '../../../Components/Sem4Report';
import Sem5Report from '../../../Components/Sem5Report';
import Sem6Report from '../../../Components/Sem6Report';

const ReportPage = () => {
  const [selectedBatch, setSelectedBatch] = useState("21");
  const [selectedSem, setSelectedSem] = useState("1");
  const [section, setSection] = useState("");

  const renderReport = () => {
    switch (selectedSem) {
      case '1':
        return <Sem1Report batch={selectedBatch} section={section} />;
      case '2':
        return <Sem2Report batch={selectedBatch} section={section} />;
      case '3':
        return <Sem3Report batch={selectedBatch} section={section} />;
      case '4':
        return <Sem4Report batch={selectedBatch} section={section} />;
      case '5':
        return <Sem5Report batch={selectedBatch} section={section} />;
      case '6':
        return <Sem6Report batch={selectedBatch} section={section} />;
      default:
        return <div>Please select a valid semester.</div>;
    }
  };

  return (
    <div className='p-9'>
      <div className='flex flex-col md:flex-row gap-5 mb-4'>
        <div className='mb-4'>
          <label htmlFor="batch" className='mr-2'>Select Batch:</label>
          <select
            id="batch"
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className='p-2 border rounded'
          >
            <option value="21">2021</option>
            <option value="22">2022</option>
            <option value="23">2023</option>
            <option value="24">2024</option>
          </select>
        </div>

        <div className='mb-4'>
          <label htmlFor="sem" className='mr-2'>Select Semester:</label>
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

        <div className='mb-4'>
          <label htmlFor="section" className='mr-2'>Select Section:</label>
          <select
            id="section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className='p-2 border rounded'
          >
            <option value="">ALL</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
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
