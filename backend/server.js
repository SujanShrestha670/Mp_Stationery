import express from 'express';
import dotenv from 'dotenv';
import { connectDatabase } from './config/dbConnect.js';
import errorMiddleware from './middlewares/error.js';
import cookieParser from 'cookie-parser';

// Handle Uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down server due to uncaught exception');
    process.exit(1);
});

dotenv.config({path: "backend/config/config.env"});

const app = express();

// Connecting to database
connectDatabase();

app.use(express.json());
app.use(cookieParser());

// Import all routes
import productRoutes from './routes/product.js';
import authRoutes from "./routes/auth.js";
import orderRoutes from './routes/order.js';


app.use('/api/v1', productRoutes);
app.use('/api/v1', authRoutes);
app.use('/api/v1', orderRoutes);

// Using error middleware
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down server due to unhandled promise rejection');
    server.close(() => {
        process.exit(1);
    });
})