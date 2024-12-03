const express = require("express");
const router = express.Router();
const { addRestaurant, addCategory, addProduct, getAllRestaurants, getRestaurantById, addOffer, searchRestaurant } = require("../controllers/restaurantController");


router.post("/add", addRestaurant);
router.get("/getAll", getAllRestaurants);
router.get("/getById/:id", getRestaurantById);
router.post("/addCategory", addCategory);
router.post("/addProduct", addProduct);
router.post("/addOffer", addOffer);

router.get("/search/:restaurantId", searchRestaurant);


module.exports = router;