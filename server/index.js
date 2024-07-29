import express from 'express';
// import { config } from 'dotenv';
import Razorpay from 'razorpay';
 import paymentRoute from './Routes/PaymentRoutes.js'
import cors from "cors";
import mongoose from 'mongoose';
import dotenv from 'dotenv'
//  import { paymentVerification } from './controllers/paymentController.js';


dotenv.config()

mongoose.connect("mongodb://localhost:27017/raozr").then(()=>{
   console.log("Connected to mongodb");
})
.catch((err)=>{
   console.log(err);
})
export const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




 export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_ID,
  });


 app.listen(process.env.PORT,()=>{
    console.log(`Server is started at port ${process.env.PORT}`);
 })


  app.use('/api',paymentRoute)
 

  app.get("/api/getkey", (req, res) =>
   res.status(200).json({ key:process.env.RAZORPAY_KEY_ID})
 );

