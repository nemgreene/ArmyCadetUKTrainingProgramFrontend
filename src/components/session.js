import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './tabledata.css';
import Footer from './Footer'   

class TrainingSession extends React.Component {  

// Constructor for month training
constructor(props) {
    super(props);

    this.state = {
        items: [],
        DataisLoaded: false
    };
}


// ComponentDidMount for
// fetch from db
componentDidMount() {
    fetch(
"https://kgtrainingserver.herokuapp.com/schedule")
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                items: json,
                DataisLoaded: true
            });
        })
}

render() {
const printRef = React.createRef();

const handleDownloadPdf = async () => {


};
    const { DataisLoaded, items } = this.state;
    if (!DataisLoaded) return <div>
        <h1> Please wait some time.... </h1> </div> ;

    return (
    <div className = "main">  
  <div ref={printRef} className='form'>    	
<br/>
<h3>List of lessons</h3>
<br/>
<br/>      
  <tbody>                
      <tr>
          <th>Date</th>
          <th>Detachment</th>
          <th>Session</th>
          <th>Level</th>
          <th>Subject №1</th>         
          <th>instructor №1</th>                      
          <th>Equpment №1</th>
          <th>Dress №1</th>
          <th>Subject №2</th>         
          <th>instructor №2</th>                      
          <th>Equpment №2</th>
          <th>Dress №2</th>
          <th>Controls</th>
      </tr>
      {items.map((item, i) => (        
            <tr key={item._id}>
             <td>{item.date}</td>
             <td>{item.detachment}</td>
             <th>{item.session}</th>
             <td>{item.level}</td>
             <td>{item.subject1}</td>
             <td>{item.lesson1tutor}</td>
             <td>{item.equipment}</td>            
             <td>{item.dress}</td>
             <td>{item.subject2}</td>
             <td>{item.lesson2tutor}</td>
             <td>{item.equipment}</td>            
             <td>{item.dress}</td>            
             <td>            
              <button className="btn_edit" onMouseEnter={() => { this.props.handleEditClick(item.email); }}>
                <Link className="btn_edit" to="/edit-lesson" >Edit</Link>
              </button>
              <button className='btn_delete'>Delete</button>
            </td> 
          </tr>
         
      ))}
    </tbody>
  </div>
    </div>
);
}
}
            
<Footer /> 

export default TrainingSession;