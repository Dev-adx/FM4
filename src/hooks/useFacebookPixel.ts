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

export function useFacebookPixel() {
  const trackEvent = useCallback(({ eventName, eventParams }: FacebookPixelEvent) => {
    if ((window as any).fbq) {
      // Track for all initialized pixels
      (window as any).fbq('track', eventName, eventParams);
      // Also track for each pixel ID specifically
      PIXEL_IDS.forEach((pixelId) => {
        (window as any).fbq('trackSingle', pixelId, eventName, eventParams);
      });
    }
  }, []);

  return { trackEvent };
}

