"use client";

import { db } from '@/utils/dbConfig';
import { Students, Sem1 } from '@/utils/schema';
import { eq, getTableColumns } from 'drizzle-orm';
import React, { useState } from 'react';
import NivoPieChart from '@/components/NivoPieChart';
import NivoBarChartReport from '@/components/NivoBarChartReport'; // Import BarChart component

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
  const subjects = ['sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6', 'sub7', 'sub8', 'lab1', 'lab2'];
  return subjects.some(subject => student[subject] < 40);
};

// Function to prepare pie chart data for each subject and overall rank classification for the bar chart
const prepareSubjectAndOverallData = (data) => {
  if (!data || data.length === 0) return { subjectPieData: {}, overallBarDataByCaste: {} };

  const subjects = ['sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6', 'sub7', 'sub8', 'lab1', 'lab2'];
  const subjectPieData = {};
  const overallClassificationCountsByCaste = {
    general: { Distinction: 0, 'First Class': 0, 'Second Class': 0, 'Pass Class': 0, Failed: 0 },
    obc: { Distinction: 0, 'First Class': 0, 'Second Class': 0, 'Pass Class': 0, Failed: 0 },
    sc: { Distinction: 0, 'First Class': 0, 'Second Class': 0, 'Pass Class': 0, Failed: 0 },
    st: { Distinction: 0, 'First Class': 0, 'Second Class': 0, 'Pass Class': 0, Failed: 0 }
  };

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

  // Prepare data for the overall rank classification bar chart by caste
  data.forEach(student => {
    const totalMarks = subjects.reduce((acc, subject) => acc + (student[subject] || 0), 0);
    const isFail = checkIfFailed(student);
    const classification = classifyTotalMarks(totalMarks, isFail);
    const caste = student.caste || 'General'; // Default to 'General' if caste is not specified
    
    // Ensure all classifications are included
    if (overallClassificationCountsByCaste[caste]) {
      overallClassificationCountsByCaste[caste][classification] += 1;
    }
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

  return { subjectPieData, overallBarDataByCaste };
};

export default function Result({params}) {
  const [data, setData] = useState(null);
  const [batch, setBatch] = useState(params.id);
  const [pieData, setPieData] = useState(null);
  const [barDataByCaste, setBarDataByCaste] = useState(null);
  const subjectNames = ["ENG", "HIN/KAN", "CPR", "CFN", "MAT", "P.CP", "PCF", "POA", "INC", "ECA"];
  
  const handleClick = async () => {
    try {
      const result = await db.select({
        ...getTableColumns(Students),
        ...getTableColumns(Sem1)
      })
      .from(Sem1)
      .leftJoin(Students, eq(Students.uucms, Sem1.uucms))
      .where(eq(Students.verified, true))
      .where(eq(Sem1.batch, batch))
      .execute();

      setData(result);
      console.log(result);
      const { subjectPieData, overallBarDataByCaste } = prepareSubjectAndOverallData(result);
      setPieData(subjectPieData);
      setBarDataByCaste(overallBarDataByCaste);
      console.log(subjectPieData, overallBarDataByCaste);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className='p-9'>
      <button onClick={handleClick}>
        Load Data
      </button>
      {pieData && Object.keys(pieData).length > 0 && (
        <div>
          <h3>Subject-wise Classification Pie Charts</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {Object.keys(pieData).map((subject, index) => (
              <div key={subject}>
                <h4>{subjectNames[index]}</h4>
                <NivoPieChart data={pieData[subject]} />
              </div>
            ))}
          </div>
        </div>
      )}
      {barDataByCaste && barDataByCaste.length > 0 && (
        <div>
          <h3>Rank Classification by Caste</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {barDataByCaste.map(({ caste, data }) => (
              <div key={caste}>
                <h4>{caste}</h4>
                <NivoBarChartReport data={data} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
