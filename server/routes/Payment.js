// Import the required modules
const express = require("express")
const router = express.Router()

const { createOrder, verifyOrder,sendSuccessMail } = require("../controllers/Payments")
const { auth, isStudent } = require("../middlewares/auth")
router.post("/capturePayment", auth,  createOrder)
router.post("/verifyPayment", auth,verifyOrder)
router.post("/sendSuccessMail", auth,sendSuccessMail)

module.exports = router;