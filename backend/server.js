require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3001;

// Allow requests from your frontend domain
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Raw body needed for Razorpay webhook signature verification
app.use(
  "/api/razorpay-webhook",
  bodyParser.raw({ type: "application/json" })
);

// JSON parser for all other routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/pre-register", require("./routes/preRegister"));
app.use("/api/razorpay-webhook", require("./routes/razorpayWebhook"));

// Health check
app.get("/", (req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
