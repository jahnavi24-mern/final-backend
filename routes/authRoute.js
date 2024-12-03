const express = require("express");
const { signup, signin, getProfile, editProfile } = require("../controllers/authController");
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/get-profile", getProfile);
router.post("/edit-profile", editProfile);

module.exports = router;