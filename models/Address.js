const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    state:{
        type: String,
        enum: ["Himachal Pradesh", "Punjab", "Jammu and Kashmir", "Chandigarh", "Delhi", "Haryana", "Uttar Pradesh", "Uttarakhand", "Rajasthan", "Gujarat", "Maharashtra", "Madhya Pradesh", "Chhattisgarh", "West Bengal", "Bihar", "Jharkhand", "Odisha", "Andhra Pradesh", "Karnataka", "Tamil Nadu", "Kerala", "Goa", "Puducherry", "Andaman and Nicobar Islands", "Chandigarh", "Lakshadweep", "Telangana"],
    },
    city:{
        type: String,
        required: true
    },
    pincode:{
        type: String,
    },
    phoneNumber:{
        type: String,
    },
    fullAddress: {
        type: String,
    },
    name: {
        type: String,
    }
});

module.exports = mongoose.model("Address", addressSchema);