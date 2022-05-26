import { ADD_PANIER, ADD_QUANTITY, GET_ORDERS, REMOVE_ITEM, REMOVE_QUANTITY } from "../types/panierTypes"

const initialState = {
    panier:[],
    Orders:null,
    loading:true,
}

const panierReducer= (state = initialState, { type, payload }) => {
  switch (type) {
      case ADD_PANIER:
          return {...state, panier:[...state.panier, payload]}
      case ADD_QUANTITY:
        return {...state, panier:state.panier.map(el=>el.id===payload ? {...el, quantity:el.quantity+1} : el)}
      case REMOVE_QUANTITY:
        return {...state, panier:state.panier.map(el=>el.id===payload && el.quantity>1 ? {...el, quantity:el.quantity-1} : el)}
      case REMOVE_ITEM:
        return {...state, panier:state.panier.filter(el=>el.id!==payload)}
      case GET_ORDERS:
        return {...state, Orders:payload.orders, loading:false}
  default:
    return state
  }
}
export default panierReducer