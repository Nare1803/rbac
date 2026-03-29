import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function HomePage() {
  const session = await auth();
  if (session) redirect("/dashboard");

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <header className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#185FA5] flex items-center justify-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <span className="font-semibold text-gray-900 text-[15px]">
            MedPanel
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-4 py-2"
          >
            Մուտք
          </Link>
          <Link
            href="/register"
            className="text-sm font-medium bg-[#185FA5] hover:bg-[#0C447C] text-white
                       px-4 py-2 rounded-lg transition-colors"
          >
            Գրանցվել
          </Link>
        </div>
      </header>

      <section className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl text-center space-y-8">
          <div
            className="inline-flex items-center gap-2 bg-blue-50 text-[#185FA5]
                          text-xs font-medium px-3 py-1.5 rounded-full border border-blue-100"
          >
            <span className="w-1.5 h-1.5 bg-[#185FA5] rounded-full" />
            Բժշկական կառավարման համակարգ
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
            Med<span className="text-[#185FA5]">Panel</span>
          </h1>

          <p className="text-lg text-gray-500 max-w-md mx-auto leading-relaxed">
            Կառավարեք պացիենտներին, բժիշկներին և հասանելիությունները մեկ հարթակի
            վրա։
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-3 bg-[#185FA5] hover:bg-[#0C447C]
                         text-white rounded-xl font-medium transition-colors text-sm"
            >
              Սկսել անվճար
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-3 border border-gray-200
                         hover:bg-gray-50 text-gray-700 rounded-xl font-medium
                         transition-colors text-sm"
            >
              Մուտք գործել
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 px-6 py-10">
        <div className="max-w-2xl mx-auto grid grid-cols-3 gap-6 text-center">
          {[
            { value: "3", label: "Դերեր" },
            { value: "100%", label: "Անվտանգ" },
            { value: "24/7", label: "Հասանելի" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-sm text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
