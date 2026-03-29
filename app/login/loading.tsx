export default function LoginLoading() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-[420px] bg-white border border-gray-200 rounded-2xl shadow-sm p-10 space-y-7">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[#185FA5] animate-pulse" />
          <div className="h-4 w-20 bg-gray-100 rounded-lg animate-pulse" />
        </div>

        <div className="space-y-2">
          <div className="h-6 w-36 bg-gray-100 rounded-lg animate-pulse" />
          <div className="h-4 w-48 bg-gray-100 rounded-lg animate-pulse" />
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <div className="h-3.5 w-20 bg-gray-100 rounded animate-pulse" />
            <div className="h-9 w-full bg-gray-100 rounded-lg animate-pulse" />
          </div>
          <div className="space-y-1.5">
            <div className="h-3.5 w-24 bg-gray-100 rounded animate-pulse" />
            <div className="h-9 w-full bg-gray-100 rounded-lg animate-pulse" />
          </div>
          <div className="h-10 w-full bg-[#185FA5]/20 rounded-lg animate-pulse" />
        </div>

        <div className="h-4 w-48 bg-gray-100 rounded animate-pulse mx-auto" />
      </div>
    </main>
  );
}
