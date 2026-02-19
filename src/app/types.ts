export interface Event {
  startTime: string;
  endTime: string;
  activity: string;
  location: string;
  day: string;
}

export type EventStatus = "past" | "active" | "upcoming";
