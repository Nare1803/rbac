export default function RegisterLoading() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-[440px] bg-white border border-gray-200 rounded-2xl shadow-sm p-10 space-y-7">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[#185FA5] animate-pulse" />
          <div className="h-4 w-20 bg-gray-100 rounded-lg animate-pulse" />
        </div>

        <div className="space-y-2">
          <div className="h-6 w-40 bg-gray-100 rounded-lg animate-pulse" />
          <div className="h-4 w-56 bg-gray-100 rounded-lg animate-pulse" />
        </div>

        <div className="space-y-2.5">
          <div className="h-3.5 w-16 bg-gray-100 rounded animate-pulse" />
          <div className="grid grid-cols-3 gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-16 bg-gray-100 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-1.5">
              <div className="h-3.5 w-28 bg-gray-100 rounded animate-pulse" />
              <div className="h-9 w-full bg-gray-100 rounded-lg animate-pulse" />
            </div>
          ))}
          <div className="h-10 w-full bg-[#185FA5]/20 rounded-lg animate-pulse" />
        </div>

        <div className="h-4 w-48 bg-gray-100 rounded animate-pulse mx-auto" />
      </div>
    </main>
  );
}
