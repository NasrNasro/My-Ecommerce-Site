import React, { useState } from "react";
import { Container, Col, Form, Button, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/actions/authActions";
import { ToastContainer, toast } from 'react-toastify';

function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // handleChange
  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  // handle notification add order
  const notify=(error)=>{!error?toast.success('Login with success!', {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    }):toast.error('Login Failed!', {
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
    dispatch(login(data, navigate, notify));
  };
  return (
    <Container className='mt-5'>
      <h2 className='shadow-sm p-3 m-5 text-center'>Login</h2>

      <Row>
        <Col lg={5} md={6} sm={12} className='p-5 m-auto shadow-sm rounded-lg'>
          <Form onSubmit={handleSubmit}>
            <ToastContainer />
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
              Login
            </Button>
          </Form>
          <p>
            Don't have an account ? <Link to='/register'>Sign up</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
