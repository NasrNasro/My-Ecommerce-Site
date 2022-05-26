import { GET_PROFILES } from "../types/profileTypes"

const initialState = {
    profiles:null,
    loading:true,
}

const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
      case GET_PROFILES:
          return {...state, profiles:payload.profiles, loading:false}

  default:
    return state
  }
}
export default profileReducer