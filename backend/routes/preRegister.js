const express = require("express");
const registrationStore = require("../store");

const router = express.Router();

router.post("/", (req, res) => {
  const { name, age, city, email, phone, profession, utm_source, utm_medium, utm_campaign, utm_term, utm_content } = req.body;

  if (!phone) {
    return res.status(400).json({ error: "Phone required" });
  }

  registrationStore.set(phone, {
    name,
    age,
    city,
    email,
    phone,
    profession,
    utm_source: utm_source || "",
    utm_medium: utm_medium || "",
    utm_campaign: utm_campaign || "",
    utm_term: utm_term || "",
    utm_content: utm_content || "",
    timestamp: Date.now(),
  });

  return res.json({ success: true });
});

module.exports = router;
