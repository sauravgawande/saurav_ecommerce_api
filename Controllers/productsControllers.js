const Product=require("../Model/product");
const {dynamicLookupMiddleware} = require('../Middlewares/tableJoin')

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API endpoints for managing products
 */

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Get a list of products
 *     tags: [Products]
 *     responses:
 *       '200':
 *         description: Successful response with products list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */


const lookupOptions = {
  fromCollection: "categories", 
  localField: "categoryId", 
  foreignField: "_id", 
  as: "categoryData",
};

exports.getProducts = async (req, res) => {
  try {
    const result = await dynamicLookupMiddleware(Product, lookupOptions)(req, res);

    res.json(result)
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
  };


  exports.addproducts=async(req,res)=>{
    const productData={
        title:req.body.title,
        price:req.body.price,
        description:req.body.description,
        availability:req.body.availability,
        categoryId:req.body.categoryId,
    };
    const products = await Product.create(productData);
  res.json(products);
  }

  exports.getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(400).json({
        success: false,
        error: "User is invalid",
      });
    }
  
    res.status(200).json({
      success: true,
      product,
    });
  };