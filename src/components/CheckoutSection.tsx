import { useState } from "react";
import { Shield, Lock } from "lucide-react";
import CheckoutButton from "./CheckoutButton";
import { trackAddToCart, trackFormSubmit } from "@/utils/gtm";
import { CURRENCY_SYMBOL, DISCOUNTED_PRICE, OG_PRICE, PRODUCT } from "@/utils/product-info";

const BACKEND_URL = "https://fm4.onrender.com";
const RAZORPAY_PAYMENT_LINK = "https://pages.razorpay.com/pl_SNdaFjyAcdeV7O/view";

// All active pixel IDs (917762147387547 only fires on fm4.co.in)
const PIXEL_IDS = [
  '945210531500711',
  '1278108320936716',
  '2224378118089593',
  ...(window.location.hostname.includes('fm4.co.in') ? ['917762147387547'] : []),
];

const CheckoutSection = () => {
const [form, setForm] = useState({
    fullName: "", email: "", city: "", phone: "", age: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.age.trim()) {
      newErrors.age = "Age is required";
    } else if (!/^\d{2}$/.test(form.age) || parseInt(form.age) < 18 || parseInt(form.age) > 99) {
      newErrors.age = "Please enter a valid age (18-99)";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "WhatsApp number is required";
    } else if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Please enter a valid 10-digit WhatsApp number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    trackFormSubmit({
        formName: "CheckoutForm",
        formData: {
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          city: form.city,
          age: form.age,
        }
      });

      trackAddToCart(PRODUCT); 

    // Capture all UTM parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams = {
      utm_source: urlParams.get("utm_source") || "",
      utm_medium: urlParams.get("utm_medium") || "",
      utm_campaign: urlParams.get("utm_campaign") || "",
      utm_term: urlParams.get("utm_term") || "",
      utm_content: urlParams.get("utm_content") || "",
    };

    // Determine primary source for tracking
    const source =
      utmParams.utm_source ||
      urlParams.get("source") ||
      document.referrer ||
      "direct";

    // Save to localStorage for ThankYou page (include all UTM params)
    localStorage.setItem("lastRegistration", JSON.stringify({ 
      ...form, 
      source,
      ...utmParams 
    }));

    // Fire-and-forget to backend (include UTM params)
    fetch(`${BACKEND_URL}/api/pre-register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.fullName.trim(),
        email: form.email,
        phone: form.phone.replace(/\D/g, ''),
        city: form.city,
        age: form.age,
        utm_source: utmParams.utm_source,
        utm_medium: utmParams.utm_medium,
        utm_campaign: utmParams.utm_campaign,
        utm_term: utmParams.utm_term,
        utm_content: utmParams.utm_content,
      }),
    }).catch(console.error);

    // Track Facebook pixel - AddToCart for all pixel IDs (form CTA)
    if ((window as any).fbq) {
      PIXEL_IDS.forEach((pixelId) => {
        (window as any).fbq('trackSingle', pixelId, 'AddToCart', {
          value: 99,
          currency: "INR"
        });
      });
    }

    // Redirect with prefilled params after short delay to let pixel fire
    // pages.razorpay.com uses full_name and phone (not name/contact)
    const params = new URLSearchParams({
      full_name: form.fullName,
      email: form.email,
      phone: form.phone.replace(/\D/g, ''),
      city: form.city,
      age: form.age,
    });

    setTimeout(() => {
      window.location.href = `${RAZORPAY_PAYMENT_LINK}?${params.toString()}`;
    }, 300);
  };

  return (
    <section id="checkout" className="bg-section-green py-8">
      <div className="container max-w-2xl">
        <h2 className="text-2xl md:text-4xl font-heading font-bold text-center mb-8">
          Book FM4 Workshop
        </h2>

        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-lg border">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold mb-1">Full Name *</label>
              <input
                id="fullName"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className={`w-full rounded-lg border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary/30 outline-none ${errors.fullName ? 'border-red-500' : ''}`}
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-1">Email *</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full rounded-lg border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary/30 outline-none ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

<div>
              <label htmlFor="city" className="block text-sm font-semibold mb-1">Town / City *</label>
              <input
                id="city"
                name="city"
                value={form.city}
                onChange={handleChange}
                className={`w-full rounded-lg border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary/30 outline-none ${errors.city ? 'border-red-500' : ''}`}
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-semibold mb-1">Age *</label>
<input
                id="age"
                name="age"
                type="number"
                value={form.age}
                onChange={handleChange}
                className={`w-full rounded-lg border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary/30 outline-none ${errors.age ? 'border-red-500' : ''}`}
              />
              {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold mb-1">WhatsApp Number *</label>
              <div className="flex gap-2">
                <span className="flex items-center bg-muted rounded-lg px-3 text-sm font-semibold">+91</span>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  className={`w-full rounded-lg border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary/30 outline-none ${errors.phone ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            {/* Order summary */}
            <div className="bg-muted rounded-xl p-4 mt-4">
              <h3 className="font-heading font-bold mb-3">Order Summary</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Ticket for Pain Free with FM4 Workshop × 1</span>
                <span className="font-bold">{CURRENCY_SYMBOL}{DISCOUNTED_PRICE.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between items-center">
                <span className="font-heading font-bold">Total</span>
                <div className="text-right">
                  <span className="line-through text-muted-foreground text-sm mr-2">{CURRENCY_SYMBOL}{OG_PRICE.toFixed(2)}</span>
                  <span className="font-heading font-bold text-xl text-primary">{CURRENCY_SYMBOL}{DISCOUNTED_PRICE.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* <button
              type="submit"
              className="w-full bg-cta hover:bg-cta-hover text-cta-foreground rounded-xl py-4 font-heading font-bold text-lg transition-all shadow-cta flex items-center justify-center gap-2"
            >
              Place Your Order — ₹99.00
            </button> */}

            <CheckoutButton label="Place Your Order — " ctaLocation="CheckoutSection"/>

            <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
              <Lock size={14} />
              <span>100% Secure & Safe Payments</span>
              <Shield size={14} />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CheckoutSection;
