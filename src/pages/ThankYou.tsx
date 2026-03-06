import { useState, useEffect } from "react";
import { FaCalendarAlt, FaClock, FaGlobe, FaWhatsapp } from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";
import { useWorkshopConfig } from "@/hooks/useWorkshopConfig";
import { formatDateWithSuffix, formatTime } from "@/utils/dateHelpers";

const ThankYou = () => {
  const { config } = useWorkshopConfig();
  const [confetti] = useState(true);

  useEffect(() => {
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

