import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
//import { Route, Routes, Link, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
//import html2canvas from 'html2canvas';
//import { jsPDF } from 'jspdf';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import axios from 'axios';

import './tabledata.css';
import Footer from './Footer'
//import { useParams, Link } from 'react-router-dom';
import { IconContext } from "react-icons";
import { IoIosArrowDown} from "react-icons/io";

class EditUser extends React.Component {
  
	// Constructor for month training
	constructor(props) {
		super(props);
		this.state = {			
      _id : "",
      detachment: "",
      email: "",
      originalemail: "",
      rank: "",
      firstname: "",
      lastname: "",
      role: 1,
      level: [],
      password: "",
      children: [],
			DataisLoaded: false
		};
	}
  
  handleChange(event) {
    const newState = {...this.state};        
     
    console.log("handleChange()", newState);
    switch (event.target.type)
    {
        case "checkbox":
            newState[event.target.id] = Boolean(event.target.checked);        
            break;
        case "number":
            newState[event.target.id] = Number(event.target.value);
            break;
        default:
            console.log("target", event.target.id)
            newState[event.target.id] = event.target.value;    
            console.log("newstate",newState);
            break;
    }
        
      this.setState({
          _id : newState._id,
        email: newState.email,
        originalemail: newState.originalemail,
        rank: newState.rank,
        firstname: newState.firstname,
        lastname: newState.lastname,
        role: newState.role,
        level: newState.level,
        password: newState.password,
        children: newState.children,
        detachment: newState.detachment,
        DataisLoaded: newState.DataisLoaded
     
			})      
      console.log("state",this.state);

  }

  postItems(url, dataToPost) {

    return axios
    .post(url, dataToPost)
    .then(this.responseStatusCheck)
    .catch((error) => {
       console.log(error);
    });
  }

  submitHandler = (e) => {
    e.preventDefault();  
    
    console.log(this.state);
    axios.post("http://kgtrainingserver.herokuapp.com/users/modify", 
                { "rank": this.state.rank,
                  "firstname": this.state.firstname,
                  "lastname": this.state.lastname,
                  "email": this.state.email,
                  "originalemail": this.state.originalemail,
                  "password": this.state.password,
                  "role": this.state.role,
                  "level": this.state.level,
                  "detachment": this.state.detachment,
                  "children": this.state.children
                })
                .then((response) => {
                  console.log("posted ok");
                });
                
}    

	// ComponentDidMount for
	// fetch from db
	componentDidMount() {
    if (this.state.DataisLoaded === false) {
    this.postItems("https://kgtrainingserver.herokuapp.com/users/showfiltered", 
                   { "filters": { "email": this.props.emailID } })
    .then((response) => {
      console.log("state",response.data[0])
			this.setState({        
        _id : response.data[0].id,
        detachment: response.data[0].detachment,
        email: response.data[0].email,
        originalemail: response.data[0].email,
        rank: response.data[0].rank,
        firstname: response.data[0].firstname,
        lastname: response.data[0].lastname,
        role: response.data[0].role,
        level: response.data[0].level,
        password: response.data[0].password,
        children: response.data[0].children,
        DataisLoaded: true
			})        
     })
   }
  }

	render() {
  
		return (
      <>
    <div className='main'>
   <div className="form-wrapper">
     <Container>
         <div className='heading'>
         <IconContext.Provider value={{size:"70"
					}}>
						<div className="arrow">
						<IoIosArrowDown />
						</div>
						</IconContext.Provider>
           <h2 >Edit user</h2></div>
     <Form  className='formEdit' onSubmit={(e) => this.submitHandler(e)}>
     <Form.Group className="text1" controlId="detachment">
       <Form.Label>Detachment</Form.Label>
         <Form.Control className="text" type="text" value={this.state.detachment} onChange={(e) => this.handleChange(e)} />
       </Form.Group>
      <Form.Group className="text1" controlId="firstname">
       <Form.Label>Name</Form.Label>
         <Form.Control className="text" type="text" value={this.state.firstname} onChange={(e) => this.handleChange(e)} />
       </Form.Group>
      <Form.Group className="text1" controlId="lastname">
       <Form.Label>Surname</Form.Label>
      <Form.Control  className="text" type="text" value={this.state.lastname} onChange={(e) => this.handleChange(e)} />
      </Form.Group>
      <Form.Group className="text1" controlId="email">
        <Form.Label>Email</Form.Label>
          <Form.Control className="text" type="text" value={this.state.email} onChange={(e) => this.handleChange(e)} />
      </Form.Group>
      <Form.Group className="text1" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control  className="text" type="text" value={this.state.password} onChange={(e) => this.handleChange(e)} />
      </Form.Group>
      <Form.Group className="text1" controlId="role">
        <Form.Label>Role</Form.Label>
        <Form.Control as="select" value={this.state.role} onChange={(e) => this.handleChange(e)}>
        <option>User</option>
        <option>Cadet</option>
        <option>Parent</option>
        <option>Instructor</option>
        <option>Comander</option>
        </Form.Control>        
      </Form.Group>
 <br/>
  <Button className="btn_create" variant="danger" size="lg" block="block" type="submit">
  Update
 </Button>
 
 <Button className="btn_create" href="/" variant="success" size="lg" block="block" type="submit">
   Back
 </Button>
 </Form>

 </Container>
 <br/><br/>
 </div>
 </div>
 <Footer /> 
 </>
  );	
}
}

export default EditUser;