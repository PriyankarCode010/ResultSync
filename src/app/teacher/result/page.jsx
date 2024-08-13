import { authOptions } from '../../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import ResultClient from '../../../Components/ResultClient';

export default async function Result() {
  const session = await getServerSession(authOptions);

  return <ResultClient session={session} />;
}
