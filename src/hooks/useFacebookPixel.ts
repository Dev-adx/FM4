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

export function useFacebookPixel() {
  const trackEvent = useCallback(({ eventName, eventParams }: FacebookPixelEvent) => {
    if ((window as any).fbq) {
      (window as any).fbq('track', eventName, eventParams);
    }
  }, []);

  return { trackEvent };
}

