import { Event, EventStatus } from "../types";
import { getEventStatus } from "../utils/timeUtils";
import { getEventIcon } from "../utils/eventIcons";

interface EventCardProps {
  event: Event;
  currentTime: Date;
}

const containerStyles: Record<EventStatus, string> = {
  past: "bg-black/50 border border-gray-800 rounded-lg p-2 sm:p-3 opacity-50",
  active: "bg-green-950 border-2 border-green-500 rounded-lg p-2 sm:p-3 shadow-lg shadow-green-500/20 animate-pulse-subtle",
  upcoming: "bg-black border border-amber-900 rounded-lg p-2 sm:p-3 hover:border-amber-500 transition-colors group",
};

const barStyles: Record<EventStatus, string> = {
  past: "bg-gray-600 w-1.5 sm:w-2 rounded-full flex-shrink-0",
  active: "bg-green-500 w-1.5 sm:w-2 rounded-full flex-shrink-0 animate-pulse",
  upcoming: "bg-amber-600 w-1.5 sm:w-2 rounded-full group-hover:bg-amber-400 transition-colors flex-shrink-0",
};

const titleStyles: Record<EventStatus, string> = {
  past: "text-gray-500 font-semibold text-sm sm:text-base",
  active: "text-green-400 font-semibold text-sm sm:text-base",
  upcoming: "text-amber-400 font-semibold group-hover:text-amber-300 text-sm sm:text-base",
};

const timeStyles: Record<EventStatus, string> = {
  past: "text-gray-600 text-xs sm:text-sm whitespace-nowrap",
  active: "text-green-400 text-xs sm:text-sm whitespace-nowrap font-bold",
  upcoming: "text-cyan-500 text-xs sm:text-sm whitespace-nowrap",
};

const locationStyles: Record<EventStatus, string> = {
  past: "text-gray-600 text-xs sm:text-sm truncate",
  active: "text-green-300 text-xs sm:text-sm truncate",
  upcoming: "text-purple-400 text-xs sm:text-sm truncate",
};

export function EventCard({ event, currentTime }: EventCardProps) {
  const status = getEventStatus(event, currentTime);
  const icon = getEventIcon(event.activity);
  const timeDisplay = event.endTime
    ? `${event.startTime} - ${event.endTime}`
    : event.startTime;

  return (
    <div className={containerStyles[status]}>
      <div className="flex gap-2 sm:gap-3">
        <div className={barStyles[status]}></div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 gap-1">
            <div className="flex items-center gap-2">
              {status === "active" && (
                <span className="text-green-400 text-xs font-bold bg-green-900 px-2 py-0.5 rounded animate-pulse">
                  LIVE
                </span>
              )}
              <h3 className={titleStyles[status]}>
                <span className="mr-2">{icon}</span>{event.activity}
              </h3>
            </div>
            <span className={timeStyles[status]}>
              {timeDisplay}
            </span>
          </div>
          {event.location && (
            <p className={locationStyles[status]}>📍 {event.location}</p>
          )}
        </div>
      </div>
    </div>
  );
}
