import React from 'react'
import { Box, Stack } from "@chakra-ui/react"
import Card from './Card'
import axios from 'axios'



const Home = () => {
    
    const checkoutHandler = async (amount) => {
        try {
            const { data: { key } } = await axios.get("http://localhost:3000/api/getkey");
            const { data: { order } } = await axios.post("http://localhost:3000/api/checkout", { amount });
            //  console.log(order); // Add this line to log the order
    
            const options = {
                key,
                amount: order.amount,
                currency: "INR",
                name: "Sourav Kumar",
                description: "Tutorial of RazorPay",
                image: "https://avatars.githubusercontent.com/u/25058652?v=4",
                order_id: order.id,
                callback_url: "http://localhost:3000/api/paymentverification",
                prefill: {
                    name: "Gaurav Kumar",
                    email: "gaurav.kumar@example.com",
                    contact: "9999999999"
                },
                notes: {
                    "address": "Razorpay Corporate Office"
                },
                theme: {
                    "color": "#3399cc"
                }
            };
            const razor = new window.Razorpay(options);
            razor.open();
        } catch (error) {
            console.error("Error during checkout:", error);
        }
    };
    

    

  return (
    
    <Box>

            <Stack h={"100vh"} alignItems="center" justifyContent="center" direction={["column", "column"]}>

                <Card amount={5000} img={"https://images-na.ssl-images-amazon.com/images/G/02/aplusautomation/vendorimages/0b925aaf-0920-4019-a78e-dbe23cc1d1fa.jpg._CB536181688_.jpg"} checkoutHandler={checkoutHandler} />
                <Card amount={3000} img={"http://i1.adis.ws/i/canon/eos-r5_front_rf24-105mmf4lisusm_32c26ad194234d42b3cd9e582a21c99b"} checkoutHandler={checkoutHandler} />

            </Stack>
        </Box>
  )
}

export default Home
