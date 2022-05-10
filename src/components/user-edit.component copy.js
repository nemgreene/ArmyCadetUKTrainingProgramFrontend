import React, { Component, useState, useEffect } from "react";
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './tabledata.css';
import Footer from './Footer'
import { useParams, Link } from 'react-router-dom';
import { IconContext } from "react-icons";
import { IoIosArrowDown} from "react-icons/io";

function withRouter(Component) {
  function ComponentWithRouter(props) {
    let params = useParams()
    // console.log(params)
    return <Component {...props} params={params} />
  }
  return ComponentWithRouter
}


class EditUser extends Component { 
  
constructor(props) {
  super(props)
  this.onChangeEventFirstname = this.onChangeEventFirstname.bind(this);
  this.onChangeEventLastname = this.onChangeEventLastname.bind(this);
  this.onChangeEventEmail = this.onChangeEventEmail.bind(this);
  this.onChangeEventPassword = this.onChangeEventPassword.bind(this);
  this.onChangeEventRole = this.onChangeEventRole.bind(this);
  this.onSubmit = this.onSubmit.bind(this);
  

// State
 this.state = {
  firstname: '',
  lastname:'',
  email:'',
  password: '',
  role: '',
  id: this.props.params.id
  
  }
 }
 
 componentDidMount() {    
  axios.get('https://kgtrainingserver.herokuapp.com/users/'+ this.props.params.id)
 .then(res => {
  this.setState({
  firstname: res.data.firstname,
  lastname: res.data.lastname,
  email: res.data.email,
  password: res.data.password,
  role: res.data.role
     });
     console.log(res)  
  })
.catch((error) => {
   console.log(error);
   })
 }
onChangeEventFirstname(e) {
this.setState({ firstname: e.target.value })
 }

 onChangeEventLastname(e) {
 this.setState({ lastname: e.target.value })
  }
onChangeEventEmail(e) {
 this.setState({ email: e.target.value })
}
 onChangeEventPassword(e) {
 this.setState({password: e.target.value })
}
 onChangeEventRole(e) {
 this.setState({ role: e.target.value })
 }
onSubmit(e) {
 e.preventDefault()
  const eventObject = {
  firstname: this.state.firstname,
  lastname: this.state.lastname,
  email: this.state.email,
  password:this.state.password,
  role: this.state.role
  };

 axios.put('https://kgtrainingserver.herokuapp.com/users/update-event/' + this.props.params.id, eventObject)
 .then((res) => {
   console.log("id", this.props.params.id)
   console.log(res.data)
    console.log('Events successfully updated')
    }).catch((error) => {
     console.log(error)
   })
   // Redirect to Event List 
   alert("Event updated successfully !")
  this.props.history.push('/')  
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
     <Form  className='formEdit' onSubmit={this.onSubmit}>
      <Form.Group className="text1" controlId="Firstname">
       <Form.Label>Name</Form.Label>
         <Form.Control className="text" type="text" value={this.state.firstname} onChange={this.onChangeEventFirstname} />
       </Form.Group>
      <Form.Group className="text1" controlId="Lastname">
       <Form.Label>Surname</Form.Label>
      <Form.Control  className="text" type="text" value={this.state.lastname} onChange={this.onChangeEventLastname} />
      </Form.Group>
      <Form.Group className="text1" controlId="Email">
        <Form.Label>Email</Form.Label>
          <Form.Control className="text" type="text" value={this.state.email} onChange={this.onChangeEventEmail} />
      </Form.Group>
      <Form.Group className="text1" controlId="Password">
        <Form.Label>Password</Form.Label>
        <Form.Control  className="text" type="text" value={this.state.password} onChange={this.onChangeEventPassword} />
      </Form.Group>
      <Form.Group className="text1" controlId="Role">
        <Form.Label>Role</Form.Label>
        <Form.Control as="select" value={this.state.role} onChange={this.onChangeEventRole}>
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
const HOCEditUser = withRouter(EditUser);

 export default HOCEditUser;
