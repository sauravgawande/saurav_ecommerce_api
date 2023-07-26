const router=require("express").Router();
const Controller=require("../Controllers/categoriesController")
router.get("/get",Controller.getCategory)
router.post("/create",Controller.addCategory)
router.get("/get/:id",Controller.getCategoryById)
module.exports=router