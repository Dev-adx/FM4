import { useCallback } from 'react';

interface EventParams {
  value: number;
  currency: string;
  [key: string]: any;
}

interface FacebookPixelEvent {
  eventName: string;
  eventParams?: EventParams;
}

// All active pixel IDs
const PIXEL_IDS = [
  '945210531500711',
  '1278108320936716',
  '2224378118089593'
];

// Events that should only fire once per page session
const ONCE_PER_SESSION_EVENTS = new Set(['AddToCart']);
const firedEvents = new Set<string>();

export function useFacebookPixel() {
  const trackEvent = useCallback(({ eventName, eventParams }: FacebookPixelEvent) => {
    if (ONCE_PER_SESSION_EVENTS.has(eventName) && firedEvents.has(eventName)) return;
    if (ONCE_PER_SESSION_EVENTS.has(eventName)) firedEvents.add(eventName);

    if ((window as any).fbq) {
      PIXEL_IDS.forEach((pixelId) => {
        (window as any).fbq('trackSingle', pixelId, eventName, eventParams);
      });
    }
  }, []);

  return { trackEvent };
}

