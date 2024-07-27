import express from 'express';
import { config } from 'dotenv';
import Razorpay from 'razorpay';
import paymentRoute from './Routes/PaymentRoutes.js'
import cors from "cors";


config({ path: "./config/config.env" });


const app=express();
 app.use(express.json());

 app.use(cors);


 export const instance = new Razorpay({
    key_id: "rzp_test_plW8eNrF7iScc3",
    key_secret: "WENcCx0HPgwPRWxF36tjeViN",
  });


 app.listen(3000,()=>{
    console.log('Server is started at port 3000');
 })


 app.use('/api',paymentRoute)

