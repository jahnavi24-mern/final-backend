const Image = require("../models/Image");
const { uploadImage } = require("../config/cloudinary");

exports.uploadImageToDB = async(req, res) => {
    try {
        if (!req.file) {
          return res.status(400).json({ message: 'No file uploaded' });
        }

        const imageUrl = await uploadImage(req.file);

        const newImage = new Image({
            fileName: req.body.name,
            fileUrl: imageUrl,
        });
    
        const savedImage = await newImage.save();
        res.status(201).json(savedImage);
      } catch (error) {
        console.error('Error uploading image:', error.message);
        res.status(500).json({ message: 'Server error' });
      }
}

exports.getImage = async(req, res) => {
    try {
        const img = await Image.find({fileName: req.query.name});

        return res.status(200).json({
            success: true,
            message: "Image fetched successfully",
            img
        })
    } catch(error){
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching the image"
        })
    }
}