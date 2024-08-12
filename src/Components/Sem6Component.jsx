"use client";
import { useState, useEffect } from 'react';
import { db } from '@/utils/dbConfig';
import { Sem6 } from '@/utils/schema';
import { Loader } from 'lucide-react';
import { eq } from 'drizzle-orm';
import NivoBarChart from "@/Components/NivoBarChart";

const Sem6Component = ({ uucmsId, role }) => {
  const [uucms, setUucms] = useState(uucmsId);
  const [batch, setBatch] = useState('');
  const [marks, setMarks] = useState({
    cc:0,
    web: 0,
    bi: 0,
    wcm:0,
    weblab: 0,
    proj: 0,
  });

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [newMark, setNewMark] = useState(0);

  const passingThreshold = 35;

  useEffect(() => {
    if (uucms) {
      const fetchData = async () => {
        try {
          const record = await db.select().from(Sem6).where(eq(Sem6.uucms, uucms)).execute();
          if (record.length > 0) {
            const data = record[0];
            setBatch(data.batch);
            setMarks({
              cc: data.sub1,
              web: data.sub2,
              bi: data.sub3,
              wcm:data.sub4,
              weblab: data.lab1,
              proj: data.lab2,
            });
          }
        } catch (error) {
          console.error('Error fetching data:', error.message);
        }
      };
      fetchData();
    }
  }, [uucms]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      console.log('Starting update...');
      
      const totalMarks = Object.values(marks).reduce((acc, mark) => acc + mark, 0);
      const percentage = (totalMarks / 750) * 100;
      const per = percentage.toFixed(2);
      const allPassed = Object.values(marks).every(mark => mark >= passingThreshold);
      const status = allPassed;

      const existingRecord = await db.select().from(Sem6).where(eq(Sem6.uucms, uucms)).execute();
      console.log('Existing Record:', existingRecord);
      
      if (existingRecord.length > 0) {
        console.log('Updating record...');
        await db.update(Sem6)
          .set({
            batch:uucms.slice(5,7),
            sub1: marks.cc,
            sub2: marks.web,
            sub3: marks.bi,
            sub4: marks.wcm,
            lab1: marks.weblab,
            lab2: marks.proj,
            total: totalMarks,
            per,
            status
          })
          .where(eq(Sem6.uucms, uucms))
          .execute();
        console.log('Record updated');
      } else {
        console.log('No existing record found, inserting new record...');
        await db.insert(Sem6)
          .values({
            uucms,
            batch:uucms.slice(5,7),
            sub1: marks.cc,
            sub2: marks.web,
            sub3: marks.bi,
            sub4: marks.wcm,
            lab1: marks.weblab,
            lab2: marks.proj,
            total: totalMarks,
            per,
            status
          })
          .execute();
        console.log('New record inserted');
      }
    } catch (error) {
      console.error('Error processing data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (subject) => {
    setEditing(subject);
    setNewMark(marks[subject]);
  };

  const handleSaveClick = (subject) => {
    setMarks(prevMarks => ({ ...prevMarks, [subject]: newMark }));
    setEditing(null);
  };

  const handleChange = (e) => {
    setNewMark(parseInt(e.target.value, 10) || 0);
  };

  const chartData = Object.keys(marks).map(subject => ({
    subject: subject.replace('_', ' ').toUpperCase(),
    mark: marks[subject],
  }));

  const highestMark = Math.max(...Object.values(marks));
  const lowestMark = Math.min(...Object.values(marks));

  const highestSubject = Object.keys(marks).find(subject => marks[subject] === highestMark);
  const lowestSubject = Object.keys(marks).find(subject => marks[subject] === lowestMark);

  const highestMarkPercentage = (highestMark / 100) * 100;
  const lowestMarkPercentage = (lowestMark / 100) * 100;

  const totalMarks = Object.values(marks).reduce((acc, mark) => acc + mark, 0);
  const totalPossibleMarks = 750; // Assuming the total possible marks is 750
  const overallPercentage = (totalMarks / totalPossibleMarks) * 100;
  const cgpa = (overallPercentage / 9.5).toFixed(2);
  return (
    <div className="h-fit flex flex-col md:flex-row gap-6 md:gap-12 p-6">
      {/* Data Table Section */}
      <div className="flex-1 bg-gray-900 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-100 mb-4">Semester 5 Marks</h2>
        <table className="w-full border-separate border-spacing-2 border-gray-700 text-gray-200">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-3 border-b border-gray-600">Subject</th>
              <th className="p-3 border-b border-gray-600">Marks</th>
              {role !== 'student' && <th className="p-3 border-b border-gray-600">Action</th>}
            </tr>
          </thead>
          <tbody>
            {Object.keys(marks).map((subject) => (
              <tr key={subject} className="bg-gray-800">
                <td className="p-3 border-b border-gray-600 capitalize">{subject.replace('_', ' ')}</td>
                <td className="p-3 border-b border-gray-600">
                  {role === 'student' ? (
                    marks[subject]
                  ) : (
                    editing === subject ? (
                      <input
                        type="number"
                        placeholder={`${newMark}`}
                        onChange={handleChange}
                        className="w-full px-3 py-1 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:outline-none focus:border-blue-500"
                      />
                    ) : (
                      marks[subject]
                    )
                  )}
                </td>
                {role !== 'student' && (
                  <td className="p-3 border-b border-gray-600">
                    {editing === subject ? (
                      <button
                        onClick={() => handleSaveClick(subject)}
                        className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditClick(subject)}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {role !== 'student' && (
          <div className="mt-6">
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="bg-blue-900 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              {loading && <Loader className='animate-spin' />}
              Update Records
            </button>
          </div>
        )}
      </div>

      {/* Chart Section */}
      <div className="w-full md:w-1/2 bg-gray-900 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-100 mb-4">Marks Distribution</h2>
        <NivoBarChart data={chartData} />
        
        {/* Highest and Lowest Marks Section */}
        <div className="mt-6 text-gray-100">
          <h3 className="text-xl font-semibold mb-2">Highest and Lowest Marks</h3>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-lg">Highest Mark: <span className="font-semibold">{highestMark}</span> {highestMark ? " in  "+highestSubject.replace('_', ' ').toUpperCase() : <></>}</p>
            <p className="text-lg">Lowest Mark: <span className="font-semibold">{lowestMark}</span> {lowestMark ? " in  "+lowestSubject.replace('_', ' ').toUpperCase() : <></>}</p>
            <p className="text-lg">Overall Percentage: <span className="font-semibold">{overallPercentage.toFixed(2)}%</span></p>
            <p className="text-lg">CGPA: <span className="font-semibold">{cgpa}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sem6Component;
