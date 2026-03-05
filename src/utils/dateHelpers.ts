import { format, parseISO } from "date-fns";

export function formatDateWithSuffix(dateString: string): string {
  const date = parseISO(dateString);
  const day = date.getDate();
  const suffix = getOrdinalSuffix(day);
  return format(date, `d'${suffix}' MMMM yyyy`);
}

export function formatTime(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, "h:mm a");
}

function getOrdinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) return "th";
  switch (day % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
}

