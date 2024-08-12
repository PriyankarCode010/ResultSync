// components/SubjectForm.js
"use client";
import { useState } from 'react';
import { db } from '@/utils/dbConfig';
import { Loader } from 'lucide-react';
import { eq } from 'drizzle-orm';

const SubjectForm = ({ semesterSchema, subjectFields }) => {
  const [uucms, setUucms] = useState('');
  const [batch, setBatch] = useState('');
  const [marks, setMarks] = useState(subjectFields.reduce((acc, field) => ({ ...acc, [field]: 0 }), {}));
  const [loading, setLoading] = useState(false);

  const passingThreshold = 35; // Define the passing threshold

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMarks(prevMarks => ({
      ...prevMarks,
      [name]: parseInt(value, 10) || 0
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Determine if all subjects have passed
      const allPassed = Object.values(marks).every(mark => mark >= passingThreshold);

      // Calculate the total and percentage
      const totalMarks = Object.values(marks).reduce((a, b) => a + b, 0);
      const percentage = (totalMarks / subjectFields.length / 100) * 100;
      const per = percentage.toFixed(2);

      // Calculate the status based on all subjects passing
      const status = allPassed;

      // Check if the record with the same uucms already exists
      const existingRecord = await db.select().from(semesterSchema).where(eq(semesterSchema.uucms, uucms)).execute();

      if (existingRecord.length > 0) {
        // If a record exists, update it
        await db.update(semesterSchema).set({
          batch,
          ...marks,
          total: totalMarks,
          per,
          status
        }).where(eq(semesterSchema.uucms, uucms)).execute();
        console.log('Data updated successfully');
      } else {
        // If no record exists, insert a new one
        await db.insert(semesterSchema).values({
          uucms,
          batch,
          ...marks,
          total: totalMarks,
          per,
          status
        }).execute();
        console.log('Data inserted successfully');
      }
    } catch (error) {
      console.error('Error processing data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 dark:text-white">UU CMS</label>
          <input
            type="text"
            placeholder="Enter UU CMS"
            value={uucms}
            onChange={(e) => setUucms(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-white">Batch</label>
          <input
            type="text"
            placeholder="Enter Batch"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            required
          />
        </div>

        {subjectFields.map((field) => (
          <div key={field}>
            <label className="block text-gray-700 dark:text-white">{field}</label>
            <input
              type="number"
              name={field}
              placeholder="0"
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
          </div>
        ))}

        <div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-800 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            {loading ? <Loader className='animate-spin' /> : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubjectForm;
