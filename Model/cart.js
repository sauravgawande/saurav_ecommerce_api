const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  checkOutFlag: {
    type: Boolean,

   default:false
  },
 productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    required:true
  },
  quantity:{
    type:Number,
    default:0,
    required:true
  }
});

const Cart= mongoose.model('Cart', cartSchema);

module.exports = Cart;
