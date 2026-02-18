"use client";

import { useState, useMemo } from "react";
import scheduleData from "./schedule";

interface Event {
  startTime: string;
  endTime: string;
  activity: string;
  location: string;
  day: string;
}

export default function Home() {
  const [selectedDay, setSelectedDay] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

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
              <p className="text-amber-600 text-xs sm:text-sm tracking-widest truncate">
                LCARS SCHEDULE INTERFACE • STARDATE 2026.02
              </p>
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
            <span className="text-black font-bold text-xs">SEARCH DATABASE</span>
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
                      <EventCard key={`${day}-${idx}`} event={event} />
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

function EventCard({ event }: { event: Event }) {
  const timeDisplay = event.endTime
    ? `${event.startTime} - ${event.endTime}`
    : event.startTime;

  return (
    <div className="bg-black border border-amber-900 rounded-lg p-2 sm:p-3 hover:border-amber-500 transition-colors group">
      <div className="flex gap-2 sm:gap-3">
        <div className="bg-amber-600 w-1.5 sm:w-2 rounded-full group-hover:bg-amber-400 transition-colors flex-shrink-0"></div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 gap-1">
            <h3 className="text-amber-400 font-semibold group-hover:text-amber-300 text-sm sm:text-base">
              {event.activity}
            </h3>
            <span className="text-cyan-500 text-xs sm:text-sm whitespace-nowrap">
              {timeDisplay}
            </span>
          </div>
          {event.location && (
            <p className="text-purple-400 text-xs sm:text-sm truncate">📍 {event.location}</p>
          )}
        </div>
      </div>
    </div>
  );
}
