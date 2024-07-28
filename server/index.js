import express from 'express';
import { config } from 'dotenv';
import Razorpay from 'razorpay';
 import paymentRoute from './Routes/PaymentRoutes.js'
import cors from "cors";
import mongoose from 'mongoose';
//  import { paymentVerification } from './controllers/paymentController.js';


config({ path: "./config/config.env" });

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
    key_id: "rzp_test_plW8eNrF7iScc3",
    key_secret: "WENcCx0HPgwPRWxF36tjeViN",
  });


 app.listen(3000,()=>{
    console.log('Server is started at port 3000');
 })


  app.use('/api',paymentRoute)
 

  app.get("/api/getkey", (req, res) =>
   res.status(200).json({ key:"rzp_test_plW8eNrF7iScc3"})
 );

