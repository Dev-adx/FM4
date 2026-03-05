import { useState } from "react";
import { Shield, Lock } from "lucide-react";

const CheckoutSection = () => {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", city: "", phone: "", bookingFor: "myself",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section id="checkout" className="bg-section-green py-14">
      <div className="container max-w-2xl">
        <h2 className="text-2xl md:text-4xl font-heading font-bold text-center mb-8">
          Book FM4 Workshop
        </h2>

        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-lg border">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">First name *</label>
                <input name="firstName" value={form.firstName} onChange={handleChange} className="w-full rounded-lg border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary/30 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Last name *</label>
                <input name="lastName" value={form.lastName} onChange={handleChange} className="w-full rounded-lg border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary/30 outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Email *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full rounded-lg border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary/30 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Town / City *</label>
              <input name="city" value={form.city} onChange={handleChange} className="w-full rounded-lg border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary/30 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Phone *</label>
              <div className="flex gap-2">
                <span className="flex items-center bg-muted rounded-lg px-3 text-sm font-semibold">+91</span>
                <input name="phone" type="tel" value={form.phone} onChange={handleChange} className="w-full rounded-lg border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary/30 outline-none" />
              </div>
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
              <h4 className="font-heading font-bold mb-3">Order Summary</h4>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Ticket for Pain Free with FM4 Workshop × 1</span>
                <span className="font-bold">₹97.00</span>
              </div>
              <div className="border-t pt-2 flex justify-between items-center">
                <span className="font-heading font-bold">Total</span>
                <div className="text-right">
                  <span className="line-through text-muted-foreground text-sm mr-2">₹499.00</span>
                  <span className="font-heading font-bold text-xl text-primary">₹97.00</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-cta hover:bg-cta-hover text-cta-foreground rounded-xl py-4 font-heading font-bold text-lg transition-all shadow-cta">
              Place Your Order — ₹97.00
            </button>

            <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
              <Lock size={14} />
              <span>100% Secure & Safe Payments</span>
              <Shield size={14} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutSection;
