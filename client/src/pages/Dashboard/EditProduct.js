import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Load from '../../components/Load'
import { editProduct, getProduct } from '../../redux/actions/productActions'

function EditProduct() {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [details, setDetails] = useState("")
    const [image, setImage] = useState(null)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {id}=useParams()
    const {product, loadingProduct}=useSelector(state=>state.productReducer)
    // get product
    useEffect(() => {
      dispatch(getProduct(id))
    }, [id])
    // set state with values
    useEffect(() => {
      product&& setName(product.name)
      product&& setPrice(product.price)
      product&& setDetails(product.details)
    }, [product])
    // handle submit
    const handleSubmit=(e)=>{
      e.preventDefault();
      dispatch(editProduct(id,name,price,details,image,navigate))
    }
  return (
    <div>
      {
        loadingProduct ? <Load /> :
        <Container className='mt-5'>
        <h2 className='shadow-sm p-3 m-5 text-center'>Edit product</h2>
        <Row>
          <Col lg={5} md={6} sm={12} className='p-5 m-auto shadow-sm rounded-lg'>
            <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='formBasicText'>
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter product name'
                value={name}
                onChange={(e)=>setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicText'>
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter product price'
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Product Details</Form.Label>
              <Form.Control 
              as="textarea" 
              rows={1} 
              value={details}
              onChange={(e)=>setDetails(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control 
              type="file" 
              onChange={e=>setImage(e.target.files[0])}
              />
            </Form.Group>
              <Button variant='primary w-100 mb-3' type='submit'>
                Edit product
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      }
    </div>
  )
}

export default EditProduct