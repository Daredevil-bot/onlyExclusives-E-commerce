import axios from 'axios'

export const userCart=async(cart,authtoken)=>{
    return axios.post(`${process.env.REACT_APP_API_URL}/api/user/cart`,{cart},{
        headers:{
            authtoken,
        }
    })
}
export const getUserCart=async(authtoken)=>{
    return axios.get(`${process.env.REACT_APP_API_URL}/api/user/cart`,{
        headers:{
            authtoken,
        }
    })
}
export const emptyCart=async(authtoken)=>{
    return axios.delete(`${process.env.REACT_APP_API_URL}/api/user/cart`,{
        headers:{
            authtoken,
        }
    })
}
export const saveAddress=async(authtoken,address)=>{
    return axios.post(`${process.env.REACT_APP_API_URL}/api/user/address`,{address},{
        headers:{
            authtoken,
        }
    })
}

export const createOrder=async(stripeResponse,authtoken)=>{
    return axios.post(`${process.env.REACT_APP_API_URL}/api/user/order`,{stripeResponse},{
        headers:{
            authtoken,
        }
    })
}

export const getUserOrders=async(authtoken)=>{
    return await axios.get(`${process.env.REACT_APP_API_URL}/api/user/orders`,{
        headers:{
            authtoken,
        }
    })
}