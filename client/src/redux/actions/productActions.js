import axios from "axios"
import { GET_PRODUCT, GET_PRODUCTS, MY_PRODUCTS } from "../types/productTypes"
import { setAlert } from "./alertActions"

// get products
export const getproducts=()=>async(dispatch)=>{
    try {
        // communiquer avec serveur
        const res=await axios.get('/api/product/')
        // communiquer avec redux
        dispatch({type:GET_PRODUCTS, payload:res.data})
    } catch (error) {
        console.log({msg:'could not get products', error})
    }
}

// add product
export const addproduct=(info,file,navigate)=>async(dispatch)=>{
    const data=new FormData()
    data.append('myImage',file)
    data.append('name',info.name)
    data.append('price',info.price)
    data.append('details',info.details)
    const config={
        headers:{
            authorization:localStorage.getItem('token')
        }
    }
    try {
        await axios.post('/api/product/addProduct', data, config)
        navigate('/home')
    } catch (error) {
        error.response.data.errors.forEach(err=>dispatch(setAlert(err.msg,'danger')))
        console.log({msg:'could not add product', error})
    }
}

// get my products
export const myProducts=()=>async(dispatch)=>{
    const config={
        headers:{
            authorization:localStorage.getItem('token')
        }
    }
    try {
        const res=await axios.get('/api/product/myproducts', config)
        dispatch({type:MY_PRODUCTS, payload:res.data})
    } catch (error) {
        console.log({msg:'could not get my products', error})
    }
}

// get one product
export const getProduct=(id)=>async(dispatch)=>{
    try {
        const res=await axios.get(`/api/product/${id}`)
        dispatch({type:GET_PRODUCT,payload:res.data})
    } catch (error) {
        console.log({msg:'could not get product', error})
    }
}

// delete product
export const deleteProduct=(id)=>async(dispatch)=>{
    const config={
        headers:{
            authorization:localStorage.getItem('token')
        }
    }
    try {
        const res=await axios.delete(`/api/product/deleteProduct/${id}`, config);
        dispatch(getproducts());
        dispatch(myProducts());
    } catch (error) {
        console.log({msg:'could not delete product', error})
    }
}

// edit product
export const editProduct=(id,name,price,details,image,navigate)=>async(dispatch)=>{
    const config={
        headers:{
            authorization:localStorage.getItem('token')
        }
    }
    const data=new FormData()
    data.append('myImage',image)
    data.append('name',name)
    data.append('price',price)
    data.append('details',details)
    try {
        const res=await axios.put(`/api/product/updateProduct/${id}`, data, config)
        navigate('/home')
    } catch (error) {
        console.log({msg:'could not update product', error})
    }
}