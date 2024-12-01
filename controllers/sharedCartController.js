const SharedCart = require('../models/Cart');

exports.createCart = async (req, res) => {
    try {
        const { restaurantId, items } = req.body;
        const cart = await SharedCart.create({ restaurantId, items });
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.addItemToCart = async (req, res) => {
    try {
        const { cartId, productId } = req.body;
        const cart = await SharedCart.findById(cartId);
        
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        const existingItemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );

        if (existingItemIndex !== -1) {
            await SharedCart.findOneAndUpdate(
                { _id: cartId, 'items.product': productId },
                { $inc: { 'items.$.quantity': 1 } },
                { new: true }
            );
        } else {
            await SharedCart.findByIdAndUpdate(
                cartId,
                { $push: { items: { product: productId, quantity: 1 } } },
                { new: true }
            );
        }

        const updatedCart = await SharedCart.findById(cartId);
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.viewCart = async (req, res) => {
    try {
        const cart = await SharedCart.findById(req.params.cartId).populate('items.product');
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.shareCart = async (req, res) => {
  try {
      const { cartId } = req.body;

      const originalCart = await SharedCart.findById(cartId);
      if (!originalCart) {
          return res.status(404).json({ error: 'Original cart not found' });
      }

      const clonedCart = await SharedCart.create({
          restaurantId: originalCart.restaurantId,
          items: [...originalCart.items],
      });

      res.json(clonedCart);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

exports.removeItemFromCart = async (req, res) => {
    try {
        const { cartId, productId } = req.body;
        const cart = await SharedCart.findByIdAndUpdate(cartId, { $pull: { items: productId } }, { new: true });
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

