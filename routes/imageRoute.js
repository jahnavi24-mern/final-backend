const express = require("express");
const { uploadImageToDB, getImage } = require('../controllers/imageController');
const upload = require('../utils/imageUploader')

const router = express.Router();

router
.route("/image")
.post(
    upload.single("image"),
    uploadImageToDB
    );

router
.route("/image")
.get(getImage);

module.exports = router;