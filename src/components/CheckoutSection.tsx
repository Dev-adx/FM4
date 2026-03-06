import { useState } from "react";
import { Shield, Lock, Loader2 } from "lucide-react";
import { useWorkshopConfig } from "@/hooks/useWorkshopConfig";

const CheckoutSection = () => {
  const { config } = useWorkshopConfig();
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", city: "", phone: "", bookingFor: "myself",
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
    
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if ((window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout');
    }

    setIsLoading(true);

    const fullName = `${form.firstName} ${form.lastName}`.trim();
    const phoneNumber = form.phone.replace(/\D/g, '');

    const params = new URLSearchParams({
      name: fullName,
      email: form.email,
      contact: `+91${phoneNumber}`,
    });

    window.open(`${config.payment_link}?${params.toString()}`, '_self');
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <section id="checkout" className="bg-section-green py-14">
      <div className="container max-w-2xl">
        <h2 className="text-2xl md:text-4xl font-heading font-bold text-center mb-8">
          Book FM4 Workshop
        </h2>

        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-lg border">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold mb-1">First name *</label>
                <input
                  id="firstName"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className={`w-full rounded-lg border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary/30 outline-none ${errors.firstName ? 'border-red-500' : ''}`}
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold mb-1">Last name *</label>
                <input
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className={`w-full rounded-lg border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary/30 outline-none ${errors.lastName ? 'border-red-500' : ''}`}
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
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
              <label htmlFor="phone" className="block text-sm font-semibold mb-1">Phone *</label>
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

            <div>
              <label className="block text-sm font-semibold mb-1">Booking for *</label>
              <div className="flex gap-4">
                {["myself", "loved-one"].map((v) => (
                  <label key={v} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="bookingFor" value={v} checked={form.bookingFor === v} onChange={handleChange} className="accent-primary" />
                    <span className="text-sm capitalize">{v === "loved-one" ? "Loved One" : "Myself"}</span>
                  </label>
                ))}
              </div>
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
