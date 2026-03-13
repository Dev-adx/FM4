import { useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useWorkshopConfig } from "@/hooks/useWorkshopConfig";
import { trackPurchase } from "@/utils/gtm";
import { ORDER } from "@/utils/product-info";

const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbw-8ZeUX30P8KkyCMd450FeiCFBID-NNAC12mB903pcmblxV5A2pwRqQsR5RY8_IviBYA/exec";

const BACKEND_URL = "https://fm4.onrender.com";

const ThankYou = () => {
  const { config } = useWorkshopConfig();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentId = params.get("razorpay_payment_id");

      const alreadyTracked = localStorage.getItem(`tracked_${paymentId}`);
      if (alreadyTracked) return;

      trackPurchase({
      ...ORDER,
      transaction_id: paymentId || `txn_${Date.now()}`,
    })

    localStorage.setItem(`tracked_${paymentId}`, "true");

    // Fire Purchase event for specific pixel IDs on every thank-you page load
    if ((window as any).fbq) {
      ['945210531500711', '1278108320936716', '2224378118089593'].forEach((pixelId) => {
        (window as any).fbq('trackSingle', pixelId, 'Purchase', {
          value: 99,
          currency: "INR"
        });
      });
    }
    
    if (paymentId) {
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

  const whatsappLink = config.whatsapp_link;

  return (
    <div className="min-h-screen bg-plus-pattern flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center py-16">

        <p className="text-base font-semibold mb-4">Woohoo! 🎉</p>

        <h1 className="text-3xl md:text-5xl font-heading font-black text-foreground mb-6">
          You have Successfully Registered!
        </h1>

        <h2 className="text-2xl md:text-5xl font-heading font-black text-primary mb-6">
          Just 1 More Step Remaining
        </h2>

        <p className="text-base md:text-lg mb-4">
          <span className="text-red-500 font-bold">Caution:</span>{" "}
          This Step is very important so that you Do Not Miss Out on the Session!
        </p>

        <p className="text-base md:text-lg font-bold mb-8">
          Join the Exclusive Announcement Community{" "}
          <span className="text-primary font-bold">to get notified for everything</span>
        </p>

      
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full max-w-xl mx-auto bg-yellow-400 hover:bg-yellow-500 text-black font-heading font-bold text-lg md:text-xl py-3 px-8 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <FaWhatsapp className="inline mr-2 text-xl" />Click Here to Join Our WhatsApp Community Now
        </a>

      </div>
    </div>
  );
};

export default ThankYou;

