export default function RoadmapsLoading() {
  return (
    <div className="space-y-12 animate-pulse">
      <div className="space-y-4">
        <div className="w-48 h-10 bg-gray-200 rounded" />
        <div className="w-64 h-4 bg-gray-200 rounded" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-surface border border-border rounded-xl p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="w-16 h-4 bg-gray-200 rounded" />
              <div className="w-12 h-4 bg-gray-200 rounded" />
            </div>
            <div className="space-y-2">
              <div className="w-full h-6 bg-gray-200 rounded" />
              <div className="w-1/2 h-6 bg-gray-200 rounded" />
            </div>
            <div className="w-full h-4 bg-gray-200 rounded" />
            <div className="flex items-center justify-between pt-4">
              <div className="w-32 h-6 bg-gray-200 rounded" />
              <div className="w-24 h-10 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
