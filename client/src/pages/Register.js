import React, { useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../redux/actions/authActions";
import { ToastContainer, toast } from 'react-toastify';

function Register() {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // handleChange
  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const notify=(error)=>{!error?toast.success('Register with success!', {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    }):toast.error('Register Failed!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });}
  // handleSubmit
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(register(data, navigate, notify));
  };
  return (
    <Container className='mt-5'>
      <h2 className='shadow-sm p-3 m-5 text-center'>Register</h2>
      <Row>
        <Col lg={5} md={6} sm={12} className='p-5 m-auto shadow-sm rounded-lg'>
          <Form onSubmit={handleSubmit}>
            <ToastContainer />
            <Form.Group className='mb-3' controlId='formBasicText'>
              <Form.Control
                type='text'
                placeholder='Enter name'
                name='name'
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Control
                type='email'
                placeholder='Enter email'
                name='email'
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Control
                type='password'
                placeholder='Password'
                name='password'
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant='primary w-100 mb-3' type='submit'>
              register
            </Button>
          </Form>
          <p>
            Have an account ? <Link to='/login' >Sign in</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
