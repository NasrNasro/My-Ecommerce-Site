import React, { useEffect } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { approveORder, getOrders } from '../redux/actions/panierActions'
import Load from './Load'
import { ToastContainer, toast } from 'react-toastify';

function Orders() {
    const dispatch=useDispatch()
    const {Orders,loading}=useSelector(state=>state.panierReducer)
    useEffect(() => {
      dispatch(getOrders())
    }, [dispatch])
    // handle approve order notify
    const notify=(error)=>{!error?toast.success('Order Approved!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        }):toast.error('Order Approvement Failed!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });}
    // handle approve order
    const handleApprove=(order,id)=>{
        if (window.confirm('Are you sure ?')){
            dispatch(approveORder(order,id,notify))
        }
    }
  return (
    <div>
        {
            loading ? <Load /> :
            <>
                <Container className='mt-5'>
                <h1 className='shadow-sm p-3 m-5 text-center'>List of Orders</h1>
                {
                    Orders.map((order,i)=>order.approved===false && <Row style={{margin:'20px 0px 20px 0px'}} key={order._id}>
                    <Col lg={5} md={6} sm={12} className='p-5 m-auto shadow-sm rounded-lg' style={{width:'800px'}}>
                    <h2 className='shadow-sm p-3 m-5 text-center'>{`Order Number ${i+1}`}</h2>
                    <div style={{display:'flex', justifyContent:'space-around'}}> 
                    <div>
                        {
                            order.panier.map(el=><Card style={{ width: '20rem'}} key={el.id}>
                            <div className="card1" style={{ width: '20rem'}}>
                            <Card.Img variant="top" style={{width:"10rem" ,height:"10rem"}} src={`uploads/${el.image}`} />
                            <Card.Body>
                                <div className='cardbody1'>
                                <Card.Title>{el.name}</Card.Title>
                                <Card.Text style={{marginBottom:"5px"}}>
                                {`Price: ${el.price} TND`}
                                </Card.Text>
                                <Card.Text >{`Quantity: ${el.quantity}`}</Card.Text>
                                </div>
                            </Card.Body>
                            </div>
                        </Card>)
                        }
                    </div>
                    <div>
                        <Card>
                        <Card.Body>
                                <div className='cardbody1'>
                                <Card.Title style={{width:'100%'}}>Client Info</Card.Title>
                                <Card.Text style={{marginBottom:"5px"}}>{`Name: ${order.userId[0].name}`}</Card.Text>
                                <Card.Text style={{marginBottom:"5px"}}>{`Email: ${order.userId[0].email}`}</Card.Text>
                                <Card.Text >{`Created at: ${order.createdAt}`}</Card.Text>
                                <Button variant='outline-primary m-2' style={{width:'90%'}} onClick={()=>handleApprove(order,order._id)}><i className="fa-solid fa-person-circle-check"></i> Approve</Button>
                                <ToastContainer />
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                    </div>
                    </Col>
                    </Row>)
                }
                </Container>
            </>
        }
        
    </div>
  )
}

export default Orders