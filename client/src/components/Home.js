import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getproducts } from '../redux/actions/productActions'
import Load from './Load'
import ProductCard from './ProductCard'

function Home() {
    const {products,loadingProducts}=useSelector(state=>state.productReducer)
    const dispatch=useDispatch()
    useEffect(() => {
      dispatch(getproducts())
    }, [dispatch])

  return (
    <div className='List'>
        {
        loadingProducts ? <Load /> :
        <>
        {
        products.map(product=><ProductCard product={product} key={product._id}/>)
        }
        </>
        }
    </div>
  )
}

export default Home