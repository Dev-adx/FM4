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

const NEW_PIXEL_ID = '2224378118089593';

export function useFacebookPixel() {
  const trackEvent = useCallback(({ eventName, eventParams }: FacebookPixelEvent) => {
    if ((window as any).fbq) {
      // Track for all initialized pixels
      (window as any).fbq('track', eventName, eventParams);
      // Also track for the new pixel specifically
      (window as any).fbq('trackSingle', NEW_PIXEL_ID, eventName, eventParams);
    }
  }, []);

  return { trackEvent };
}

