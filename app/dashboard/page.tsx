import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminPanel from "../components/admin/AdminPanel";
import PatientList from "../components/patients/PatientList";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const isAdmin = session.user.role === "ADMIN";
  const isDoctor = session.user.role === "DOCTOR";

  const roleColors: Record<string, string> = {
    ADMIN: "bg-amber-50  text-amber-700  border-amber-200",
    DOCTOR: "bg-blue-50   text-blue-700   border-blue-200",
    PATIENT: "bg-green-50  text-green-700  border-green-200",
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Բարի գալուստ, {session.user.name} 👋
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            {new Date().toLocaleDateString("hy-AM", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <span
          className={`text-xs font-medium px-3 py-1.5 rounded-full border
                          ${roleColors[session.user.role]}`}
        >
          {session.user.role}
        </span>
      </div>

      {isAdmin && <AdminPanel />}
      {(isAdmin || isDoctor) && <PatientList />}
    </div>
  );
}
