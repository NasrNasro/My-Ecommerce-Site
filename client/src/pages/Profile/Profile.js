import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./Profile.css";
import axios from 'axios'

function Profile() {
  const [file,setFile]=useState(null)
  const user = useSelector(state => state.authReducer.user);
  // function edit profile
  const editProfile=async()=>{
    const data=new FormData()
    data.append('myImage',file)
    
    const config={
      headers:{
        authorization:localStorage.getItem('token')
      }
    }
    try {
      const res=await axios.put('/api/profile/update', data, config)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <section className="section about-section gray-bg" id="about">
        <div className="container">
          <div className="row align-items-center flex-row-reverse">
            <div className="col-lg-6">
              <div className="about-text go-to">
                <h3 className="dark-color">About Me</h3>
                <h6 className="theme-color lead">A Lead UX &amp; UI designer based in Canada</h6>
                <p>I <mark>design and develop</mark> services for customers of all sizes, specializing in creating stylish, modern websites, web services and online stores. My passion is to design digital user experiences through the bold interface and meaningful interactions.</p>
                <div className="row about-list">
                  <div className="col-md-6">
                    <div className="media">
                      <label>Birthday</label>
                      <p>4th april 1998</p>
                    </div>
                    <div className="media">
                      <label>Age</label>
                      <p>22 Yr</p>
                    </div>
                    <div className="media">
                      <label>Residence</label>
                      <p>Canada</p>
                    </div>
                    <div className="media">
                      <label>Address</label>
                      <p>California, USA</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="media">
                      <label>E-mail</label>
                      <p>{user.email}</p>
                    </div>
                    <div className="media">
                      <label>Phone</label>
                      <p>820-885-3321</p>
                    </div>
                    <div className="media">
                      <label>Skype</label>
                      <p>skype.0404</p>
                    </div>
                    <div className="media">
                      <label>Freelance</label>
                      <p>Available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-avatar">
                <img src={user&&user.imageUrl ? `uploads/${user.imageUrl}`:"https://bootdey.com/img/Content/avatar/avatar7.png"} title alt="" />
                <input type='file' onChange={e=>setFile(e.target.files[0])}></input>
                <Button variant='outline-primary m-2' onClick={editProfile}>Edit</Button>
              </div>
            </div>
          </div>
          <div className="counter">
            <div className="row">
              <div className="col-6 col-lg-3">
                <div className="count-data text-center">
                  <h6 className="count h2" data-to={500} data-speed={500}>500</h6>
                  <p className="m-0px font-w-600">Happy Clients</p>
                </div>
              </div>
              <div className="col-6 col-lg-3">
                <div className="count-data text-center">
                  <h6 className="count h2" data-to={150} data-speed={150}>150</h6>
                  <p className="m-0px font-w-600">Project Completed</p>
                </div>
              </div>
              <div className="col-6 col-lg-3">
                <div className="count-data text-center">
                  <h6 className="count h2" data-to={850} data-speed={850}>850</h6>
                  <p className="m-0px font-w-600">Photo Capture</p>
                </div>
              </div>
              <div className="col-6 col-lg-3">
                <div className="count-data text-center">
                  <h6 className="count h2" data-to={190} data-speed={190}>190</h6>
                  <p className="m-0px font-w-600">Telephonic Talk</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}

export default Profile;
