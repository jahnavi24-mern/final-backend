const Card = require("../models/Card");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.addPaymentMethod = async (req, res) => {
    try{
        const { cardNumber, expiryDate, cvv, nameOnCard } = req.body;
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: "Authorization header missing or invalid"
            });
        }   

        const card = await Card.create({ cardNumber, expiryDate, cvv, cardHolderName: nameOnCard });
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;  
        const user = await User.findByIdAndUpdate(userId, { $push: { cards: card._id } });
        console.log(user, "user");
        return res.status(200).json({
            success: true,
            message: "Payment method added successfully",
            user
        });
    }catch(error){
        res.status(500).json({ 
            success: false,
            message: error.message
        });
    }
}

exports.editPaymentMethod = async (req, res) => {
    try{
        const { cardNumber, expiryDate, cvv, nameOnCard } = req.body;
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: "Authorization header missing or invalid"
            });
        }
        const cardId = req.params.cardId;
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const user = await User.findByIdAndUpdate(userId, { $set: { [`cards.${cardId}.cardNumber`]: cardNumber, [`cards.${cardId}.expiryDate`]: expiryDate, [`cards.${cardId}.cvv`]: cvv, [`cards.${cardId}.nameOnCard`]: nameOnCard } });
        return res.status(200).json({
            success: true,
            message: "Payment method updated successfully",
            user
        });
    }catch(error){
        res.status(500).json({ 
            success: false,
            message: "An error occurred while editing the payment method"
        });
    }
}

exports.removePaymentMethod = async (req, res) => {
    try{
        const authHeader = req.headers.authorization;
        console.log(authHeader, "authHeader");
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: "Authorization header missing or invalid"
            });
        }
        const cardId = req.query.cardId;
        console.log(cardId, "cardId");
        await Card.findByIdAndDelete(cardId);
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const user = await User.findByIdAndUpdate(userId, { $pull: { cards: cardId } });
        console.log(user, "user");
        return res.status(200).json({
            success: true,
            message: "Payment method removed successfully",
            user
        });
    }catch(error){
        res.status(500).json({ 
            success: false,
            message: "An error occurred while removing the payment method"
        });
    }
}