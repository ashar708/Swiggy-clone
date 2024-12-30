import express from 'express';
import authMiddleware from '../MiddleWare/Auth.js';

import { addToCart,removeFromCart,getCartData } from '../Controllers/CartController.js';

const cartRouter = express.Router();

cartRouter.post('/add',authMiddleware,addToCart);
cartRouter.post('/remove',authMiddleware,removeFromCart);
cartRouter.get('/get',authMiddleware,getCartData);

export default cartRouter;