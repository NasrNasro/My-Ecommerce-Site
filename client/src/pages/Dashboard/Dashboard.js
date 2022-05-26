import React, { useEffect } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Load from '../../components/Load'
import { deleteProfile, getProfiles } from '../../redux/actions/profileActions'

function Dashboard() {
  const dispatch=useDispatch()
  const {profiles,loading}=useSelector(state => state.profileReducer)
  useEffect(() => {
    dispatch(getProfiles())
  }, [dispatch])
  // delete profile
  const handleDelete=(id)=>{
    dispatch(deleteProfile(id))
  }
  return (
    <div>
      {
        loading ? <Load /> :
        <>
          <Container className='mt-5'>
          <h1 className='shadow-sm p-3 m-5 text-center'>Admin dashboard</h1>
          <Row>
            <Col lg={5} md={6} sm={12} className='p-5 m-auto shadow-sm rounded-lg' style={{width:'600px'}}>
              <div style={{display:'flex',justifyContent:'space-between'}}>
              <Link to='/addProduct'>
                <Button variant='outline-primary m-2' >Add product</Button>
              </Link>
              <Link to='/home'>
                <Button variant='outline-primary m-2' >Products</Button>
              </Link>
              <Link to='/myProducts'>
                <Button variant='outline-primary m-2' >My products</Button>
              </Link>
              <Link to='/Orders'>
                <Button variant='outline-primary m-2' >Orders</Button>
              </Link>
              </div>
              <h3 className='shadow-sm p-3 m-5 text-center'>Profiles</h3>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    profiles.map((profile,i) => profile.role==="user" && <tr key={profile._id}>
                      <td>{i+1}</td>
                      <td>{profile.name}</td>
                      <td>{profile.email}</td>
                      <td>{profile.role}</td>
                      <td>{profile.role==="user" && <Button onClick={()=>handleDelete(profile._id)}>Delete</Button>}</td>
                    </tr>)
                  }
                </tbody>
              </Table>
            </Col>
          </Row>
          </Container>
        </>
      }
    </div>
  )
}

export default Dashboard