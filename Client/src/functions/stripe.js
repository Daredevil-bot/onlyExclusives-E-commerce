import axios from 'axios'

export const createPaymentIntent=async (authtoken)=>{
    console.log('hey')
   return await axios.post(`${process.env.REACT_APP_API_URL}/api/create-payment-intent`,{},{
        headers:{
            authtoken,
        }
    })
}