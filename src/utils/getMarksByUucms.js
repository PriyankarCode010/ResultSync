import { db } from '@/utils/dbConfig';
import { eq } from 'drizzle-orm';
import { Marks } from '@/utils/schema';

async function getMarksByUucms(uucms) {
    try {
        const result = await db
            .select({
                ...Marks,
            })
            .from(Marks)
            .where(eq(Marks.uucms, uucms))
            .execute();

        return result;
    } catch (error) {
        console.error("Error fetching marks data:", error);
        return [];
    }
}

export default getMarksByUucms;
