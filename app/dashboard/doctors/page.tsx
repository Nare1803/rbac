import AdminPanel from "@/app/components/admin/AdminPanel";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = { title: "Բժիշկներ" };

export default async function DoctorsPage() {
  const session = await auth();
  if (!session) redirect("/login");

  if (session.user.role !== "ADMIN") redirect("/dashboard");

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Բժիշկներ</h1>
        <p className="text-sm text-gray-400 mt-1">
          Բոլոր գրանցված բժիշկների ցանկ
        </p>
      </div>
      <AdminPanel />
    </div>
  );
}
