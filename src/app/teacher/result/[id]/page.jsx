// pages/[id].jsx

import StudentPage from '@/components/StudentPage';
import { db } from '@/utils/dbConfig';
import { Students } from '@/utils/schema';

export async function generateStaticParams() {
  try {
      const results = await db.select().from(Students).execute();
      return results.map(student => ({ id: student.uucms.toString() }));
  } catch (error) {
      console.error("Error fetching params:", error);
      return []; // Or handle it accordingly
  }
}

// export async function getStaticProps({ params }) {
//   return { props: { params } };
// }

const Page = ({ params }) => {
  return (
    <StudentPage studentId={params.id} />
  );
};

export default Page;
