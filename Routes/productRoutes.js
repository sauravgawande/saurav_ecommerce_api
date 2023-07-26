const router=require("express").Router();
const Controller=require("../Controllers/productsControllers")
router.get("/get",Controller.getProducts)
router.post("/create",Controller.addproducts)
router.get("/get/:id",Controller.getProductById)
module.exports=router