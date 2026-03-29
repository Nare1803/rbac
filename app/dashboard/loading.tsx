export default function DashboardLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-[#185FA5] rounded-full animate-spin" />
        <p className="text-sm text-gray-400">Բեռնվում է...</p>
      </div>
    </div>
  );
}
