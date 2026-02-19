"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "trek-schedule-acknowledged";

export function WelcomeModal() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const acknowledged = localStorage.getItem(STORAGE_KEY);
    if (!acknowledged) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(true);
    }
  }, []);

  const handleAcknowledge = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900 border-2 border-amber-500 rounded-lg max-w-lg w-full overflow-hidden">
        {/* LCARS-style header */}
        <div className="bg-amber-500 p-3 flex items-center gap-3">
          <div className="bg-purple-600 h-6 w-12 rounded-full"></div>
          <span className="text-black font-bold text-sm tracking-wider">ATTENTION</span>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-amber-400 mb-6">
          This website has been created by a fan for fans, and is not associated with ECP or the official Star Trek: The Cruise in any way. It is intended to provide an easy-to-use interface for viewing the schedule of events during the cruise, but it may contain inaccuracies or omissions. For the most up-to-date and accurate information, please refer to the official ECP materials and announcements.
          </p>

          <button
            onClick={handleAcknowledge}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-6 rounded transition-colors"
          >
            ACKNOWLEDGE
          </button>
        </div>

        {/* LCARS-style footer */}
        <div className="bg-purple-600 h-3"></div>
      </div>
    </div>
  );
}
