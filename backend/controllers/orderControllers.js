import Order from "../models/order.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";

// Create new order => /api/v1/orders/new
export const newOrder = catchAsyncErrors(async (req, res, next) => {
  const { orderItems, totalAmount, paymentInfo, orderStatus } = req.body;

  const order = await Order.create({
    user: req.user._id,
    orderItems,
    totalAmount,
    paymentInfo,
    orderStatus,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// Get current user orders => /api/v1/orders/me/orders
export const myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get order details => /api/v1/orders/:id
export const getOrderDetails = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Get all orders - ADMIN => /api/v1/admin/orders
export const allOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ isInHistory: false });

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get all orders in history - ADMIN => /api/v1/admin/orders/history
export const allOrdersInHistory = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ isInHistory: true });

  res.status(200).json({
    success: true,
    orders,
  });
});

export const updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  // Update order status
  if (req.body.orderStatus) {
    order.orderStatus = req.body.orderStatus;
  }

  // Update paymentInfo field
  if (req.body.paymentInfo) {
    order.paymentInfo = {
      ...order.paymentInfo, // Retain existing fields
      ...req.body.paymentInfo, // Overwrite with new fields
    };
  }

  // Automatically set isInHistory to true if order is delivered
  if (order.orderStatus === "Delivered") {
    order.isInHistory = true;
  }

  await order.save();

  res.status(200).json({
    success: true,
    order,
  });
});

// Cancel Order => /api/v1/orders/:id/cancel
export const cancelOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  // Check if the order belongs to the logged-in user
  if (order.user.toString() !== req.user._id.toString()) {
    return next(
      new ErrorHandler("You are not authorized to cancel this order", 403)
    );
  }

  // Check if the order is already delivered or cancelled
  if (order.orderStatus === "Delivered") {
    return next(
      new ErrorHandler(
        "You cannot cancel an order that has already been delivered",
        400
      )
    );
  }

  if (order.orderStatus === "Cancelled") {
    return next(new ErrorHandler("This order is already cancelled", 400));
  }

  // Update the order status to "Cancelled"
  order.orderStatus = "Cancelled";

  await order.save();

  res.status(200).json({
    success: true,
    message: "Order has been cancelled successfully",
    order,
  });
});

// Delete Order - ADMIN => /api/v1/admin/orders/:id
export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  // Use deleteOne instead of remove
  await order.deleteOne();

  res.status(200).json({
    success: true,
    message: "Order deleted successfully",
  });
});
