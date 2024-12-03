const Restaurant = require("../models/Restaurant");
const Category = require("../models/Category");
const Product = require("../models/Product");
const Offer = require("../models/Offer");
exports.addRestaurant = async (req, res) => {
    const { name, image, categories, rating } = req.body;
    try{
        const restaurant = new Restaurant({ name, image, categories, rating });
        await restaurant.save();
        res.status(201).json(restaurant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getAllRestaurants = async (req, res) => {
    try{
        const restaurants = await Restaurant.find();
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getRestaurantById = async (req, res) => {
    const { id } = req.params;
    try{
        const restaurant = await Restaurant.findById(id).populate("offers");
        const categories = await Category.find({ restaurants: id }).populate("products");
        console.log(restaurant, "restaurant");
        res.status(200).json({ restaurant, categories });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.addCategory = async (req, res) => {
    try{
        const { name, restaurants } = req.body;
        const category = new Category({ name, restaurants });
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.addProduct = async (req, res) => {
    try{
        const { name, description, price, image, category } = req.body;
        const product = new Product({ name, description, price, image, category });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}   

exports.addOffer = async (req, res) => {
    try{
        const { image, discount, name } = req.body;
        const offer = new Offer({ image, discount, name });
        await offer.save();
        res.status(201).json(offer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.searchRestaurant = async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const { query } = req.query; 

        const categories = await Category.find({ restaurants: restaurantId });
        const categoryIds = categories.map(cat => cat._id);

        const products = await Product.find({
            category: { $in: categoryIds },
            name: new RegExp(query, 'i')
        }).populate('category');

        if(products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error searching products", error: error.message });
    }
}