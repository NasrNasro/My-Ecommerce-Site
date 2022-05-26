import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addproduct } from '../../redux/actions/productActions';

function AddProduct() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  // product inputs
  const [info, setInfo] = useState({name:"", price:"", details:""})
  const [file, setFile] = useState(null)
  // handle change
  const handleChange=e=>{
    setInfo({...info, [e.target.name]:e.target.value})
  }
  // handle add product
  const handleAdd=(e)=>{
    e.preventDefault();
    dispatch(addproduct(info,file,navigate));
  }
  return (
    <div>
      <Container className='mt-5'>
      <h2 className='shadow-sm p-3 m-5 text-center'>Add new product</h2>
      <Row>
        <Col lg={5} md={6} sm={12} className='p-5 m-auto shadow-sm rounded-lg'>
          <Form onSubmit={handleAdd}>
          <Form.Group className='mb-3' controlId='formBasicText'>
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter product name'
              name="name"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicText'>
            <Form.Label>Product Price</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter product price'
              name="price"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Product Details</Form.Label>
            <Form.Control 
            as="textarea" 
            rows={1} 
            name="details"
            onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Product Image</Form.Label>
            <Form.Control 
            type="file" 
            onChange={e=>setFile(e.target.files[0])}
            />
          </Form.Group>
            <Button variant='primary w-100 mb-3' type='submit'>
              Add product
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    </div>
  )
}

export default AddProduct