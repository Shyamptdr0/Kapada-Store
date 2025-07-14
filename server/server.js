require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit"); // <-- ✅ Import here

// Routers
const authRouter = require("./routes/auth/auth-routes");
const adminAllUserRouter = require("./routes/admin/all-user-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const shopProductsRouter = require("./routes/shop/product-route");
const shopCartRouter = require("./routes/shop/cart-route");
const shopAddressRouter = require("./routes/shop/address-route");
const shopOrderRouter = require("./routes/shop/order-route");
const shopSearchRouter = require("./routes/shop/search-route");
const shopReviewRouter = require("./routes/shop/review-route");
const commonFeatureRouter = require("./routes/common/feature-route");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ MongoDB Connection
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB is connected!"))
    .catch((error) => console.log(error));

// ✅ CORS Setup
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [process.env.CLIENT_BASE_URL];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

console.log("CORS allowed origin:", process.env.CLIENT_BASE_URL);

// ✅ Middlewares
app.use(cookieParser());
app.use(express.json());

// ✅ Rate Limiter (ADD BEFORE authRouter)
const authLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10,
    message: "Too many login attempts, try again later.",
});
app.use("/api/auth", authLimiter); // <-- ADD HERE

// ✅ Routes
app.use('/api/auth', authRouter);
app.use('/api/admin/user', adminAllUserRouter);
app.use('/api/admin/products', adminProductsRouter);
app.use('/api/admin/orders', adminOrderRouter);
app.use('/api/shop/products', shopProductsRouter);
app.use('/api/shop/cart', shopCartRouter);
app.use('/api/shop/address', shopAddressRouter);
app.use('/api/shop/order', shopOrderRouter);
app.use('/api/shop/search', shopSearchRouter);
app.use('/api/shop/review', shopReviewRouter);
app.use('/api/common/feature', commonFeatureRouter);

// ✅ Start Server
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
