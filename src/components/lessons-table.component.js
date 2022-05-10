import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import Header from './Header'
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import './tabledata.css';
import Button from 'react-bootstrap/Button';
import greenlogo from '../images/greenlogo.png'



  

class LessonsTable extends React.Component {
  
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
			<h1> Pleses wait some time.... </h1> </div> ;

		return (
      <div>
      <Header />
		<div className = "main">
    
      
       <button className='pdf' type="button" onClick={handleDownloadPdf}>
        Download as PDF
      </button>
      <div ref={printRef} className="form">
      <br/>
      <img src={greenlogo}></img>
	<h2>Humberside and South Yorkshire ACF </h2>  
    <br/>
<h3>Automated Detachment Training Program   </h3>
<br/>
<br/>
      
      <tbody>
                <tr>
                    <th colspan="2">Detachment Name</th>
                    <th colspan="5"> 
      <label>
      Choose Detachment:
          <br/>
          <select value={this.state.value} onChange={this.handleChange}>
           <option value="Basic">All</option>
            <option value="April">Detachment2</option>
            <option value="May">Detachment3</option>
            <option value="June">Detachment4</option>            
          </select>          
        </label></th>                    
                </tr>
                <tr>
                    <th colspan="2">Training Program Start Dates</th>
                    <th colspan="1"> 
              <label>
     Date:
          <br/>
          <select value={this.state.value} onChange={this.handleChange}>
           <option value="Basic">1/06/2022</option>
            <option value="April">12/06/2022</option>
            <option value="May">30/06/2022</option>
            <option value="June">1/07/2022</option>            
          </select> 
          </label>
          </th>     
          <th colspan="2"> 
          <label>
          Choose level:
          <br/>
          <select value={this.state.value} onChange={this.handleChange}>
           <option value="Basic">All</option>
            <option value="April">Basic</option>
            <option value="May">First</option>
            <option value="June">Second</option>            
          </select> 
          </label>
          </th> 
          <th colspan="3"> 
          <label>
          Choose instructor:
          <br/>
          <select value={this.state.value} onChange={this.handleChange}>
           <option value="Basic">All</option>
            <option value="April">ALL Bond</option>
            <option value="May">Nevil Jons</option>
            <option value="June">Joy Mayron</option>            
          </select> 
          </label>
          </th>         
                </tr>
                <tr><th>Detachment</th>
                    <th>Level</th>
                    <th>Lesson</th>
                    <th>Instructors</th>
                    <th>Dress</th> 
                    <th>Equipment</th>                                          
                </tr>
                {items.map((item, i) => (
                    <tr key={item._id}>
                        <td>{item.detachment}</td>
                        <td>{item.level}</td>
                        <td>{item.lesson1}{item.lesson2}</td>
                        <td>{item.lesson1tutor}
                        {item.lesson2tutor}</td>
                        <td>{item.dress}</td>
                        <td>{item.equipment}</td>                       
                        
                    </tr>

                ))}
                </tbody>
                </div>
                <br/><br/>
                <Footer /> 
		</div>
    </div>
	);
}
}

export default LessonsTable;