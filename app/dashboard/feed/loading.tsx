import { Skeleton } from "@/components/ui";

export default function FeedLoading() {
  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <Skeleton className="w-48 h-10 rounded-lg" />
          <Skeleton className="w-64 h-4 rounded-full" />
        </div>
        <Skeleton className="w-full md:w-64 h-12 rounded-xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-2xl p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between">
              <Skeleton className="w-16 h-4 rounded-full" />
              <Skeleton className="w-24 h-6 rounded-full" />
            </div>
            <div className="space-y-3">
              <Skeleton className="w-full h-6 rounded-lg" />
              <Skeleton className="w-3/4 h-6 rounded-lg" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="w-12 h-5 rounded-lg" />
              <Skeleton className="w-16 h-5 rounded-lg" />
            </div>
            <div className="pt-4 flex items-center justify-between border-t border-slate-50">
              <Skeleton className="w-20 h-4 rounded-full" />
              <Skeleton className="w-24 h-10 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
