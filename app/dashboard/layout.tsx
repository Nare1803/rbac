import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "../components/shared/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 min-w-0 p-6 pb-24 md:pb-6">{children}</main>
    </div>
  );
}
