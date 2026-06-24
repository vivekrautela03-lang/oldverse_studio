export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f0b0a] px-6">
      <div className="w-full max-w-4xl space-y-6">
        <div className="space-y-3 text-center">
          <div className="mx-auto h-4 w-28 rounded-full bg-white/10" />
          <div className="mx-auto h-10 w-72 rounded-full bg-white/10" />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-56 animate-pulse rounded-[2rem] bg-white/8" />
          <div className="h-56 animate-pulse rounded-[2rem] bg-white/8" />
          <div className="h-56 animate-pulse rounded-[2rem] bg-white/8" />
        </div>
      </div>
    </div>
  );
}
