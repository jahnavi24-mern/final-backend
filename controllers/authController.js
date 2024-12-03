require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    const { name, email, password, phone } = req.body;

    try{
        const existingEmail = await User.findOne({ email });
        if(existingEmail){
            return res.status(400).json({
                success: false,
                message: "User with this email already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ fullName: name, email, password: hashedPassword, phoneNumber: phone});
        console.log("newUser", newUser);

        return res.status(201).json({
            success: true,
            message: "User created successfully",
        })

    }catch(error){
        res.status(500).json({ 
            success: false,
            message: "An error occurred while signing up"
         });
    }
}

exports.signin = async (req, res) => {
    const { email, password } = req.body;

    try{
        const user = await User.findOne({ email: email });
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User with this email does not exist"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            })
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
        return res.status(200).json({
            success: true,
            message: "User signed in successfully",
            token,
            user
        })

    }catch(error){
        res.status(500).json({ 
            success: false,
            message: "An error occurred while signing in"
         });
    }
}

exports.getProfile = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: "Authorization header missing or invalid"
            });
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        
        const user = await User.findById(userId).populate("cards").populate("addresses");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            user
        });
    } catch(error) {
        console.error("Profile Error:", error.message);
        res.status(500).json({ 
            success: false,
            message: "An error occurred while getting the profile"
        });
    }
}

exports.editProfile = async (req, res) => {
    try{
        const { fullName, phoneNumber, email, gender, country } = req.body;
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: "Authorization header missing or invalid"
            });
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const user = await User.findByIdAndUpdate(userId, { fullName, phoneNumber, email, gender, country });
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user
        });
    }catch(error){
        res.status(500).json({ 
            success: false,
            message: "An error occurred while editing the profile"
        });
    }
}