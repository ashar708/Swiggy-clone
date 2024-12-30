import express from 'express';
import authMiddleware from '../MiddleWare/Auth.js';

import { listOrder, placeOrder, updateStatus, usersOrder, verifyOrder } from '../Controllers/OrderController.js';

const orderRouter = express.Router();

orderRouter.post('/place', authMiddleware, placeOrder);
orderRouter.post('/verify', verifyOrder);
orderRouter.post('/userorders', authMiddleware, usersOrder);
orderRouter.get('/list', listOrder);
orderRouter.post('/status', updateStatus);

export default orderRouter;