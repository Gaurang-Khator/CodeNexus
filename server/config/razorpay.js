// const Razorpay=require('razorpay');

// require("dotenv").config();

// exports.instance=new Razorpay(
//     { key_id: process.env.KEY_ID,
//      key_secret: process.env.KEY_SECRET
//     })

const Razorpay = require('razorpay');

if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  // use razorpay instance
} else {
  console.warn('⚠️ Razorpay not configured. RAZORPAY_KEY_ID or KEY_SECRET is missing.');
}
