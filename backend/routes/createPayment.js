const express = require("express");
const crypto = require("crypto");

const router = express.Router();

router.post("/", (req, res) => {
  const { name, email, phone, age, city, profession } = req.body;

  const key = process.env.EASEBUZZ_KEY;
  const salt = process.env.EASEBUZZ_SALT;

  console.log("EASEBUZZ KEY BEING USED:", key);

  const txnid = "FM4" + Date.now();
  const amount = "99";
  const productinfo = "FM4 Workshop";

  const udf1 = age || "";
  const udf2 = city || "";
  const udf3 = profession || "";

  const hashString =
    `${key}|${txnid}|${amount}|${productinfo}|${name}|${email}|${udf1}|${udf2}|${udf3}||||||${salt}`;

  const hash = crypto.createHash("sha512").update(hashString).digest("hex");

  res.json({
    key,
    txnid,
    amount,
    productinfo,
    firstname: name,
    email,
    phone,
    surl: `${process.env.BASE_URL}/api/payment-success`,
    furl: `${process.env.FRONTEND_URL}/payment-failed`,
    hash,
    udf1,
    udf2,
    udf3
  });
});

module.exports = router;
