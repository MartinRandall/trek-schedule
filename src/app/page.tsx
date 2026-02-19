"use client";

import { useState, useMemo, useEffect } from "react";
import scheduleData from "./schedule";

interface Event {
  startTime: string;
  endTime: string;
  activity: string;
  location: string;
  day: string;
}

type EventStatus = "past" | "active" | "upcoming";

function parseTimeString(timeStr: string, dayStr: string): Date | null {
  if (!timeStr) return null;
  
  const datePart = dayStr.replace(/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\s+/, "");
  
  let hours = 0;
  let minutes = 0;
  
  const normalizedTime = timeStr.toLowerCase().trim();
  
  if (normalizedTime === "noon") {
    hours = 12;
    minutes = 0;
  } else if (normalizedTime === "midnight") {
    hours = 0;
    minutes = 0;
  } else {
    const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (!match) return null;
    
    hours = parseInt(match[1], 10);
    minutes = parseInt(match[2], 10);
    const isPM = match[3].toUpperCase() === "PM";
    
    if (isPM && hours !== 12) {
      hours += 12;
    } else if (!isPM && hours === 12) {
      hours = 0;
    }
  }
  
  const date = new Date(`${datePart} ${hours}:${minutes}:00`);
  return isNaN(date.getTime()) ? null : date;
}

function getEventStatus(event: Event, now: Date): EventStatus {
  const startTime = parseTimeString(event.startTime, event.day);
  let endTime = parseTimeString(event.endTime, event.day);
  
  if (!startTime) return "upcoming";
  
  // Handle overnight events (end time is AM and likely next day)
  if (endTime && event.endTime) {
    const endLower = event.endTime.toLowerCase();
    if ((endLower.includes("am") || endLower === "midnight") && endTime < startTime) {
      endTime.setDate(endTime.getDate() + 1);
    }
  }
  
  // If no end time, treat as a point event (30 min duration)
  if (!endTime) {
    endTime = new Date(startTime.getTime() + 30 * 60 * 1000);
  }
  
  if (now > endTime) {
    return "past";
  } else if (now >= startTime && now <= endTime) {
    return "active";
  }
  return "upcoming";
}

