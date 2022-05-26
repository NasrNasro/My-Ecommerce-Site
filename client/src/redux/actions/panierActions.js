import axios from "axios"
import { ADD_PANIER, ADD_QUANTITY, GET_ORDERS, REMOVE_ITEM, REMOVE_QUANTITY } from "../types/panierTypes"

export const addPanier=(product)=>{
    return{
        type:ADD_PANIER,
        payload:product,
    }
}

export const addQuantity=(id)=>{
    return{
        type:ADD_QUANTITY,
        payload:id
    }
}

export const removeQuantity=(id)=>{
    return{
        type:REMOVE_QUANTITY,
        payload:id
    }
}

export const removeItem=(id)=>{
    return{
        type:REMOVE_ITEM,
        payload:id
    }
}

export const addOrders=(panier,notify)=>async(dispatch)=>{
    const config={
        headers:{
            authorization:localStorage.getItem('token')
        }
    }
    try {
        const res=await axios.post('/api/order/addOrder', {panier}, config)
        notify()
    } catch (error) {
        console.log({msg:'could not add order', error})
        notify(error)
    }
}

export const getOrders=()=>async(dispatch)=>{
    const config={
        headers:{
            authorization:localStorage.getItem('token')
        }
    }
    try {
        const res=await axios.get('/api/order', config)
        dispatch({type:GET_ORDERS,payload:res.data})
    } catch (error) {
        console.log({msg:'could not get orders', error})
    }
}

export const approveORder=(order, id, notify)=>async(dispatch)=>{
    const config={
        headers:{
            authorization:localStorage.getItem('token')
        }
    }
    try {
        await axios.put(`/api/order/approveOrder/${id}`, order, config)
        notify()
        dispatch(getOrders())
    } catch (error) {
        console.log({msg:'could not approve order', error})
        notify(error)
    }
}