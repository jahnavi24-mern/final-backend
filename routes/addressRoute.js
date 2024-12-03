const express = require("express");
const router = express.Router();

const { addAddress, editAddress, removeAddress } = require("../controllers/addressController");

router.post("/add-address", addAddress);
router.post("/edit-address", editAddress);
router.post("/remove-address", removeAddress);

module.exports = router;