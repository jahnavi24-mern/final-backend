const express = require("express");
const router = express.Router();
const { addRestaurant, addCategory, addProduct, getAllRestaurants, getRestaurantById, addOffer } = require("../controllers/restaurantController");


router.post("/add", addRestaurant);
router.get("/getAll", getAllRestaurants);
router.get("/getById/:id", getRestaurantById);
router.post("/addCategory", addCategory);
router.post("/addProduct", addProduct);
router.post("/addOffer", addOffer);


module.exports = router;