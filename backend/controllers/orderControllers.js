import Order from '../models/order.js';
import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';

// Create new order => /api/v1/orders/new
export const newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        orderItems,
        totalAmount,
        paymentInfo,
        orderStatus,
    } = req.body;

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