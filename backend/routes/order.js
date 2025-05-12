import express from "express";
import {
  newOrder,
  myOrders,
  getOrderDetails,
  allOrders,
  allOrdersInHistory,
  updateOrder,
  deleteOrder,
  cancelOrder, // Import the cancelOrder function
} from "../controllers/orderControllers.js";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";

const router = express.Router();

router.route("/orders/new").post(isAuthenticatedUser, newOrder);
router.route("/orders/me/orders").get(isAuthenticatedUser, myOrders);
router.route("/orders/:id").get(isAuthenticatedUser, getOrderDetails);
router.route("/orders/:id/cancel").put(isAuthenticatedUser, cancelOrder); // Add the cancel order route

// Admin routes
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), allOrders);
router
  .route("/admin/orders/history")
  .get(isAuthenticatedUser, authorizeRoles("admin"), allOrdersInHistory);
router
  .route("/admin/orders/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

export default router;
