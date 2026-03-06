const express = require("express");
const crypto = require("crypto");
const axios = require("axios");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      name,
      age,
      city,
      email,
      phone,
      profession,
      razorpay_payment_id,
      razorpay_payment_link_id,
      razorpay_payment_link_reference_id,
      razorpay_payment_link_status,
      razorpay_signature,
    } = req.body;

    // Verify Razorpay signature if key secret is configured
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (keySecret && razorpay_signature) {
      const body = `${razorpay_payment_link_id}|${razorpay_payment_link_reference_id}|${razorpay_payment_link_status}|${razorpay_payment_id}`;
      const expectedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(body)
        .digest("hex");

      if (razorpay_signature !== expectedSignature) {
        console.error("Razorpay signature mismatch");
        return res.status(400).json({ error: "Invalid payment signature" });
      }
    }

    // Save to Google Sheet
    await axios.post(process.env.GOOGLE_SHEET_URL, {
      name,
      age,
      city,
      email,
      phone,
      profession,
      Txnid: razorpay_payment_id,
      Amount: "99",
    });

    return res.json({ success: true });

  } catch (error) {
    console.error("Razorpay Success Route Error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
