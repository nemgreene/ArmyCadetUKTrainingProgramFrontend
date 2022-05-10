import React, { Component, useState, useEffect } from "react";
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Footer from './Footer'
import Header from './Header'
import { useParams, Link } from 'react-router-dom';


function withRouter(Component) {
  function ComponentWithRouter(props) {
    let params = useParams()
    // console.log(params)
    return <Component {...props} params={params} />
  }
  return ComponentWithRouter
}


class EditSesion extends Component { 
  constructor(props) {
    super(props)
  // / Setting up functions
  this.onChangeEventDate = this.onChangeEventDate.bind(this);
  this.onChangeEventDetachment = this.onChangeEventDetachment.bind(this);
  this.onChangeEventSession = this.onChangeEventSession.bind(this);
  this.onChangeEventLevel = this.onChangeEventLevel.bind(this);
  this.onChangeEventSubject1 = this.onChangeEventSubject1.bind(this);
  this.onChangeEventLesson1tutor = this.onChangeEventLesson1tutor.bind(this);
  this.onChangeEventEquipment = this.onChangeEventEquipment.bind(this);
  this.onChangeEventDress = this.onChangeEventDress.bind(this);
  this.onChangeEventSubject2 = this.onChangeEventSubject2.bind(this);
  this.onChangeEventLesson2tutor = this.onChangeEventLesson2tutor.bind(this);
  this.onChangeEventLesson1tutor = this.onChangeEventEquipment.bind(this);
  this.onChangeEventEquipment = this.onChangeEventEquipment.bind(this);
  this.onChangeEventDress = this.onChangeEventDress.bind(this);
  this.onSubmit = this.onSubmit.bind(this);

// Setting up state
this.state = {
  date: '',
  detachment:'',
  session:'',
  level: '',
  subject1: '',
  lesson1tutor:'',
  equipment1: '',
  dress1: '',
  subject2: '',
  lesson2tutor:'',
  equipment2: '',
  dress2: '',
  equipment: '',
  dress: ''
}
}
 
 componentDidMount() {    
  axios.get('https://kgtrainingserver.herokuapp.com/schedule/'+ this.props.params.id)
 .then(res => {
  this.setState({
  date: res.data.date,
  detachment: res.data.detachment,
  session: res.data.session,
  level: res.data.level,
  subject1: res.data.subject1,
  lesson1tutor: res.data.lesson1tutor,
  equipment: res.data.equipment,
  dress: res.data.dress,
  subject2: res.data.subject2,
  lesson2tutor: res.data.lesson2tutor
     });
     console.log(res)  
  })
.catch((error) => {
   console.log(error);
   })
 }
 onChangeEventDate(e) {
  this.setState({ date: e.target.value })
}
onChangeEventDetachment (e) {
  this.setState({ detachment: e.target.value })
}
onChangeEventSession(e) {
  this.setState({ session: e.target.value })
}
onChangeEventLevel(e) {
  this.setState({ level: e.target.value })
}
onChangeEventSubject1 (e) {
  this.setState({ subject1: e.target.value })
}

onChangeEventLesson1tutor(e) {
  this.setState({ lesson1tutor: e.target.value })
}

onChangeEventEquipment(e) {
  this.setState({ equipment: e.target.value })
}
onChangeEventDress(e) {
  this.setState({ dress: e.target.value })
}
onChangeEventSubject2(e) {
  this.setState({ subject2: e.target.value })
}
onChangeEventLesson2tutor(e) {
  this.setState({ lesson2tutor: e.target.value })
}
onSubmit(e) {
 e.preventDefault()
  const eventObject = {
    date: this.state.date,
    detachment: this.state.detachment,
    session: this.state.session,
    level: this.state.level,
    subject1: this.state.subject1,
    lesson1tutor: this.state.lesson1tutor,
    equipment: this.state.equipment,
    dress: this.state.dress,
    subject2: this.state.subject2,
    lesson2tutor: this.state.lesson2tutor
  };

 axios.put('https://kgtrainingserver.herokuapp.com/schedule/update-event/' + this.props.params.id, eventObject)
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
   <div className="form-wrapper">
     <Header />
     <Container>
         <div ><br/>         
           <h2>Edit lesson</h2></div>
           <Form onSubmit={this.onSubmit}>
          First lesson
        <Form.Group controlId="Date">
          <Form.Label>Date</Form.Label>
          <Form.Control type="text" value={this.state.date} onChange={this.onChangeEventDate} />
        </Form.Group>
        <Form.Group controlId="Detachment">
          {/* get date from mongodb */}
          <Form.Label>Detachment</Form.Label>                  
          <Form.Control type="text" value={this.state.detachment} onChange={this.onChangeEventDetachment} />
        </Form.Group> 
        <Form.Group controlId="Session">
          <Form.Label>Session</Form.Label>
          <Form.Control type="text" value={this.state.session} onChange={this.onChangeEventSession} >
          <option> 1 </option>
          <option> 2 </option>
        </Form.Control> 
        </Form.Group>
        <Form.Group controlId="Level">
          <Form.Label>Level</Form.Label>
          <Form.Control type="text" value={this.state.level} onChange={this.onChangeEventLevel} >
          <option> Basic </option>
          <option> 1 </option>
          <option> 2 </option>
          <option> 3 </option>
        </Form.Control> 
        </Form.Group>
        {/* get date from mongodb */}
        <Form.Group controlId="Subject1">
          <Form.Label>Subject1</Form.Label>
          <Form.Control type="text" value={this.state.subject1} onChange={this.onChangeEventSubject1} />
        </Form.Group>
           {/* get date from mongodb */}
        <Form.Group controlId="Instructor 1">
          <Form.Label>Instructor 1</Form.Label>
          <Form.Control type="text" value={this.state.lesson1tutor} onChange={this.onChangeEventLesson1tutor} />
        </Form.Group>
        {/* get date from mongodb */}
        <Form.Group controlId=" Equipment">
          <Form.Label> Equipment1</Form.Label>
          <Form.Control type="text" value={this.state.equipment} onChange={this.onChangeEventEquipment} />
        </Form.Group>
        {/* get date from mongodb */}
        <Form.Group controlId="Dress">
          <Form.Label>Dress 1</Form.Label>
          <Form.Control type="text" value={this.state.dress} onChange={this.onChangeEventDress} />
        </Form.Group>
        {/* get date from mongodb */}
        <Form.Group controlId="Subject1">
          <Form.Label>Subject2</Form.Label>
          <Form.Control type="text" value={this.state.subject2} onChange={this.onChangeEventSubject2} />
        </Form.Group>
           {/* get date from mongodb */}
        <Form.Group controlId="Instructor 1">
          <Form.Label>Instructor 2</Form.Label>
          <Form.Control type="text" value={this.state.lesson2tutor} onChange={this.onChangeEventLesson2tutor} />
        </Form.Group>
 <br/>
  <Button  variant="danger" size="lg" block="block" type="submit">
  Update
 </Button>
 
 <Button  href="/" variant="success" size="lg" block="block" type="submit">
   Back
 </Button>
 </Form>
 </Container>
 <Footer /> 
 </div>);
  }
 }
const HOCEditSesion = withRouter(EditSesion);

 export default HOCEditSesion;