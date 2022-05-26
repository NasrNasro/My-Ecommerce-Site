import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addPanier } from '../redux/actions/panierActions'
import { deleteProduct } from '../redux/actions/productActions'

function ProductCard({product}) {
  const dispatch=useDispatch()
  const {user}=useSelector(state=>state.authReducer)
  const {panier}=useSelector(state=>state.panierReducer)
  // handle delete
  const handleDelete=()=>{
    if(window.confirm('Are you sure ?')){
      dispatch(deleteProduct(product._id))
    }
  }
  // handle add panier
  const handleAddPanier=()=>{
    let found=null;
    found = panier.find(el=>el.id===product._id)
    if (!found){
      dispatch(addPanier({id:product._id, name:product.name, price:product.price, image:product.imageUrl, quantity:1}))
    }
  }
  return (
    <div>
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" style={{height:282.2}} src={`uploads/${product.imageUrl}`} />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                {`${product.price} TND`}
                </Card.Text>
                <div className='buttons'> 
                <Button variant="primary" onClick={handleAddPanier}><i className="fa-solid fa-cart-plus"></i> Buy</Button>
                <Link to={`/product/${product._id}`}><Button variant="info" >Description</Button></Link>
                {
                  user.role==="admin" && 
                  <>
                  <Link to={`/edidtProduct/${product._id}`}><Button variant="outline-primary">Edit</Button></Link>
                  <Button variant="outline-warning" onClick={handleDelete}>Delete</Button>
                  </>
                }
                </div>
            </Card.Body>
        </Card>
    </div>
  )
}

export default ProductCard