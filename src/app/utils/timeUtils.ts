import { Event, EventStatus } from "../types";

export function parseTimeString(timeStr: string, dayStr: string): Date | null {
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

export function getEventStatus(event: Event, now: Date): EventStatus {
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
