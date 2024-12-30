import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDB } from './Config/db.js';
import foodRouter from './Routes/FoodRoute.js';
import userRouter from './Routes/UserRoute.js';
import 'dotenv/config';
import cartRouter from './Routes/CartRoute.js';
import orderRouter from './Routes/OrderRoute.js';


//App Config

const app = express();

const PORT = process.env.PORT || 4000;

//MiddleWare

app.use(express.json()); //frontend to backend parse
app.use(cors());

app.get('/',(req,res)=>{
    res.send("API Working");
})

//DB Connection
//database connected with the express app
connectDB();

//api endpoint
app.use('/api/food', foodRouter);
app.use('/images', express.static('Uploads'));
app.use('/api/user',userRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order', orderRouter);

// app.use('/api/food');

//Run express server

app.listen(PORT,()=>{
    console.log(`Server running on port http://localhost:${PORT}`);
})

