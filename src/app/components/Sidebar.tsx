interface SidebarProps {
  isOpen: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedDay: string;
  onDaySelect: (day: string) => void;
  days: string[];
  eventCount: number;
}

export function Sidebar({
  isOpen,
  searchQuery,
  onSearchChange,
  selectedDay,
  onDaySelect,
  days,
  eventCount,
}: SidebarProps) {
  return (
    <aside className={`lg:w-64 flex-shrink-0 ${isOpen ? "block" : "hidden lg:block"}`}>
      <div className="bg-amber-500 rounded-tl-3xl p-3 sm:p-4 mb-1">
        <span className="text-black font-bold text-xs">SEARCH EVENTS</span>
      </div>
      <div className="bg-gray-900 border-l-4 border-amber-500 p-3 sm:p-4 mb-4">
        <input
          type="text"
          placeholder="Enter search query..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-black border-2 border-amber-600 rounded p-2 text-amber-400 placeholder-amber-800 focus:outline-none focus:border-amber-400"
        />
      </div>

      <div className="bg-purple-600 rounded-tl-3xl p-3 sm:p-4 mb-1">
        <span className="text-black font-bold text-xs">SELECT STARDATE</span>
      </div>
      <div className="bg-gray-900 border-l-4 border-purple-600 p-2">
        <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
          <button
            onClick={() => onDaySelect("all")}
            className={`flex-shrink-0 lg:flex-shrink lg:w-full text-left px-3 py-2 rounded transition-colors whitespace-nowrap ${
              selectedDay === "all"
                ? "bg-cyan-500 text-black"
                : "bg-gray-800 text-cyan-400 hover:bg-gray-700"
            }`}
          >
            ALL DAYS
          </button>
          {days.map((day) => (
            <button
              key={day}
              onClick={() => onDaySelect(day)}
              className={`flex-shrink-0 lg:flex-shrink lg:w-full text-left px-3 py-2 rounded text-sm transition-colors whitespace-nowrap ${
                selectedDay === day
                  ? "bg-cyan-500 text-black"
                  : "bg-gray-800 text-cyan-400 hover:bg-gray-700"
              }`}
            >
              {day.replace(" 2026", "")}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 bg-red-700 rounded-bl-3xl p-3 sm:p-4">
        <span className="text-black font-bold text-xs">
          {eventCount} EVENTS FOUND
        </span>
      </div>
      <div className="mt-3 bg-gray-900 border-l-4 border-cyan-500 rounded-tr-3xl p-3 sm:p-4 flex items-center gap-3">
        <span className="inline-block h-3 w-6 bg-cyan-500 rounded-full" aria-hidden="true" />
        <a
          href="mailto:martin@coryl.com"
          className="text-cyan-300 font-semibold text-sm tracking-wide hover:text-cyan-200"
        >
          CONTACT ME
        </a>
      </div>
    </aside>
  );
}
