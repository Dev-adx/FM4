/// <reference types="vite/client" />

interface Window {
  fbq: (command: string, ...args: any[]) => void;
}

