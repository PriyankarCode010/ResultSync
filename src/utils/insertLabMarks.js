import { db } from '@/utils/dbConfig';
import { Labs } from '@/utils/schema';

export default async function insertLabMarks({ uucms, subject, mark, sem }) {
  const numericMark = parseInt(mark, 10);

  console.log('Inserting marks:', { uucms, subject, mark: numericMark, sem });

  try {
    await db.insert(Labs).values({
      uucms,
      subject,
      mark: numericMark,
      sem,
    }).execute();
    console.log('Insert successful');
  } catch (error) {
    console.error('Error inserting marks:', error);
    throw error;
  }
}
