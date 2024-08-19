import React, { useEffect, useState } from 'react';
import { db } from '@/utils/dbConfig'; // Adjust the import according to your setup
import { Sem6, Students } from '@/utils/schema'; // Adjust the import according to your setup
import { eq, and } from 'drizzle-orm'; // Ensure 'and' is imported

const subjects = [
  { name: "CC", key: "sub1" },
  { name: "Web", key: "sub2" },
  { name: "BI", key: "sub3" },
  { name: "WCM", key: "sub4" },
  { name: "Web Lab", key: "lab1" },
  { name: "PROJ", key: "lab2" }
];

const Sem6Student = ({ batch }) => {
  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const students = await db
          .select({
            uucms: Sem6.uucms,
            name: Students.name,
            sub1: Sem6.sub1,
            sub2: Sem6.sub2,
            sub3: Sem6.sub3,
            sub4: Sem6.sub4,
            lab1: Sem6.lab1,
            lab2: Sem6.lab2,
          })
          .from(Sem6)
          .innerJoin(Students, and(eq(Sem6.uucms, Students.uucms), eq(Students.batch, batch))) // Filtering by batch
          .execute();
        console.log(students);

        // Filter students who scored 90 or above in any subject
        const filteredStudents = students.filter(student => {
          const marks = [
            parseInt(student.sub1, 10) || 0,
            parseInt(student.sub2, 10) || 0,
            parseInt(student.sub3, 10) || 0,
            parseInt(student.sub4, 10) || 0,
            parseInt(student.lab1, 10) || 0,
            parseInt(student.lab2, 10) || 0,
          ];

          // Return true if any subject mark is 90 or above
          return marks.some(mark => mark >= 90);
        });

        console.log(filteredStudents);
        setStudentsData(filteredStudents); // Set the filtered students data
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [batch]); // Added batch as a dependency

  return (
    <div className="container mx-auto p-4 text-white">
      <h1 className="text-2xl font-bold mb-4 text-center">{batch} Batch - 6th Sem Student Marks (90+)</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subjects.map((subject, index) => (
          <div key={index} className="overflow-x-auto bg-gray-800 shadow-md rounded-lg w-full">
            <h2 className="text-xl font-semibold p-4 bg-gray-700">{subject.name}</h2>
            <table className="min-w-full bg-gray-800">
              <thead>
                <tr className="bg-gray-700 text-gray-300">
                  <th className="w-1/3 text-left py-3 px-4">UUCMS ID</th>
                  <th className="w-1/3 text-left py-3 px-4">Name</th>
                  <th className="w-1/3 text-left py-3 px-4">Marks</th>
                </tr>
              </thead>
              <tbody>
                {studentsData
                  .filter(student => parseInt(student[subject.key], 10) >= 90)
                  .map((student, idx) => (
                    <tr key={idx} className="text-gray-300 hover:bg-gray-600">
                      <td className="border-t border-gray-700 text-left py-3 px-4">{student.uucms}</td>
                      <td className="border-t border-gray-700 text-left py-3 px-4">{student.name}</td>
                      <td className="border-t border-gray-700 text-left py-3 px-4">{student[subject.key]}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {studentsData.filter(student => parseInt(student[subject.key], 10) >= 90).length === 0 && (
              <p className="text-center text-gray-500 p-4">No students scored 90+ in {subject.name}.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sem6Student;
