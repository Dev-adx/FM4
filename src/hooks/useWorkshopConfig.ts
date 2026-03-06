import { useState, useEffect } from "react";

interface WorkshopConfig {
  day1_datetime: string;
  day2_datetime: string;
  whatsapp_link: string;
  payment_link: string;
}

const defaultConfig: WorkshopConfig = {
  day1_datetime: "2026-03-07T20:00:00",
  day2_datetime: "2026-03-08T10:00:00",
  whatsapp_link: "https://chat.whatsapp.com/LstNYqmqemz51zgzgGYazi",
  payment_link: "https://rzp.io/rzp/vhef5ncx",
};

const SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbzpttKDUxieudBnZV1NwfQFtAaBvLvIU5zpip5NKfhzlVqQrDO7tR2VIi8e-j1cgVXjkA/exec";

const CACHE_KEY = "workshopConfig";

// Converts Google Sheets date "3/7/2026 20:00:00" → "2026-03-07T20:00:00"
function normalizeDate(value: string): string {
  if (/^\d{1,2}\/\d{1,2}\/\d{4}/.test(value)) {
    const [datePart, timePart = "00:00:00"] = value.split(" ");
    const [month, day, year] = datePart.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T${timePart}`;
  }
  return value;
}

function getCachedConfig(): WorkshopConfig | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function useWorkshopConfig() {
  const [config, setConfig] = useState<WorkshopConfig>(
    () => getCachedConfig() ?? defaultConfig
  );

  useEffect(() => {
    fetch(SHEETS_URL)
      .then((res) => res.json())
      .then((data: Record<string, string>) => {
        const fresh: WorkshopConfig = {
          day1_datetime: data.day1_datetime ? normalizeDate(data.day1_datetime) : defaultConfig.day1_datetime,
          day2_datetime: data.day2_datetime ? normalizeDate(data.day2_datetime) : defaultConfig.day2_datetime,
          whatsapp_link: data.whatsapp_link || defaultConfig.whatsapp_link,
          payment_link: data.payment_link || defaultConfig.payment_link,
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(fresh));
        setConfig(fresh);
      })
      .catch(() => {
        // silently fall back to cached/defaults if fetch fails
      });
  }, []);

  return { config };
}
