// components/Sem6Report.js

"use client";

import { db } from '../utils/dbConfig';
import { Students, Sem6 } from '../utils/schema';
import { eq, getTableColumns } from 'drizzle-orm';
import React, { useState, useEffect } from 'react';
import NivoPieChart from '../Components/NivoPieChart';
import NivoBarChartReport from '../Components/NivoBarChartReport'; // Import BarChart component

// Function to classify marks into categories based on individual subject marks
const classifyMarks = (marks) => {
  if (marks >= 90) return 'Distinction';
  if (marks >= 80 && marks < 90) return 'First Class';
  if (marks >= 70 && marks < 80) return 'Second Class';
  if (marks >= 40 && marks < 70) return 'Pass Class';
  return 'Failed';
};

// Function to classify total marks into categories based on overall performance
const classifyTotalMarks = (totalMarks, isFail) => {
  if (isFail) return 'Failed';
  if (totalMarks >= 900) return 'Distinction';
  if (totalMarks >= 800 && totalMarks < 900) return 'First Class';
  if (totalMarks >= 700 && totalMarks < 800) return 'Second Class';
  if (totalMarks >= 400 && totalMarks < 700) return 'Pass Class';
  return 'Failed';
};

// Function to check if a student failed based on subject marks
const checkIfFailed = (student) => {
  const subjects = ['sub1', 'sub2', 'sub3', 'sub4', 'lab1', 'lab2'];
  return subjects.some(subject => student[subject] < 40);
};

// Function to classify gender
const classifyGender = (gender) => gender === 'M' ? 'Male' : 'Female';

// Function to prepare pie chart data for each subject, overall rank classification, and gender classification
const prepareSubjectOverallAndGenderData = (data) => {
  if (!data || data.length === 0) return { subjectPieData: {}, overallBarDataByCaste: {}, genderData: [], barGenderData: [] };

  const subjects = ['sub1', 'sub2', 'sub3', 'sub4', 'lab1', 'lab2'];
  const subjectPieData = {};
  const overallClassificationCountsByCaste = {
    general: { Distinction: 0, 'First Class': 0, 'Second Class': 0, 'Pass Class': 0, Failed: 0 },
    obc: { Distinction: 0, 'First Class': 0, 'Second Class': 0, 'Pass Class': 0, Failed: 0 },
    sc: { Distinction: 0, 'First Class': 0, 'Second Class': 0, 'Pass Class': 0, Failed: 0 },
    st: { Distinction: 0, 'First Class': 0, 'Second Class': 0, 'Pass Class': 0, Failed: 0 }
  };

  const genderCounts = { Male: 0, Female: 0 };

  subjects.forEach(subject => {
    const classifications = data.reduce((acc, student) => {
      const classification = classifyMarks(student[subject]);
      acc[classification] = (acc[classification] || 0) + 1;
      return acc;
    }, {});

    subjectPieData[subject.toUpperCase()] = Object.keys(classifications).map(key => ({
      id: key,
      label: key,
      value: classifications[key]
    }));
  });

  // Prepare data for the overall rank classification bar chart by caste and gender classification
  data.forEach(student => {
    const totalMarks = subjects.reduce((acc, subject) => acc + (student[subject] || 0), 0);
    const isFail = checkIfFailed(student);
    const classification = classifyTotalMarks(totalMarks, isFail);
    const caste = student.caste || 'general'; // Default to 'General' if caste is not specified
    const gender = classifyGender(student.gender);

    // Update overall classification by caste
    if (overallClassificationCountsByCaste[caste]) {
      overallClassificationCountsByCaste[caste][classification] += 1;
    }

    // Update gender counts
    genderCounts[gender] += 1;
  });

  const overallBarDataByCaste = Object.keys(overallClassificationCountsByCaste).map(caste => ({
    caste,
    data: [
      { classification: 'Distinction', count: overallClassificationCountsByCaste[caste].Distinction },
      { classification: 'First Class', count: overallClassificationCountsByCaste[caste]['First Class'] },
      { classification: 'Second Class', count: overallClassificationCountsByCaste[caste]['Second Class'] },
      { classification: 'Pass Class', count: overallClassificationCountsByCaste[caste]['Pass Class'] },
      { classification: 'Failed', count: overallClassificationCountsByCaste[caste].Failed }
    ]
  }));

  const genderData = [
    { id: 'Male', label: 'Male', value: genderCounts['Male'] || 0 },
    { id: 'Female', label: 'Female', value: genderCounts['Female'] || 0 }
  ];

  const barGenderData = [
    { classification: 'Male', count: genderCounts['Male'] || 0 },
    { classification: 'Female', count: genderCounts['Female'] || 0 }
  ];

  return { subjectPieData, overallBarDataByCaste, genderData, barGenderData };
};

export default function Sem6Report({ batch }) {
  const [data, setData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [barDataByCaste, setBarDataByCaste] = useState(null);
  const [genderData, setGenderData] = useState(null);
  const [barGenderData, setBarGenderData] = useState(null);
  const subjectNames = ["CC", "Web", "BI", "WCM" ,"Web Lab", "PROJ"];

  const fetchData = async () => {
    try {
      const result = await db.select({
        ...getTableColumns(Students),
        ...getTableColumns(Sem6)
      })
      .from(Sem6)
      .leftJoin(Students, eq(Students.uucms, Sem6.uucms))
      .where(eq(Students.verified, true))
      .where(eq(Sem6.batch, batch))
      .execute();

      setData(result);
      console.log(result);
      const { subjectPieData, overallBarDataByCaste, genderData, barGenderData } = prepareSubjectOverallAndGenderData(result);
      setPieData(subjectPieData);
      setBarDataByCaste(overallBarDataByCaste);
      setGenderData(genderData);
      setBarGenderData(barGenderData);
      console.log(subjectPieData, overallBarDataByCaste, genderData, barGenderData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when batch changes
  }, [batch]);

  return (
    <div className='p-9'>
      <h3 className='flex gap-5 text-3xl font-bold'>Batch :-  {batch}  {"        Semester :- 6"}</h3>
      {genderData && genderData.length > 0 && (
        <div className='mt-9'>
          <h3 className='text-2xl font-bold'>Gender Classification</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <NivoPieChart data={genderData} />
            </div>
            <div>
              <NivoBarChartReport data={barGenderData} />
            </div>
          </div>
        </div>
      )}
      {pieData && Object.keys(pieData).length > 0 && (
        <div className='mt-9'>
          <h3 className='text-2xl font-bold'>Subject-wise Classification</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {Object.keys(pieData).map((subject, index) => (
              <div key={subject}>
                <h4 className='text-xl font-bold pt-4'>{subjectNames[index]}</h4>
                <NivoPieChart data={pieData[subject]} />
              </div>
            ))}
          </div>
        </div>
      )}
      {barDataByCaste && barDataByCaste.length > 0 && (
        <div className='mt-9'>
          <h3 className='text-2xl font-bold'>Rank Classification by Caste</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {barDataByCaste.map(({ caste, data }) => (
              <div key={caste}>
                <h4 className='text-xl font-bold pt-4'>{caste.toUpperCase()}</h4>
                <NivoBarChartReport data={data} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
