import axios from "axios"
import { GET_PROFILES } from "../types/profileTypes"

// get profiles
export const getProfiles=()=>async (dispatch)=>{
    const config={
        headers:{
            authorization:localStorage.getItem('token')
        }
    }
    try {
        const res = await axios.get('/api/profile', config)
        dispatch({type:GET_PROFILES, payload:res.data})
    } catch (error) {
        console.log({msg:'could not get profiles', error})
    }
}

// delete profile
export const deleteProfile=(id)=>async(dispatch)=>{
    const config={
        headers:{
            authorization:localStorage.getItem('token')
        }
    }
    try {
        const res=await axios.delete(`/api/profile/deleteProfile/${id}`, config)
        dispatch(getProfiles())
    } catch (error) {
        console.log({msg:'could not delete profile', error})
    }
}