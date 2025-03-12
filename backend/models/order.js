import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            image: {
                type: String,
                required: false,
            },
            price: {
                type: Number,
                required: true,
            },
            product: {
                type: mongoose.Schema.ObjectId,
                ref: 'Product',
                required: true,
            },
        }
    ],
    totalAmount: {
        type: Number,
        required: true,
        default: 0.0,
    },
    paymentInfo: {
        status: {
            type: String,
            enum: ['Pending', 'Paid'],
            default: 'Pending',
        },
    },
    orderStatus: {
        type: String,
        enum: ['Processing', 'Ready for Pickup', 'Completed', 'Cancelled'],
        default: 'Processing',
    },
    deliveredAt: Date,
}, {
    timestamps: true,
});

export default mongoose.model('Order', orderSchema);
