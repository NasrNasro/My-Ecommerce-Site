import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addQuantity, removeItem, removeQuantity } from '../redux/actions/panierActions'

function Product({product}) {
    const dispatch=useDispatch()
    // handle add quantity
    const handleAddOne=()=>{
        dispatch(addQuantity(product.id))
    }
    // handle remove quantity
    const handleRemoveOne=()=>{
        dispatch(removeQuantity(product.id))
    }
    // handle remove 
    const handleRemove=()=>{
        dispatch(removeItem(product.id))
    }
  return (
    <div>
        <Card style={{ width: '40rem'}} >
            <div className="card1" style={{ width: '40rem'}}>
            <Card.Img variant="top" style={{width:"15rem" ,height:"15rem"}} src={`uploads/${product.image}`} />
            <Card.Body>
                <div className='cardbody1'>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text style={{marginBottom:"5px"}}>
                {`Price: ${product.price} TND`}
                </Card.Text>
                <div className='buttons' style={{justifyContent:"center"}}> 
                <Button variant="outline-primary" onClick={handleRemoveOne}>-</Button>
                <Card.Text style={{margin:10}}>{`Quantity: ${product.quantity}`}</Card.Text>
                <Button variant="outline-primary" onClick={handleAddOne}>+</Button>
                </div>
                <Button variant="secondary" onClick={handleRemove}><i className="fa-solid fa-trash-can"></i> Remove</Button>
                </div>
            </Card.Body>
            </div>
        </Card>
    </div>
  )
}

export default Product