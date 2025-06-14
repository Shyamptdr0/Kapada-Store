const express = require("express")

const {getAllOrdersOfAllUsers ,getOrderDetailsForAdmin,updateOrderStatus,deleteOrderById} = require("../../controllers/admin/order-controller")


const router = express.Router();

router.get("/get", getAllOrdersOfAllUsers);
router.get("/details/:id", getOrderDetailsForAdmin );
router.put("/update/:id", updateOrderStatus)
router.delete("/delete/:id", deleteOrderById);

module.exports = router;