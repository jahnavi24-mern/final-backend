const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dohtscvxj",
  api_key: "525296287164483",
  api_secret: "QOYDBuPt7XBjlQOfxpBEEPqaigM",
});

const uploadImage = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path);
    return result.secure_url;
  } catch (error) {
    throw new Error("Error uploading image to Cloudinary");
  }
};

module.exports = {uploadImage};
