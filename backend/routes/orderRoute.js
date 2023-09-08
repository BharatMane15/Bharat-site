const express = require("express");
const router = express.Router();

const { isAuthanticatedUser, authorizeRoles } = require("../middleware/auth");
const {
  newOrder,
  getSingleOrder,
  orders,
  myOrders,
  deleteOrder,
} = require("../controllers/orderController");

router.route("/order/new").post(isAuthanticatedUser, newOrder);
router.route("/order/:id").get(isAuthanticatedUser, getSingleOrder);
router.route("/order").get(isAuthanticatedUser, orders);
router.route("/order/me/:id").get(isAuthanticatedUser, myOrders);
router.route("/order/remove/:id").delete(isAuthanticatedUser, deleteOrder);

module.exports = router;
