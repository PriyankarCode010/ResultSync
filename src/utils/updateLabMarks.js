import { db } from '@/utils/dbConfig';
import { Labs} from '@/utils/schema';
import { eq } from 'drizzle-orm';

export default async function updateLabMarks({ id,uucms, subject, mark, sem }) {
  try {
    const result = await db.update(Labs)
      .set({ uucms, subject, mark, sem })
      .where(eq(Labs.id, id))
      .returning()
      .execute();

    console.log('Update successful:', result);
    return result;
  } catch (error) {
    console.error('Error updating marks:', error);
    throw error;
  }
}
