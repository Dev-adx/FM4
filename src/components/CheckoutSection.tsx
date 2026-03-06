import { useState } from "react";
import { Shield, Lock, Loader2 } from "lucide-react";

const BACKEND_URL = "https://fm4.onrender.com";

const CheckoutSection = () => {
  const [form, setForm] = useState({
    fullName: "", email: "", city: "", phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
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
    if (!form.phone.trim()) {
      newErrors.phone = "WhatsApp number is required";
    } else if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Please enter a valid 10-digit WhatsApp number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if ((window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout');
    }

    setIsLoading(true);

    const phoneNumber = form.phone.replace(/\D/g, '');
    const razorpayParams = new URLSearchParams({
      name: form.fullName,
      email: form.email,
      contact: `+91${phoneNumber}`,
      "notes[city]": form.city,
    });
    const razorpayUrl = `https://rzp.io/rzp/pOMBaZk2?${razorpayParams.toString()}`;

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(`${BACKEND_URL}/api/pre-register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.fullName.trim(),
          email: form.email,
          phone: phoneNumber,
          city: form.city,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      const data = await response.json();

      if (data.payment_link) {
        window.open(data.payment_link, '_self');
      } else if (data.url) {
        window.open(data.url, '_self');
      } else {
        window.open(razorpayUrl, '_self');
      }
    } catch (error) {
      console.error("Payment error:", error);
      window.open(razorpayUrl, '_self');
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  return (
    <section id="checkout" className="bg-section-green py-14">
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
                <span className="font-bold">₹99.00</span>
              </div>
              <div className="border-t pt-2 flex justify-between items-center">
                <span className="font-heading font-bold">Total</span>
                <div className="text-right">
                  <span className="line-through text-muted-foreground text-sm mr-2">₹499.00</span>
                  <span className="font-heading font-bold text-xl text-primary">₹99.00</span>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-cta hover:bg-cta-hover text-cta-foreground rounded-xl py-4 font-heading font-bold text-lg transition-all shadow-cta disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Processing...
                </>
              ) : (
                "Book your Seat — ₹99.00"
              )}
            </button>

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
