import { useState, useEffect } from "react";

interface WorkshopConfig {
  day1_datetime: string;
  day2_datetime: string;
  whatsapp_link: string;
}

const defaultConfig: WorkshopConfig = {
  day1_datetime: "2026-02-21T20:00:00",
  day2_datetime: "2026-02-22T10:00:00",
  whatsapp_link: "https://chat.whatsapp.com/EYhPWBybzoO2xP35GbKKJ0",
};

export function useWorkshopConfig() {
  const [config, setConfig] = useState<WorkshopConfig | null>(null);

  useEffect(() => {
    // In a real app, this would fetch from an API
    // For now, we'll use the default config
    setConfig(defaultConfig);
  }, []);

  return { config };
}

