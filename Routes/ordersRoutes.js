const router=require("express").Router();
const Controller=require("../Controllers/ordersControllers");

router.get("/get/:id",Controller.ordersById)
router.get("/order-history-get/:id",Controller.ordersHistoryById)

module.exports=router