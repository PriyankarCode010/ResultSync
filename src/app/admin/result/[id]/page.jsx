// pages/[id].jsx

import StudentPage from '../../../../Components/StudentPage';
import { db } from '../../../../utils/dbConfig';
import { Students } from '../../../../utils/schema';

export async function generateStaticParams() {
  // Example: fetch all student IDs to pre-render the pages
  const students = await db.select().from(Students).execute();
  return students.map(student => ({ studentId: student.uucms.toString() }));
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
