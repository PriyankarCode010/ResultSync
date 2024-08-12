import { db } from '@/utils/dbConfig';
import { Marks, Sem1 } from '@/utils/schema';
import { eq } from 'drizzle-orm';

export default async function updateSem1({ id,uucms, subject, mark, sem }) {
  try {
    const result = await db.update(Sem1)
      .set({ uucms, subject, mark, sem })
      .where(eq(Marks.id, id))
      .returning()
      .execute();

    console.log('Update successful:', result);
    return result;
  } catch (error) {
    console.error('Error updating marks:', error);
    throw error;
  }
}
