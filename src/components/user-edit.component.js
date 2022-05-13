import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./tabledata.css";
import Header from "./Header";
import Footer from "./Footer";
import { useParams } from "react-router-dom";

import { IconContext } from "react-icons";
import { IoIosArrowDown } from "react-icons/io";

function withRouter(Component) {
  function ComponentWithRouter(props) {
    let params = useParams();
    // console.log(params)
    return <Component {...props} params={params} />;
  }
  return ComponentWithRouter;
}

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeEventLevel = this.onChangeEventLevel.bind(this);
    this.onChangeEventDetachment = this.onChangeEventDetachment.bind(this);
    this.onChangeEventFirstname = this.onChangeEventFirstname.bind(this);
    this.onChangeEventLastname = this.onChangeEventLastname.bind(this);
    this.onChangeEventEmail = this.onChangeEventEmail.bind(this);
    this.onChangeEventPassword = this.onChangeEventPassword.bind(this);
    this.onChangeEventRole = this.onChangeEventRole.bind(this);
    this.onSubmit = this.onSubmit.bind(this);


class EditUser extends Component { 
  
constructor(props) {
  super(props)
  this.onChangeEventLevel = this.onChangeEventLevel.bind(this);
  this.onChangeEventDetachment = this.onChangeEventDetachment.bind(this);
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
    detachment: '',
    level: [],
    originalemail: '',
    id: this.props.params.id
   }
  
 }

 componentDidMount() {    
  axios.post('https://kgtrainingserver.herokuapp.com/users/showfiltered', { "filters": { "email": this.props.emailID } })
 .then((res) => {

  // original email is added for when we send back modified data, if the email address is
  // modified we need to know the original email to get the original data back in the
  // server side api.
  this.setState({
    firstname: res.data[0].firstname,
    lastname: res.data[0].lastname,
    email: res.data[0].email,
    password: res.data[0].password,
    detachment: res.data[0].detachment,
    role: res.data[0].role,
    level: res.data[0].level,
    originalemail: res.data[0].email
  });
     
  })
.catch((error) => {
   console.log(error);
   })
 }



  onChangeEventDetachment(e) {
    this.setState({ detachment: e.target.value });
  }

  onChangeEventLevel(e) {
    this.setState({
      level: Array.from(e.currentTarget.selectedOptions, (v) => v.value),
    });
  }

  onChangeEventFirstname(e) {
    this.setState({ firstname: e.target.value });
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

  // setup the user object to save back to the mongo db collection,
  // requires the original email despite not being an actual field in
  // the collection. This field is required because of the possibility
  // of changing the email, the email is set to be unique and is used
  // as an identifier instead of objectID.
  const userObject = {
  detachment: this.state.detachment,
  firstname: this.state.firstname,
  lastname: this.state.lastname,
  email: this.state.email,
  password:this.state.password,
  role: this.state.role,
  level: this.state.level,
  originalemail: this.state.originalemail
  };

 // Update the user using modify function in api
 axios.post('https://kgtrainingserver.herokuapp.com/users/modify', userObject)
 .then((res) => {
   console.log("email", this.props.emailID)
   console.log(res.data)
    console.log('Events successfully updated')
    }).catch((error) => {
     console.log(error)
   })
   // Redirect to Event List 
   alert("User updated successfully !")
   // now redirect user back to /role page (user list)
   this.props.navigate("/role");
 }
 
detachmentOptions() {

    return this.props.detachments.map((detachment) => (      
        <option>{detachment.description}</option>
    ))

}

