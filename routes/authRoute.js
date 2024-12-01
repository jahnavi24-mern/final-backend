const express = require("express");
const { signup, signin, getProfile, editProfile, addAddress, editAddress, removeAddress, addPaymentMethod, editPaymentMethod, removePaymentMethod } = require("../controllers/authController");
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/get-profile", getProfile);
router.post("/edit-profile", editProfile);

router.post("/add-address", addAddress);
router.post("/edit-address", editAddress);
router.post("/remove-address", removeAddress);

router.post("/add-payment-method", addPaymentMethod);
router.post("/edit-payment-method", editPaymentMethod);
router.post("/remove-payment-method", removePaymentMethod);

module.exports = router;