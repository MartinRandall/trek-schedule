import { Event } from "../types";
import { EventCard } from "./EventCard";

interface EventListProps {
  groupedEvents: Record<string, Event[]>;
  currentTime: Date;
}

export function EventList({ groupedEvents, currentTime }: EventListProps) {
  return (
    <section className="flex-1 min-w-0">
      <div className="bg-amber-600 rounded-tr-3xl p-2 mb-1 flex justify-between items-center">
        <span className="text-black font-bold text-sm sm:text-base">EVENT MANIFEST</span>
        <span className="text-black text-xs hidden sm:inline mr-2">USS ENTERPRISE • NCC-1701-D</span>
      </div>

      <div className="bg-gray-900 border-r-4 border-amber-600 min-h-[50vh] lg:min-h-[70vh] p-2 sm:p-4">
        {Object.keys(groupedEvents).length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl sm:text-2xl text-amber-600">NO EVENTS FOUND</p>
            <p className="text-amber-800 mt-2 text-sm sm:text-base">
              Adjust your search parameters, Captain.
            </p>
          </div>
        ) : (
          Object.entries(groupedEvents).map(([day, events]) => (
            <div key={day} className="mb-6 sm:mb-8">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="bg-cyan-500 h-6 sm:h-8 w-3 sm:w-4 rounded-l-full flex-shrink-0"></div>
                <h2 className="text-base sm:text-xl font-bold text-cyan-400 truncate">{day}</h2>
                <div className="flex-1 h-1 bg-cyan-900 hidden sm:block"></div>
                <span className="text-cyan-600 text-xs sm:text-sm whitespace-nowrap">
                  {events.length} events
                </span>
              </div>

              <div className="space-y-2">
                {events.map((event, idx) => (
                  <EventCard key={`${day}-${idx}`} event={event} currentTime={currentTime} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-purple-600 rounded-br-3xl p-2 mt-1 flex justify-between">
        <span className="text-black font-bold text-xs">END TRANSMISSION</span>
        <span className="text-black text-xs hidden sm:inline">LIVE LONG AND PROSPER 🖖</span>
        <span className="text-black text-xs sm:hidden">🖖</span>
      </div>
    </section>
  );
}
