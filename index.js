const express=require("express")
const app=express()
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const { swaggerUi, specs } = require('./Middlewares/swaggerDoc');
dotenv.config();
//mongo*********************************
mongoose.connect(
    process.env.DB_CONNECT,
    {
        useUnifiedTopology:true, useNewUrlParser:true
    },
    
)

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin",'*');
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With,Content-type,Accept");
    next();
})

const product=require("./Routes/productRoutes")
const category=require("./Routes/categoryRoutes")
const auth=require("./Routes/authRoutes")
const cart=require("./Routes/cartRoutes")
const order = require('./Routes/ordersRoutes')
app.use(express.json())

app.use("/api/product",product)
app.use("/api/category",category)
app.use("/api/auth",auth)
app.use("/api/cart",cart)
app.use("/api/order",order)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.listen(6000,(req,res)=>console.log("servering running on PORT 6000"))