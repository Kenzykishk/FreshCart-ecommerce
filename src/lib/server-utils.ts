import { getServerSession } from "next-auth";
import { authOptions } from "@/next-auth/authOptions";

export async function getUserToken() {
  const session = await getServerSession(authOptions);
  
  return (session?.user as any)?.accessToken  ?? null;
}