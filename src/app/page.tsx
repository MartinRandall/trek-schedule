"use client";

import { useState, useMemo, useEffect } from "react";
import scheduleData from "./schedule";
import { Event } from "./types";
import { Header, Sidebar, EventList, WelcomeModal } from "./components";

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
      <WelcomeModal />
      <Header />

      <main className="max-w-7xl mx-auto p-2 sm:p-4 flex flex-col lg:flex-row gap-4">
        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden bg-amber-500 text-black font-bold p-3 rounded-lg flex items-center justify-between"
        >
          <span>FILTERS & SEARCH</span>
          <span className="text-xl">{isSidebarOpen ? "▲" : "▼"}</span>
        </button>

        <Sidebar
          isOpen={isSidebarOpen}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedDay={selectedDay}
          onDaySelect={handleDaySelect}
          days={days}
          eventCount={filteredEvents.length}
        />

        <EventList groupedEvents={groupedEvents} currentTime={currentTime} />
      </main>
    </div>
  );
}
