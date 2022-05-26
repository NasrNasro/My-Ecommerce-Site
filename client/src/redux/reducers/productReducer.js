import { GET_PRODUCT, GET_PRODUCTS, MY_PRODUCTS, } from "../types/productTypes"

const initialState = {
    products:null,
    myproducts:null,
    product:null,
    loadingProduct:true,
    loadingProducts:true,
    loadingMyProducts:true
}

const productReducer=(state = initialState, { type, payload }) => {
  switch (type) {
      case GET_PRODUCTS:
        return {...state, products:payload.products, loadingProducts:false}
      case MY_PRODUCTS:
        return {...state, myproducts:payload.myProducts, loadingMyProducts:false}
      case GET_PRODUCT:
        return {...state, product:payload.foundProduct, loadingProduct:false}
      default:
        return state
  }
}
export default productReducer