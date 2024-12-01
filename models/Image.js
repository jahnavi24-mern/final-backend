const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('Image', imageSchema);