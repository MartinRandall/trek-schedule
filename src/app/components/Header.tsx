export function Header() {
  return (
    <header className="bg-black border-b-4 border-amber-500 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="bg-amber-500 rounded-l-full h-10 w-16 sm:h-16 sm:w-32 flex-shrink-0"></div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg sm:text-2xl lg:text-4xl font-bold tracking-wider text-amber-400 truncate">
              STAR TREK: THE CRUISE IX
            </h1>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
              <p className="text-amber-600 text-xs sm:text-sm tracking-widest truncate">
                LCARS SCHEDULE INTERFACE • STARDATE 2026.02
              </p>
              <p className="text-amber-400 text-xs lg:text-sm truncate">
                This site is <strong>not</strong> associated with ECP
              </p>
            </div>
          </div>
          <div className="bg-purple-600 rounded-r-full h-10 w-12 sm:h-16 sm:w-24 flex-shrink-0 hidden sm:block"></div>
        </div>
      </div>
    </header>
  );
}
