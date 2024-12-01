const express = require('express');
const router = express.Router();
const { createCart, viewCart, shareCart, addItemToCart, removeItemFromCart } = require('../controllers/sharedCartController');


router.post('/create', createCart);
router.get('/:cartId', viewCart);
router.post('/share', shareCart);
// router.get('/:shareId', getSharedCart);
// router.put('/:shareId', updateSharedCart);

router.post('/add-item', addItemToCart);
router.post('/remove-item', removeItemFromCart);

module.exports = router;