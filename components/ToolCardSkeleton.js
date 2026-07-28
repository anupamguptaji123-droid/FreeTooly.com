export default function ToolCardSkeleton() {
  return (
    <div className="tool-card flex flex-col p-5">
      {/* Category badge skeleton */}
      <div className="flex items-start justify-between mb-3">
        <div className="shimmer h-5 w-20 rounded-full bg-white/5" />
        <div className="shimmer h-6 w-6 rounded bg-white/5" />
      </div>

      {/* Title skeleton */}
      <div className="shimmer h-4 w-3/4 rounded mb-2 bg-white/5" />
      <div className="shimmer h-4 w-1/2 rounded mb-3 bg-white/5" />

      {/* Description skeleton */}
      <div className="space-y-2 mb-4 flex-grow">
        <div className="shimmer h-3 w-full rounded bg-white/5" />
        <div className="shimmer h-3 w-5/6 rounded bg-white/5" />
        <div className="shimmer h-3 w-4/6 rounded bg-white/5" />
      </div>

      {/* Button skeleton */}
      <div className="shimmer h-4 w-20 rounded bg-white/5" />
    </div>
  );
}
