import { createRoot } from "react-dom/client";
import TagManager from "react-gtm-module";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

const hostname = window.location.hostname;
const gtmId = hostname.includes("sourobhkulkorni.com")
  ? import.meta.env.VITE_GTM_ID_SOUROBH
  : import.meta.env.VITE_GTM_ID_FM4;

TagManager.initialize({
  gtmId,
  dataLayer: {
    app_version: "1.0.0",
    environment: import.meta.env.MODE,
  },
});