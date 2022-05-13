import Header from './Header'
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import './tabledata.css';
import TransactionsLogTable from "./TransactionsLogTable";
import axios from "axios";
import Table from "./TableContainer";
import Footer from './Footer'
import greenlogo from '../images/greenlogo.png'
import React, { useEffect, useState } from 'react';

function TrainingTable() {
  const [data, setData] = useState([]);
  

  //pdf upload

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
		
		

  useEffect(() => {
    axios("https://kgtrainingserver.herokuapp.com/schedule")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const columns = [
   
    {
      Header: "Date",
      accessor: "date",
    //   Cell: (cellProps) => {
    //       let date = new Date(cellProps.value).toDateString();
          
    // },
  },
    {
      Header: "Detachment",
      accessor: "detachment",
    },
    {
      Header: "Level",
      accessor: "level",
      
    },
    {
      Header: "Lesson 1",
      accessor: "lesson1",
      
    },
    {
      Header: "Instructor 1",
      accessor: "lesson1tutor",
      
    },
    
    {
      Header: "Subject 1",
      accessor: "subject1",
      
    },
    {
      Header: "Equipment 1",
      accessor: "equipment",
      
    },
    {
      Header: "Dress 1",
      accessor: "dress",      
    },
    {
      Header: "Lesson 2",
      accessor: "lesson2",
      
    },
    {
      Header: "Instructor 2",
      accessor: "lesson2tutor",
      
    },
    
    {
      Header: "Subject 2",
      accessor: "subject2",
      
    },
    {
      Header: "Equipment 2",
      accessor: "equipment",
      
    },
    {
      Header: "Dress 2",
      accessor: "dress",      
    },
    
    
  ];
  
  return (
    <div className="App">
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
< TransactionsLogTable columns={columns} data={data} />
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default TrainingTable;
