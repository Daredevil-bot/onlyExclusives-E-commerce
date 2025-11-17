import axios from 'axios'

export const getCategories=async ()=>{
    return await axios.get(`${process.env.REACT_APP_API_URL}/api/categories`)

}
export const getCategory=async (slug)=>{
    return await axios.get(`${process.env.REACT_APP_API_URL}/api/category/${slug}`)

}
export const deleteCategory=async(slug,authtoken )=>{
    return await axios.delete(`${process.env.REACT_APP_API_URL}/api/category/${slug}`,{headers:{authtoken}})


}
export const createCategory=( async (category,authtoken)=>{
    console.log('hey')
    return await axios.post(`${process.env.REACT_APP_API_URL}/api/category`,category,{              //axios is sending request to middleware having url as first argument   
        headers:{
            authtoken
        }
    })
})



export const updateCategory=async(slug,category,authtoken)=>{
   
    return await axios.put(`${process.env.REACT_APP_API_URL}/api/category/${slug}`,category,{headers:{authtoken}})

}
export const getCategorySubs=async (_id)=>{
    
   return await axios.get(`${process.env.REACT_APP_API_URL}/api/category/subs/${_id}`);
}