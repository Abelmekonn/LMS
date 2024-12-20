import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { createOrder, getOrders, newPayment, sendStripePublishableKey } from "../controllers/order.controller";
import { updateAccessToken } from "../controllers/user.controller";


const orderRouter=express.Router()

orderRouter.post("/create-order",createOrder);
orderRouter.get("/get-all-orders",updateAccessToken,isAuthenticated,authorizeRoles("admin"),getOrders)

orderRouter.get("/payment/stripepublishablekey", sendStripePublishableKey)
orderRouter.post("/payment" , isAuthenticated, newPayment )

export default orderRouter;