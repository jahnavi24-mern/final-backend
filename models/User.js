const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        default: "Male",
        enum: ["Male", "Female", "Other"],
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    addresses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
    }],
    cards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card",
    }],
});

module.exports = mongoose.model("User", userSchema);