const express = require("express");
const crypto = require("crypto");
const axios = require("axios");
const registrationStore = require("../store");

const router = express.Router();

// Helper to normalize phone: strip country code and non-digits
function normalizePhone(contact) {
  if (!contact) return "";
  return contact.replace(/^\+91/, "").replace(/\D/g, "").slice(-10);
}

router.post("/", async (req, res) => {
  try {
    // Verify Razorpay webhook signature
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers["x-razorpay-signature"];

    if (webhookSecret && signature) {
      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(req.body) // raw body required for correct hash
        .digest("hex");

      if (signature !== expectedSignature) {
        console.error("Webhook signature mismatch");
        return res.status(400).json({ error: "Invalid signature" });
      }
    }

    const payload = JSON.parse(req.body.toString());
    const event = payload.event;

    console.log("Razorpay Webhook Event:", event);

    if (event === "payment.captured" || event === "payment_link.paid") {
      const payment = payload.payload.payment.entity;
      const paymentLink = payload.payload.payment_link?.entity;

      // Log full entities to find exact occupation field path
      console.log("Payment entity:", JSON.stringify(payment, null, 2));
      console.log("Payment link entity:", JSON.stringify(paymentLink, null, 2));

      const paymentId = payment.id;
      const amount = (payment.amount / 100).toString();
      const email = payment.email || "";
      const phone = normalizePhone(payment.contact);

      // Look up pre-saved form data by phone number (FB form flow)
      const formData = registrationStore.get(phone) || {};

      // For non-FB flow (direct Razorpay), all data comes from the payment_link entity
      // customer_details has name/email/contact; notes has custom fields (age, city, occupation)
      const rzName =
        paymentLink?.customer_details?.name ||
        payment.notes?.full_name ||
        "";
      const rzAge =
        paymentLink?.notes?.Age ||
        paymentLink?.notes?.age ||
        payment.notes?.Age ||
        payment.notes?.age ||
        "";
      const rzCity =
        paymentLink?.notes?.city ||
        paymentLink?.notes?.City ||
        payment.notes?.city ||
        "";
      const rzOccupation =
        paymentLink?.notes?.["Your occupation"] ||
        paymentLink?.notes?.["Your Occupation"] ||
        paymentLink?.notes?.occupation ||
        paymentLink?.notes?.Occupation ||
        paymentLink?.notes?.profession ||
        payment.notes?.["Your occupation"] ||
        payment.notes?.["Your Occupation"] ||
        payment.notes?.occupation ||
        payment.notes?.Occupation ||
        payment.notes?.profession ||
        "";

      const row = {
        name: formData.name || rzName,
        age: formData.age || rzAge,
        city: formData.city || rzCity,
        email: formData.email || email,
        phone: formData.phone || phone,
        profession: formData.profession || rzOccupation,
        Txnid: paymentId,
        Amount: amount,
      };

      await axios.post(process.env.GOOGLE_SHEET_URL, row);
      console.log("Saved to Google Sheet:", paymentId);

      // Clean up pre-saved entry
      if (phone) registrationStore.delete(phone);
    }

    // Always return 200 — Razorpay retries if it gets anything else
    return res.json({ status: "ok" });

  } catch (error) {
    console.error("Webhook Error:", error.message);
    // Return 200 even on error to prevent Razorpay retry loops
    return res.json({ status: "ok" });
  }
});

module.exports = router;
