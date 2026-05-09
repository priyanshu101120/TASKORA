import { Skeleton } from "@/components/ui/skeleton";

const BoardSkeletonLoader = () => {
  return (
    <div
      className="shrink-0 w-70 sm:w-75 rounded-2xl border border-white/8 p-4 flex flex-col gap-3"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
      }}
    >
      <div className="flex items-center justify-between px-1 mb-1">
        <Skeleton className="h-3 w-24 rounded bg-white/8" />
        <Skeleton className="h-5 w-5 rounded-full bg-white/8" />
      </div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-xl p-3 border border-white/6" style={{ background: "rgba(255,255,255,0.04)" }}>
          <Skeleton className="h-3 w-3/4 rounded bg-white/8 mb-2" />
          <Skeleton className="h-2 w-full rounded bg-white/5 mb-1" />
          <Skeleton className="h-2 w-2/3 rounded bg-white/5 mb-3" />
          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <Skeleton className="h-2 w-16 rounded bg-white/5" />
            <Skeleton className="h-2 w-12 rounded bg-white/5" />
          </div>
        </div>
      ))}
      <Skeleton className="h-9 w-full rounded-xl bg-white/5 mt-1" />
    </div>
  );
};

export default BoardSkeletonLoader;