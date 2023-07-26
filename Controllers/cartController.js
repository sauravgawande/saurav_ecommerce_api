const Cart = require('../Model/cart');
const {dynamicLookupMiddleware} = require('../Middlewares/tableJoin')
const Order = require('../Model/order');

const { v4: uuidv4 } = require('uuid');


const lookupOptions = {
  fromCollection: "products", 
  localField: "productId", 
  foreignField: "_id", 
  as: "productsData", 
};

exports.addToCart = async (req, res) => {
    try {
        const addProduct=await Cart.create({
           productId:req.body.productId,
           userId:req.body.userId,
           checkOutFlag:req.body.checkOutFlag,
           createdAt:req.body.createdAt
        })
        res.json(addProduct);
    } catch (error) {
      console.error('Error adding to cart:', error);
      res.status(500).json({ error: 'Failed to add product to cart.' });
    }
  };
  exports.viewAllCart = async (req, res) => {
    try {
      const result = await dynamicLookupMiddleware(Cart, lookupOptions)(req, res);

    
      if (!result) {
        return res.status(404).json({ message: 'Cart not found.' });
      }
      res.json(result)
    } catch (error) {
      res.status(500).json({ error: 'Failed to view cart.' });
    }
  };
  exports.viewCartProduct = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
      if (!cart) {
        return res.status(404).json({ message: 'Product not found.' });
      }
      res.status(200).json(cart);
    } catch (error) {
      console.error('Error viewing product:', error);
      res.status(500).json({ error: 'Failed to view product.' });
    }
  };

  exports.updateProductQuantity=async(req,res) => {
    try {
      const quantity = req.body.quantity;
      const productId = req.params.id;
      const requests= await Cart.findById(productId);
      requests.quantity = quantity;
      const update = await requests.save()
      res.json(update)

    } catch (error) {
      res.status(500).json({ error: 'Failed to update .' });
    } 
   };

   exports.delectProductFromCart =async(req,res) => {
    try {
      const productId = req.params.id;
      const deleteRequest= await Cart.findByIdAndDelete(productId)
      res.json(deleteRequest)
    } catch (error) {
      res.status(500).json({ error: 'Failed to update .' });
    } 
   };

   exports.updateCheckoutFlags = async (req, res) => {
    try {
     
      const documentsToUpdate = await Cart.find({ checkOutFlag: false });
      const idsToUpdate = documentsToUpdate.map((doc) => doc._id);
      if (!documentsToUpdate || documentsToUpdate.length === 0) {
        return res.json({ message: 'No items to checkout. Cart is empty.' });
      }
      await Cart.updateMany({ _id: { $in: idsToUpdate } }, { $set: { checkOutFlag: true } });
      let  orders = [];
      const orderId = uuidv4();

      for (const doc of documentsToUpdate) {
        const order = new Order({
          orderId,
          cartId: doc._id,
          userId: doc.userId
        });
  
        
        await order.save();
        orders.push(order);
      
      }
  
      res.json({ message: 'Checkout flags updated successfully.',orders });
    } catch (error) {
      console.error('Error updating checkout flags:', error);
      res.status(500).json({ error: 'Failed to update checkout flags.' });
    }
  };