import { format, parseISO } from "date-fns";

export const formatHour = (hour: number) => `${hour % 12 || 12}:00 ${hour % 24 < 12 ? "AM" : "PM"}`;

// "09:00" + 3 hours -> "9:00 AM – 12:00 PM"
export const formatTimeRange = (startTime: string, hours: number) => {
  const start = Number(startTime.split(":")[0]);
  return `${formatHour(start)} – ${formatHour(start + hours)}`;
};

export const formatDate = (date: string) => {
  try {
    return format(parseISO(date), "EEE, MMM d, yyyy");
  } catch {
    return date;
  }
};
