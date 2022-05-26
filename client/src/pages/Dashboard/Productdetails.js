import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Load from '../../components/Load'
import { useParams } from 'react-router-dom'
import { getProduct } from '../../redux/actions/productActions'

function Productdetails() {
    const dispatch=useDispatch()
    const {id}=useParams()
    useEffect(() => {
      dispatch(getProduct(id))
    }, [dispatch,id])
    const {product, loadingProduct}=useSelector(state=>state.productReducer)
  return (
      <div>
      {
        loadingProduct ? <Load /> :
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" style={{height:282.2}} src={`/uploads/${product&&product.imageUrl}`} />
            <Card.Body>
                <Card.Title>{product&&product.name}</Card.Title>
                <Card.Text>
                {`${product&&product.price} TND`}
                </Card.Text>
                <Card.Text>
                {product&&product.details}
                </Card.Text>
            </Card.Body>
        </Card>
      }
      </div>
  )
}

export default Productdetails