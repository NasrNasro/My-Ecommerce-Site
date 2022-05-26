import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addOrders } from '../redux/actions/panierActions'
import Product from './Product'
import { ToastContainer, toast } from 'react-toastify';

function Basket() {
    const dispatch=useDispatch()
    const {panier}=useSelector(state=>state.panierReducer)
    var sum= panier.map(el=>el.price*el.quantity).reduce((total,current)=>total+current)
    // handle notification add order
    const notify=(error)=>{!error?toast.success('Order Added!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        }):toast.error('Order Failed!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });}
    // handle add order
    const handleOrder=()=>{
        dispatch(addOrders(panier,notify));
    }
  return (
    <div style={{display:'flex', justifyContent:'space-around'}}>
        <div className='List1'>
            {
                panier && panier.map(product=><Product product={product} key={product.id}></Product>)
            }
        </div>
        <div>
        <Card style={{ width: '20rem', marginTop:'30px'}}>
            <Card.Img variant="top" style={{height:'20rem'}} src="Cart-Logo.png" />
            <Card.Body>
                <Card.Title>Cart Summary</Card.Title>
                <Card.Text style={{marginBottom:"5px"}}>
                <div style={{display:'flex', justifyContent:'space-evenly'}}>
                <span>Total:</span>
                <span>{`${sum} TND`}</span>
                </div>
                </Card.Text>
                <Button variant="outline-primary" onClick={handleOrder}><i className="fa-solid fa-credit-card"></i> {`Order (${sum} TND)`}</Button>
                <ToastContainer />
            </Card.Body>
        </Card>
        </div>
    </div>
  )
}

export default Basket