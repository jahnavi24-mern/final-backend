const express = require("express");
const router = express.Router();
const { addPaymentMethod, editPaymentMethod, removePaymentMethod } = require("../controllers/paymentController");

router.post("/add-payment-method", addPaymentMethod);
router.post("/edit-payment-method", editPaymentMethod);
router.post("/remove-payment-method", removePaymentMethod);

module.exports = router;