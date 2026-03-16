import { useCallback } from 'react';

// All active pixel IDs
const hostname = window.location.hostname;
const PIXEL_IDS = [
  '945210531500711',
  '1278108320936716',
  '2224378118089593',
  ...(hostname.includes('fm4.co.in') ? ['917762147387547'] : []),
];

interface EventParams {
  value: number;
  currency: string;
  [key: string]: any;
}

interface FacebookPixelEvent {
  eventName: string;
  eventParams?: EventParams;
}

export function useFacebookPixel() {
  // Track to default pixel (for backward compatibility)
  const trackEvent = useCallback(({ eventName, eventParams }: FacebookPixelEvent) => {
    if ((window as any).fbq) {
      (window as any).fbq('track', eventName, eventParams);
    }
  }, []);

  // Track event to all pixel IDs
  const trackEventAllPixels = useCallback(({ eventName, eventParams }: FacebookPixelEvent) => {
    if ((window as any).fbq) {
      PIXEL_IDS.forEach((pixelId) => {
        (window as any).fbq('trackSingle', pixelId, eventName, eventParams);
      });
    }
  }, []);

  return { trackEvent, trackEventAllPixels, PIXEL_IDS };
}
