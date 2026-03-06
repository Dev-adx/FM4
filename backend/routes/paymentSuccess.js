const express = require("express");
const crypto = require("crypto");
const axios = require("axios");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      status,
      firstname,
      email,
      phone,
      productinfo,
      txnid,
      amount,
      hash,
      udf1,
      udf2,
      udf3
    } = req.body;

    const salt = process.env.EASEBUZZ_SALT;

    // 🔐 Verify hash from Easebuzz
    const hashString = `${salt}|${status}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}`;
    const generatedHash = crypto
      .createHash("sha512")
      .update(hashString)
      .digest("hex");

    if (hash !== generatedHash) {
      return res.status(400).send("Invalid payment verification");
    }

    // ❌ If payment failed
    if (status !== "success") {
      return res.redirect(process.env.FRONTEND_URL + "/payment-failed");
    }

    // ✅ Save to Google Sheet AFTER success
    try {
      await axios.post(process.env.GOOGLE_SHEET_URL, {
        name: firstname,
        age: udf1,
        city: udf2,
        bookingFor: udf3,
        email,
        phone,
        txnid,
        amount
      });
    } catch (sheetError) {
      console.error("Google Sheet Error:", sheetError.message);
      // Don't block user redirect if sheet fails
    }

    // ✅ Redirect to thank you page
    return res.redirect(process.env.FRONTEND_URL + "/thank-you-fb");

  } catch (error) {
    console.error("Payment Success Route Error:", error.message);
    return res.redirect(process.env.FRONTEND_URL + "/payment-failed");
  }
});

module.exports = router;