render() {     
  console.log("k1", this.state);

   return (
     <>
     <div>
         <Header />
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
      <Form.Group className="text1" controlId="Detachment">
        <Form.Label>Detachment</Form.Label>
        <Form.Control as="select" value={this.state.detachment} onChange={this.onChangeEventDetachment}>
           {this.detachmentOptions()}
        </Form.Control>        
      </Form.Group>
      <Form.Group className="text1" controlId="Level">
        <Form.Label>Level</Form.Label>
        <Form.Control as="select" value={this.state.level} onChange={this.onChangeEventLevel} multiple={true}>
           <option value="All">All</option>
           <option value="Basic">Basic</option>
           <option value="One">One</option>
           <option value="Two">Two</option>
           <option value="Three">Three</option>
           <option value="Four">Four</option>           
        </Form.Control>        
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


  onChangeEventLastname(e) {
    this.setState({ lastname: e.target.value });
  }
  onChangeEventEmail(e) {
    this.setState({ email: e.target.value });
  }
  onChangeEventPassword(e) {
    this.setState({ password: e.target.value });
  }
  onChangeEventRole(e) {
    this.setState({ role: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    // setup the user object to save back to the mongo db collection,
    // requires the original email despite not being an actual field in
    // the collection. This field is required because of the possibility
    // of changing the email, the email is set to be unique and is used
    // as an identifier instead of objectID.
    const userObject = {
      detachment: this.state.detachment,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      role: this.state.role,
      level: this.state.level,
      originalemail: this.state.originalemail,
    };

    // Update the user using modify function in api
    axios
      .post("https://kgtrainingserver.herokuapp.com/users/modify", userObject)
      .then((res) => {
        console.log("email", this.props.emailID);
        console.log(res.data);
        console.log("Events successfully updated");
      })
      .catch((error) => {
        console.log(error);
      });
    // Redirect to Event List
    alert("User updated successfully !");
    // now redirect user back to /role page (user list)
    this.props.navigate("/role");
  }

  detachmentOptions() {
    return this.props.detachments.map((detachment) => (
      <option>{detachment.description}</option>
    ));
  }

  render() {
    console.log("k1", this.state);

    return (
      <>
        <div>
          <Header />
          <div className="main">
            <div className="form-wrapper">
              <Container>
                <div className="heading">
                  <IconContext.Provider value={{ size: "70" }}>
                    <div className="arrow">
                      <IoIosArrowDown />
                    </div>
                  </IconContext.Provider>
                  <h2>Edit user</h2>
                </div>
                <Form className="formEdit" onSubmit={this.onSubmit}>
                  <Form.Group className="text1" controlId="Firstname">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      className="text"
                      type="text"
                      value={this.state.firstname}
                      onChange={this.onChangeEventFirstname}
                    />
                  </Form.Group>
                  <Form.Group className="text1" controlId="Lastname">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control
                      className="text"
                      type="text"
                      value={this.state.lastname}
                      onChange={this.onChangeEventLastname}
                    />
                  </Form.Group>
                  <Form.Group className="text1" controlId="Email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      className="text"
                      type="text"
                      value={this.state.email}
                      onChange={this.onChangeEventEmail}
                    />
                  </Form.Group>
                  <Form.Group className="text1" controlId="Password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      className="text"
                      type="text"
                      value={this.state.password}
                      onChange={this.onChangeEventPassword}
                    />
                  </Form.Group>
                  <Form.Group className="text1" controlId="Detachment">
                    <Form.Label>Detachment</Form.Label>
                    <Form.Control
                      as="select"
                      value={this.state.detachment}
                      onChange={this.onChangeEventDetachment}
                    >
                      {this.detachmentOptions()}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group className="text1" controlId="Level">
                    <Form.Label>Level</Form.Label>
                    <Form.Control
                      as="select"
                      value={this.state.level}
                      onChange={this.onChangeEventLevel}
                      multiple={true}
                    >
                      <option value="All">All</option>
                      <option value="Basic">Basic</option>
                      <option value="One">One</option>
                      <option value="Two">Two</option>
                      <option value="Three">Three</option>
                      <option value="Four">Four</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group className="text1" controlId="Role">
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                      as="select"
                      value={this.state.role}
                      onChange={this.onChangeEventRole}
                    >
                      <option>User</option>
                      <option>Cadet</option>
                      <option>Parent</option>
                      <option>Instructor</option>
                      <option>Comander</option>
                    </Form.Control>
                  </Form.Group>
                  <br />
                  <Button
                    className="btn_create"
                    variant="danger"
                    size="lg"
                    block="block"
                    type="submit"
                  >
                    Update
                  </Button>

                  <Button
                    className="btn_create"
                    href="/"
                    variant="success"
                    size="lg"
                    block="block"
                    type="submit"
                  >
                    Back
                  </Button>
                </Form>
              </Container>
              <br />
              <br />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
const HOCEditUser = withRouter(EditUser);

export default HOCEditUser;
