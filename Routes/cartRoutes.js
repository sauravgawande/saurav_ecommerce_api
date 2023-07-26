const router=require("express").Router();
const cartController = require('../Controllers/cartController');
const authMiddleware = require('../Middlewares/authMiddleware');

router.post('/addCart', authMiddleware.verifyToken, cartController.addToCart);
router.get('/viewcart/:id', authMiddleware.verifyToken, cartController.viewCartProduct);
router.get("/viewallcart",authMiddleware.verifyToken, cartController.viewAllCart)
router.put("/updateQuantity/:id",authMiddleware.verifyToken, cartController.updateProductQuantity)
router.delete("/removeProduct/:id",authMiddleware.verifyToken, cartController.delectProductFromCart)
 router.get("/updateCheckoutFlags",authMiddleware.verifyToken, cartController.updateCheckoutFlags)

module.exports = router;