
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes")
const adminProductsRouter = require("./routes/admin/products-routes")
const shopProductsRouter = require("./routes/shop/product-route")

mongoose.connect("mongodb+srv://shyam8patidar:hHLJ6fuTVCVkejM9@cluster0.08ah5.mongodb.net/"
).then(()=>console.log("MongoDB is connected!"))
    .catch((error)=>console.log(error));

const app = express()
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: [
        "Content-type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",

    ],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouter)
app.use('/api/admin/products',adminProductsRouter);
app.use('/api/shop/products', shopProductsRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));