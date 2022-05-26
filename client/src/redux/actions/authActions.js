import { CURRENT, FAIL, LOGIN, LOGOUT, REGISTER } from "../types/authTypes"
import axios from 'axios'
import { setAlert } from "./alertActions"

export const register=(data,navigate,notify)=>async(dispatch)=>{
    try {
        const res=await axios.post('/api/auth/signup', data)
        dispatch({
            type:REGISTER,
            payload:res.data
        })
        notify()
        setTimeout(()=>{navigate('/profile')},3000)
    } catch (error) {
        error.response.data.errors.forEach(err=>dispatch(setAlert(err.msg,'danger')))
        dispatch({
            type:FAIL
        })
        notify(error)
    }
}

export const login=(data,navigate,notify)=>async(dispatch)=>{
    try {
        const res=await axios.post('/api/auth/signin', data)
        dispatch({
            type:LOGIN,
            payload:res.data
        })
        notify()
        setTimeout(()=>{navigate('/profile')},3000)        
    } catch (error) {
        error.response.data.errors.forEach(err=>dispatch(setAlert(err.msg,'danger')))
        dispatch({
            type:FAIL
        })
        notify(error)
    }
}

export const getCurrentUser=()=>async(dispatch)=>{
    const config={
        headers:{
            authorization:localStorage.getItem('token')
        }
    }
    try {
        const res=await axios.get('/api/auth/current', config)
        dispatch({
            type:CURRENT,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:FAIL
        })
    }
}

export const logout=()=>{
    return{
        type:LOGOUT
    }
}