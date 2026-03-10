import { useState, useEffect } from "react";
import { FaCalendarAlt, FaClock, FaGlobe, FaWhatsapp } from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";
import { useWorkshopConfig } from "@/hooks/useWorkshopConfig";
import { formatDateWithSuffix, formatTime } from "@/utils/dateHelpers";

const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbw-8ZeUX30P8KkyCMd450FeiCFBID-NNAC12mB903pcmblxV5A2pwRqQsR5RY8_IviBYA/exec";

const BACKEND_URL = "https://fm4.onrender.com";

// All active pixel IDs for PageView
const PIXEL_IDS = [
  '945210531500711',
  '1278108320936716',
  '2224378118089593'
];


const ThankYou = () => {
  const { config } = useWorkshopConfig();
  const [confetti] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentId = params.get("razorpay_payment_id");
    const paymentLinkStatus = params.get("razorpay_payment_link_status");

    // Fire pixel PageView on thank-you page for all pixel IDs
    if ((window as any).fbq) {
      PIXEL_IDS.forEach((pixelId) => {
        (window as any).fbq('init', pixelId);
        (window as any).fbq('trackSingle', pixelId, 'PageView');
      });
    }

    if (paymentId && paymentLinkStatus === "paid") {
      // Fire Purchase event for specific pixel IDs only
      if ((window as any).fbq) {
        ['1278108320936716', '2224378118089593'].forEach((pixelId) => {
          (window as any).fbq('trackSingle', pixelId, 'Purchase', {
            value: 99,
            currency: "INR"
          });
        });
      }

      const saved = localStorage.getItem("lastRegistration");
      const formData = saved ? JSON.parse(saved) : {};

      // Extract UTM parameters from localStorage
      const utmData = {
        utm_source: formData.utm_source || "",
        utm_medium: formData.utm_medium || "",
        utm_campaign: formData.utm_campaign || "",
        utm_term: formData.utm_term || "",
        utm_content: formData.utm_content || "",
      };

      // Post directly to Google Sheet — no backend cold start
      fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          name: formData.fullName || "",
          city: formData.city || "",
          email: formData.email || "",
          phone: formData.phone || "",
          age: formData.age || "",
          profession: "",
          txnid: paymentId,
          amount: "99",
          source: formData.source || "direct",
          ...utmData,
        }),
      }).catch(console.error);

      // Also notify backend (for backup/analytics)
      fetch(`${BACKEND_URL}/api/razorpay-success`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName || "",
          email: formData.email || "",
          phone: formData.phone || "",
          city: formData.city || "",
          age: formData.age || "",
          profession: "",
          razorpay_payment_id: paymentId,
          ...utmData,
        }),
      }).catch(console.error);
    }

    localStorage.removeItem("lastRegistration");
  }, []);

  const day1 = config.day1_datetime;
  const day2 = config.day2_datetime;
  const whatsappLink = config.whatsapp_link;

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">

        {confetti && (
          <div className="flex justify-center mb-6 animate-fade-in">
            <GiPartyPopper className="text-6xl text-primary" />
          </div>
        )}

        <h1 className="text-3xl md:text-4xl font-black mb-4">
          <span className="text-gradient bg-clip-text text-fill-transparent bg-gradient-to-r from-primary to-green-600">Thank You!</span>
        </h1>

        <p className="text-lg font-semibold mb-2">
          Aapki Seat Successfully Book Ho Gayi Hai!
        </p>

        <p className="text-muted-foreground mb-8">
          Workshop details aapke email pe bhej diye jayenge.
        </p>

        {/* Workshop Details */}
        <div className="card-gradient border border-primary/30 rounded-2xl p-6 shadow-glow mb-8 text-left space-y-4">

          <div className="flex items-center gap-3">
            <FaCalendarAlt className="text-primary text-lg" />
            <span className="text-sm">
              {formatDateWithSuffix(day1)} & {formatDateWithSuffix(day2)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <FaClock className="text-primary text-lg" />
            <span className="text-sm">
              Day 1: {formatTime(day1)} | Day 2: {formatTime(day2)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <FaGlobe className="text-primary text-lg" />
            <span className="text-sm">
              Online Live Workshop (Hindi & English)
            </span>
          </div>

        </div>

        {/* WhatsApp Button */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground font-bold px-8 py-3 rounded-xl shadow-glow hover:scale-105 transition-transform"
        >
          <FaWhatsapp />
          Whatsapp Group Join Karein →
        </a>

      </div>
    </div>
  );
};

export default ThankYou;

