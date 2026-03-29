import { getAllPatients } from "@/actions/patient";

export default async function PatientList() {
  const patients = await getAllPatients();

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-900">
          Պացիենտների ցանկ
        </h2>
    
      </div>

      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        {patients.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-gray-400">Պացիենտներ չկան</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th
                    className="text-left text-[11px] font-medium text-gray-400
                                 uppercase tracking-wide px-5 py-3"
                  >
                    Անուն
                  </th>
                  <th
                    className="text-left text-[11px] font-medium text-gray-400
                                 uppercase tracking-wide px-5 py-3 hidden sm:table-cell"
                  >
                    Ավելացվել է
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {patients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-7 h-7 rounded-full bg-green-50 flex items-center
                                        justify-center text-[11px] font-semibold
                                        text-green-700 shrink-0"
                        >
                          {patient.firstName.charAt(0)}
                        </div>
                        <p className="font-medium text-gray-900">
                          {patient.firstName} {patient.lastName}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-400 hidden sm:table-cell">
                      {new Date(patient.createdAt).toLocaleDateString("hy-AM")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
