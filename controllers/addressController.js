const Address = require("../models/Address");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.addAddress = async (req, res) => {
    try{
        console.log(req.body, "req.body");
        const { name, phoneNumber, state, city, address, postcode } = req.body;
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: "Authorization header missing or invalid"
            });
        }
        const addressInput = await Address.create({ name, phoneNumber, state, city, fullAddress: address, pincode: postcode });
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const user = await User.findByIdAndUpdate(userId, { $push: { addresses: addressInput._id } });
        return res.status(200).json({
            success: true,
            message: "Address added successfully",
            user
        });
    }catch(error){
        res.status(500).json({ 
            success: false,
            message: error.message
        });
    }
}

exports.removeAddress = async (req, res) => {
    try{
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: "Authorization header missing or invalid"
            });
        }   
        const addressId = req.query.addressId;
        await Address.findByIdAndDelete(addressId);
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const user = await User.findByIdAndUpdate(userId, { $pull: { addresses: addressId } });
        return res.status(200).json({
            success: true,
            message: "Address removed successfully",
            user
        });
    }catch(error){
        res.status(500).json({ 
            success: false,
            message: error.message
        });
    }
}

exports.editAddress = async (req, res) => {
    try{
        const { name, phoneNumber, state, city, address, postcode } = req.body;
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: "Authorization header missing or invalid"
            });
        }
        const addressId = req.query.addressId;
        const addressInput = await Address.findByIdAndUpdate(addressId, { name, phoneNumber, state, city, address, postcode });
        return res.status(200).json({
            success: true,
            message: "Address updated successfully",
            addressInput
        });
    }catch(error){
        res.status(500).json({ 
            success: false,
            message: error.message
        });
    }
}