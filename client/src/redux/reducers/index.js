import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import productReducer from "./productReducer";
import profileReducer from "./profileReducer"
import panierReducer from "./panierReducer"

const rootReducer=combineReducers({
    authReducer,alertReducer,productReducer,profileReducer,panierReducer,
})

export default rootReducer