export default function Home() {
  const [selectedDay, setSelectedDay] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const days = useMemo(() => {
    const uniqueDays = [...new Set(scheduleData.map((event) => event.day))];
    return uniqueDays;
  }, []);

  const filteredEvents = useMemo(() => {
    return scheduleData.filter((event) => {
      const matchesDay = selectedDay === "all" || event.day === selectedDay;
      const matchesSearch =
        searchQuery === "" ||
        event.activity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDay && matchesSearch;
    });
  }, [selectedDay, searchQuery]);

  const groupedEvents = useMemo(() => {
    const groups: Record<string, Event[]> = {};
    filteredEvents.forEach((event) => {
      if (!groups[event.day]) {
        groups[event.day] = [];
      }
      groups[event.day].push(event);
    });
    return groups;
  }, [filteredEvents]);

  const handleDaySelect = (day: string) => {
    setSelectedDay(day);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-amber-400 font-mono">
      {/* LCARS Header */}
      <header className="bg-black border-b-4 border-amber-500 p-2 sm:p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="bg-amber-500 rounded-l-full h-10 w-16 sm:h-16 sm:w-32 flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-2xl lg:text-4xl font-bold tracking-wider text-amber-400 truncate">
                STAR TREK: THE CRUISE IX
              </h1>
              <div className="flex flex-row justify-between">
              <p className="text-amber-600 text-xs sm:text-sm tracking-widest truncate">
                LCARS SCHEDULE INTERFACE • STARDATE 2026.02
              </p>
              <p className="text-amber-400 text-xs sm:text-sm tracking-widest truncate">This site is <strong>not</strong> associated with ECP</p>
</div>
            </div>
            <div className="bg-purple-600 rounded-r-full h-10 w-12 sm:h-16 sm:w-24 flex-shrink-0 hidden sm:block"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-2 sm:p-4 flex flex-col lg:flex-row gap-4">
        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden bg-amber-500 text-black font-bold p-3 rounded-lg flex items-center justify-between"
        >
          <span>FILTERS & SEARCH</span>
          <span className="text-xl">{isSidebarOpen ? "▲" : "▼"}</span>
        </button>

        {/* LCARS Sidebar */}
        <aside className={`lg:w-64 flex-shrink-0 ${isSidebarOpen ? "block" : "hidden lg:block"}`}>
          <div className="bg-amber-500 rounded-tl-3xl p-3 sm:p-4 mb-1">
            <span className="text-black font-bold text-xs">SEARCH EVENTS</span>
          </div>
          <div className="bg-gray-900 border-l-4 border-amber-500 p-3 sm:p-4 mb-4">
            <input
              type="text"
              placeholder="Enter search query..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black border-2 border-amber-600 rounded p-2 text-amber-400 placeholder-amber-800 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="bg-purple-600 rounded-tl-3xl p-3 sm:p-4 mb-1">
            <span className="text-black font-bold text-xs">SELECT STARDATE</span>
          </div>
          <div className="bg-gray-900 border-l-4 border-purple-600 p-2">
            {/* Mobile: Horizontal scrollable day buttons */}
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
              <button
                onClick={() => handleDaySelect("all")}
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
                  onClick={() => handleDaySelect(day)}
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
              {filteredEvents.length} EVENTS FOUND
            </span>
          </div>
        </aside>

        {/* Main Content */}
        <section className="flex-1 min-w-0">
          <div className="bg-amber-600 rounded-tr-3xl p-2 mb-1 flex justify-between items-center">
            <span className="text-black font-bold text-sm sm:text-base">EVENT MANIFEST</span>
            <span className="text-black text-xs hidden sm:inline">USS ENTERPRISE • NCC-1701</span>
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
      </main>
    </div>
  );
}

function EventCard({ event, currentTime }: { event: Event; currentTime: Date }) {
  const status = getEventStatus(event, currentTime);
  const timeDisplay = event.endTime
    ? `${event.startTime} - ${event.endTime}`
    : event.startTime;

  // Status-based styling
  const containerStyles = {
    past: "bg-black/50 border border-gray-800 rounded-lg p-2 sm:p-3 opacity-50",
    active: "bg-green-950 border-2 border-green-500 rounded-lg p-2 sm:p-3 shadow-lg shadow-green-500/20 animate-pulse-subtle",
    upcoming: "bg-black border border-amber-900 rounded-lg p-2 sm:p-3 hover:border-amber-500 transition-colors group",
  };

  const barStyles = {
    past: "bg-gray-600 w-1.5 sm:w-2 rounded-full flex-shrink-0",
    active: "bg-green-500 w-1.5 sm:w-2 rounded-full flex-shrink-0 animate-pulse",
    upcoming: "bg-amber-600 w-1.5 sm:w-2 rounded-full group-hover:bg-amber-400 transition-colors flex-shrink-0",
  };

  const titleStyles = {
    past: "text-gray-500 font-semibold text-sm sm:text-base",
    active: "text-green-400 font-semibold text-sm sm:text-base",
    upcoming: "text-amber-400 font-semibold group-hover:text-amber-300 text-sm sm:text-base",
  };

  const timeStyles = {
    past: "text-gray-600 text-xs sm:text-sm whitespace-nowrap",
    active: "text-green-400 text-xs sm:text-sm whitespace-nowrap font-bold",
    upcoming: "text-cyan-500 text-xs sm:text-sm whitespace-nowrap",
  };

  const locationStyles = {
    past: "text-gray-600 text-xs sm:text-sm truncate",
    active: "text-green-300 text-xs sm:text-sm truncate",
    upcoming: "text-purple-400 text-xs sm:text-sm truncate",
  };

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
                {event.activity}
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
