import React from 'react';
import { Link } from "react-router-dom";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import './tabledata.css';
import Footer from './Footer'
import Header from './Header'
import greenlogo from '../images/greenlogo.png'
import axios from 'axios';

  

class TrainingRole extends React.Component {  

// Constructor for month training
constructor(props) {
    super(props);

    this.state = {
        items: [],
        DataisLoaded: false
    };
}

deleteUser(emailID) {
  axios.post("http://kgtrainingserver.herokuapp.com/users/delete", { "email": emailID })
  .then((resp) => {
    // the below code effectively reloads the page using react-router-dom,
    // doing this to reload the page data.    
    this.props.navigate(0);
  })
}

levelToStars(levelsArray) {
  //&#9733; << the code for the solid star icon from iso 8559?
  // todo: need to remove the last comma from the string/array...
  return levelsArray.map((level) => {
    switch(level) {      
      case "One":
        return (
          <span>(One)&#9733;,&nbsp;</span>
        );        
      case "Two":
        return (
          <span>(Two)&#9733;&#9733;,&nbsp;</span>
        );        
      case "Three":
        return (
          <span>(Three)&#9733;&#9733;&#9733;,&nbsp;</span> 
        );      
      case "Four":
        return (
          <span>(Four)&#9733;&#9733;&#9733;&#9733;,&nbsp;</span>
        );
      default:
        return (
          <span>{level},&nbsp;</span>
        );
    }    
  })
}

// ComponentDidMount for
// fetch from db
componentDidMount() {
    fetch(
"https://kgtrainingserver.herokuapp.com/users")
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
const element = printRef.current;
const canvas = await html2canvas(element);
const data = canvas.toDataURL('image/png');

const pdf = new jsPDF();
const imgProperties = pdf.getImageProperties(data);
const pdfWidth = pdf.internal.pageSize.getWidth();
const pdfHeight =
  (imgProperties.height * pdfWidth) / imgProperties.width;

pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
pdf.save('print.pdf');
};
    const { DataisLoaded, items } = this.state;
    if (!DataisLoaded) return <div>
        <h1> Please wait some time.... </h1> </div> ;

    return (
      <div>
        <Header />
      
    <div className = "main">
   <button type="button" className='pdf' onClick={handleDownloadPdf}>
    Download as PDF
  </button>
  <div ref={printRef} className='form'>    	
<br/>
<img src={greenlogo}></img>
<h3>User list</h3>
<br/>
<br/>      
  <tbody>                
      <tr>
          <th>Detachment</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>Role</th> 
          <th>Level</th>
          <th>Controls</th>
      </tr>
      {items.map((item, i) => (
          <tr key={item._id}>
            <td>{item.detachment}</td>
            <td>{item.firstname}</td>
            <td>{item.lastname}</td>
            <td>{item.email}</td>
            <td>{item.password}</td>
            <td>{item.role}</td> 
            <td>{this.levelToStars(item.level)}</td>
            <td>
              <button className="btn_edit" onMouseEnter={() => { this.props.handleEditClick(item.email); }}>
                <Link className="btn_edit" to="/modify-user" >Edit</Link>
              </button>
              <button className='btn_delete' onClick={() => this.deleteUser(item.email)}>
                Delete
              </button>
            </td>
          </tr>
      ))}
    </tbody>
  </div>
    </div>
    <Footer /> 
    </div>
);
}
}
       
           

export default TrainingRole;