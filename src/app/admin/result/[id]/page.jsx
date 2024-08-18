// pages/[id].jsx

import { getServerSession } from 'next-auth';
import StudentPage from '../../../../Components/StudentPage';
import { db } from '../../../../utils/dbConfig';
import { Students } from '../../../../utils/schema';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { sendError } from 'next/dist/server/api-utils';

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

const Page = async ({ params }) => {

  const session = await getServerSession(authOptions);


  console.log(params);
  return (
    <StudentPage studentId={params.id} session={session}/>
  );
};

export default Page;
