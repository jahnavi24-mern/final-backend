const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    name: 
    { 
        type: String, 
        required: true 
    },
    image: {
        type: String,
        // required: true
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        // required: true
    }],
    rating: {
        type: Number,
        required: true
    },
    offers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Offer",
    }]
});

module.exports = mongoose.model("Restaurant", restaurantSchema);