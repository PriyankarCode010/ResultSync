import { db } from '@/utils/dbConfig';
import { eq } from 'drizzle-orm';
import { Labs } from '@/utils/schema';

async function getLabMarksByUucms(uucms) {
    try {
        const result = await db
            .select({
                ...Labs,
            })
            .from(Labs)
            .where(eq(Labs.uucms, uucms))
            .execute();

        return result;
    } catch (error) {
        console.error("Error fetching marks data:", error);
        return [];
    }
}

export default getLabMarksByUucms;
