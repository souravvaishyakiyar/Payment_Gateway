import { instance } from "../index.js";
import crypto from 'crypto'
import { Payment } from "../models/PaymentModel.js";

export const checkout = async (req, res) => {
    try {
        // console.log(req.body)
        const options = {
            amount: Number(req.body.amount * 100),  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11",
        };

        console.log(Number(req.body.amount * 100));
        const order = await instance.orders.create(options);
         console.log(order);

        res.status(200).json({
            success: true,
            order, // Include the order in the response
        });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create order",
        });
    }
};

export const paymentVerification = async (req, res) => {
    try {
        //  console.log(req.body)

         const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
         req.body;
     
       const body = razorpay_order_id + "|" + razorpay_payment_id;
     
       const expectedSignature = crypto
         .createHmac("sha256", "WENcCx0HPgwPRWxF36tjeViN")
         .update(body.toString())
         .digest("hex");

         const isAuthentic = expectedSignature === razorpay_signature;
         if (isAuthentic) {
        
      
          await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
          });
      
          res.redirect(
            `http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`
          );
        } else {
          res.status(400).json({
            success: false,
          });
        }
        
      
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({
            success: false,
            message: "Failed to verify payment",
        });
    }
};
