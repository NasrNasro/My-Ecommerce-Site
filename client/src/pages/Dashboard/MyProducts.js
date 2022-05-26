import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Load from '../../components/Load'
import ProductCard from '../../components/ProductCard'
import { myProducts } from '../../redux/actions/productActions'

function MyProducts() {
    const dispatch=useDispatch()
    const {myproducts,loadingMyProducts}=useSelector(state=>state.productReducer)
    useEffect(() => {
      dispatch(myProducts())
    }, [dispatch])
    
  return (
    <div className='List'>
        {
            loadingMyProducts ? <Load /> :
            <>
            {
                myproducts.map(product => <ProductCard product={product} key={product._id} />)
            }
            </>
        }
    </div>
  )
}

export default MyProducts