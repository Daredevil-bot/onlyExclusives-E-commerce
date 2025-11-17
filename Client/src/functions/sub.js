import axios from 'axios'

export const getSubs=async ()=>{
    return await axios.get(`${process.env.REACT_APP_API_URL}/api/subs`)

}
export const getSub=async (slug)=>{
    console.log('inaxi')
    return await axios.get(`${process.env.REACT_APP_API_URL}/api/sub/${slug}`)

}
export const deleteSub=async(slug,authtoken )=>{
    return await axios.delete(`${process.env.REACT_APP_API_URL}/api/sub/${slug}`,{headers:{authtoken}})


}
export const createSub=( async (sub,authtoken)=>{
    console.log('hey')
    return await axios.post(`${process.env.REACT_APP_API_URL}/api/sub`,sub,{              //axios is sending request to middleware having url as first argument   
        headers:{
            authtoken
        }
    })
})



export const updateSub=async(slug,sub,authtoken)=>{
   
    return await axios.put(`${process.env.REACT_APP_API_URL}/api/sub/${slug}`,sub,{headers:{authtoken}})

}