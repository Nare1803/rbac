import PatientList from "@/app/components/patients/PatientList";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = { title: "Պացիենտներ" };

export default async function PatientsPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const isAdmin = session.user.role === "ADMIN";
  const isDoctor = session.user.role === "DOCTOR";

  if (!isAdmin && !isDoctor) redirect("/dashboard");

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Պացիենտներ</h1>
        <p className="text-sm text-gray-400 mt-1">
          Բոլոր գրանցված պացիենտների ցանկ
        </p>
      </div>
      <PatientList />
    </div>
  );
}
