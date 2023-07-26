
exports.dynamicLookupMiddleware = (model, options) => async (req, res, next) => {
    try {
      const results = await model.aggregate([
        {
          $lookup: {
            from: options.fromCollection,
            localField: options.localField,
            foreignField: options.foreignField,
            as: options.as,
          },
        },
      
      ]);
  
      return results
    } catch (err) {
     return err
    }
  };

  exports.dynamicLookupMiddlewareById = (model, options) => async (orderId, next) => {
    try {
      console.log(orderId);
      const results = await model.aggregate([
        {
          $match: { _id: orderId }, 
        },
        {
          $lookup: {
            from: options.fromCollection,
            localField: options.localField,
            foreignField: options.foreignField,
            as: options.as,
          },
        },
        
      ]);
  
      return results;
    } catch (err) {
      return err;
    }
  };
  
  

  exports.orderHistoryJoin = (model, options) => async (orderId, next) => {
    try {
      console.log(orderId);
      const results = await model.aggregate([
        {
          $match: { orderId: orderId }, 
        },
        {
          $lookup: {
            from: options.fromCollection,
            localField: options.localField,
            foreignField: options.foreignField,
            as: options.as,
          },
        },
  
      ]);
  
      return results;
    } catch (err) {
      return err;
    }
  };
  
  