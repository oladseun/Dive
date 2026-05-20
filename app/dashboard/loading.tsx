export default function DashboardLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="w-12 h-12 border-2 border-primary/10 border-t-primary rounded-full animate-spin" />
      <div className="flex flex-col items-center gap-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Syncing Intelligence</p>
        <div className="flex gap-1">
          <div className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-1 h-1 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
}
