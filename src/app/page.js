import LoginForm from "@/Components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Landing from "@/Components/Landing";

export default async function Home() {

  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  if (session) redirect(`/${role}`)
  return (
    <div>
      <Landing/>
    </div>
  );
}
