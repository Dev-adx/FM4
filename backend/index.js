require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const razorpayWebhook = require("./routes/razorpayWebhook");
const razorpaySuccess = require("./routes/razorpaySuccess");
const preRegister = require("./routes/preRegister");

const app = express();

app.use(cors());

// Webhook MUST use raw body for signature verification — registered before JSON parser
app.use("/api/razorpay-webhook", express.raw({ type: "application/json" }), razorpayWebhook);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/pre-register", preRegister);
app.use("/api/razorpay-success", razorpaySuccess);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
