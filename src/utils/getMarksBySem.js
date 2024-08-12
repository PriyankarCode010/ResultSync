import { db } from '@/utils/dbConfig';
import { eq } from 'drizzle-orm';
import { Marks } from '@/utils/schema';

async function getMarksByUucms(sem) {
    try {
        const result = await db
            .select({
                ...Marks,
            })
            .from(Marks)
            .where(eq(Marks.sem, sem))
            .execute();

        return result;
    } catch (error) {
        console.error("Error fetching marks data:", error);
        return [];
    }
}

export default getMarksByUucms;
