import axios from 'axios'
export const createProduct=async(product,authtoken)=>{
    return  await axios.post(`${process.env.REACT_APP_API_URL}/api/product`,product,{headers:{
        authtoken
    },
})
}
export const getProdutByCount=async(count)=>{
    
    return  await axios.get(`${process.env.REACT_APP_API_URL}/api/products/${count}`)
}
export const removeProduct=async(slug,authtoken)=>{
    return  await axios.delete(`${process.env.REACT_APP_API_URL}/api/product/${slug}`,{headers:{
        authtoken
    },
})
}
export const getProduct=async(slug)=>{
    
    return  await axios.get(`${process.env.REACT_APP_API_URL}/api/product/${slug}`)
}
export const getProducts=async(sort,order,page)=>{
    console.log("in")
    console.log(page)
    
   return await axios.post(`${process.env.REACT_APP_API_URL}/api/products`,{
       sort,
       order,
       page,
   })
}
export const getProductsCount=async()=>{
    return await axios.get(`${process.env.REACT_APP_API_URL}/api/products/total`);
}
export const productStar=async(productId,star,authtoken)=>{
    return await axios.put(`${process.env.REACT_APP_API_URL}/api/product/star/${productId}`,{star},{
        headers:{
            authtoken
        }
    })
}
export const getRelated=async(productId)=>{
    console.log('rel')
   return  await axios.get(`${process.env.REACT_APP_API_URL}/api/product/related/${productId}`);
}
export const fetchSearchFilter=async(arg)=>{
    
   return  await axios.post(`${process.env.REACT_APP_API_URL}/api/search/filters`,arg);
}