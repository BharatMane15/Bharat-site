const Order = require("../models/orderModals");
const Product = require("../models/productModal");

//create new order
exports.newOrder = async (req, res, next) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });
    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//to get single order
exports.getSingleOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    console.log("order", order);
    if (!order) {
      return res.status(500).json({
        success: true,
        message: "order Not Found ",
      });
    }
    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.myOrders = async (req, res, next) => {
  const orders = await Order.find({ user: req.params.id });
  if (!orders) {
    return res.status(200).json({
      success: false,
      message: "order not found",
    });
  }
  return res.status(200).json({
    success: true,
    orders,
  });
};
//to get all orders
exports.orders = async (req, res, next) => {
  try {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) => {
      totalAmount += order.paymentInfo.totalPrice;
    });
    return res.status(200).json({
      status: true,
      totalAmount,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateOrder = async (req, res, next) => {
  const order = await Order.find(req.params.id);

  if (order.orderStatus === "Delivered") {
    return (
      res.status(200),
      json({
        status: true,
        message: "you have already delevered the Order",
      })
    );
  }
  order.orderItems.forEach(async (item) => {
    await updateStock(order.Product, order.quantity);
  });

  order.orderStatus === req.body.status;
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  return res.status(200).json({
    status: true,
    order,
  });
};

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock = product.stock - quantity;

  await product.save({ validateBeforeSave: false });
}

//delete Order

exports.deleteOrder = async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  return res.status(200).json({
    success: true,
    message: "order deleted Successfully",
  });
};
