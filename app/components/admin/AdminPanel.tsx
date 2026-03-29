import { getAllDoctors } from "@/actions/patient"

export default async function AdminPanel() {
  const doctors = await getAllDoctors()

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-900">Բժիշկների կառավարում</h2>
        <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
          {doctors.length} բժիշկ
        </span>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        {doctors.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-gray-400">Բժիշկներ չկան</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-[11px] font-medium text-gray-400
                                 uppercase tracking-wide px-5 py-3">Անուն</th>
                  <th className="text-left text-[11px] font-medium text-gray-400
                                 uppercase tracking-wide px-5 py-3">Էլ. հասցե</th>
                  <th className="text-left text-[11px] font-medium text-gray-400
                                 uppercase tracking-wide px-5 py-3 hidden sm:table-cell">
                    Ավելացվել է
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {doctors.map((doctor) => (
                  <tr key={doctor.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center
                                        justify-center text-[11px] font-semibold text-[#185FA5] shrink-0">
                          {doctor.name?.charAt(0).toUpperCase() ?? "?"}
                        </div>
                        <span className="font-medium text-gray-900">{doctor.name ?? "—"}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500">{doctor.email}</td>
                    <td className="px-5 py-3.5 text-gray-400 hidden sm:table-cell">
                      {new Date(doctor.createdAt).toLocaleDateString("hy-AM")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}