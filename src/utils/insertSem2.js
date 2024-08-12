import { db } from '@/utils/dbConfig';
import { Sem2 } from '@/utils/schema';

export default async function insertSem2({uucms,batch,sub1,sub2,sub3,sub4,sub5,sub6,sub7,sub8,lab1,lab2,}) {
  console.log('Inserting marks:', {
    uucms,
    batch,
    sub1,
    sub2,
    sub3,
    sub4,
    sub5,
    sub6,
    sub7,
    sub8,
    lab1,
    lab2,
  });

  try {
    // Convert values to integers and handle potential null/undefined values
    const parseIntOrZero = (value) => (value ? parseInt(value, 10) : 0);

    const total =
      parseIntOrZero(sub1) +
      parseIntOrZero(sub2) +
      parseIntOrZero(sub3) +
      parseIntOrZero(sub4) +
      parseIntOrZero(sub5) +
      parseIntOrZero(sub6) +
      parseIntOrZero(sub7) +
      parseIntOrZero(sub8);

    const status = (total / 750) * 100 > 40;

    await db.insert(Sem2).values({
      uucms,
      batch,
      sub1: parseIntOrZero(sub1),
      sub2: parseIntOrZero(sub2),
      sub3: parseIntOrZero(sub3),
      sub4: parseIntOrZero(sub4),
      sub5: parseIntOrZero(sub5),
      sub6: parseIntOrZero(sub6),
      sub7: parseIntOrZero(sub7),
      sub8: parseIntOrZero(sub8),
      lab1: parseIntOrZero(lab1),
      lab2: parseIntOrZero(lab2),
      total,
      status,
    }).execute();

    console.log('Insert successful');
  } catch (error) {
    console.error('Error inserting marks:', error);
    throw error;
  }
}
