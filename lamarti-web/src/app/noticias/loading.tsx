export default function NoticiasLoading() {
  return (
    <>
      <section className="bg-marti-blue pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-12 w-48 bg-white/20 rounded-xl animate-pulse" />
          <div className="h-6 w-96 bg-white/10 rounded-lg animate-pulse mt-4" />
        </div>
      </section>
      <section className="py-16 bg-marti-gray">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-gray-100"
              >
                <div className="h-56 bg-gray-200 animate-pulse" />
                <div className="p-8 space-y-3">
                  <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                  <div className="h-6 w-full bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
