const Orders = require('../Model/order')
const mongoose = require('mongoose');
const {dynamicLookupMiddlewareById} =require('../Middlewares/tableJoin')

const lookupOptions = {
    fromCollection: 'carts', 
    localField: 'cartId', 
    foreignField: '_id',
    as: 'cart', 
  };
  

  const populateCart = dynamicLookupMiddlewareById(Orders, lookupOptions);
  
  exports.ordersById = async (req, res) => {
    try {
        const orderId = mongoose.Types.ObjectId.createFromHexString(req.params.id); 
        
      const orders = await populateCart(orderId);
  
      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: 'Order not found.' });
      }
  
      res.status(200).json(orders[0]);
    } catch (error) {
      console.error('Error viewing order:', error);
      res.status(500).json({ error: 'Failed to view order.' });
    }
  };
  exports.ordersHistoryById = async (req, res) => {
    try {
        const orderId = req.params.id;
        
        const orders = await Orders.findOne({ orderId });
  
      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: 'Order not found.' });
      }
  
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error viewing order:', error);
      res.status(500).json({ error: 'Failed to view order.' });
    }
  };