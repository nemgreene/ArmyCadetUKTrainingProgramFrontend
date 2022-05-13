// import React from 'react';
// import Header from './Header'
// import html2canvas from 'html2canvas';
// import { jsPDF } from 'jspdf';
// import './tabledata.css';
// import Footer from './Footer'
// import greenlogo from '../images/greenlogo.png'

// class TrainingTable extends React.Component {

//  // Constructor for month training
//  constructor(props) {
//      super(props);
//      this.state = {
//          items: [],
//          DataisLoaded: false
//      };
//  }

//  // ComponentDidMount for
//  // fetch from db
//  componentDidMount() {
//      fetch(
// "https://kgtrainingserver.herokuapp.com/schedule")
//          .then((res) => res.json())
//          .then((json) => {
//              this.setState({
//                  items: json,
//                  DataisLoaded: true
//              });
//          })
//  }
//  render() {
//     const printRef = React.createRef();
//   const handleDownloadPdf = async () => {
//     const element = printRef.current;
//     const canvas = await html2canvas(element);
//     const data = canvas.toDataURL('image/png');
//     const pdf = new jsPDF();
//     const imgProperties = pdf.getImageProperties(data);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight =
//       (imgProperties.height * pdfWidth) / imgProperties.width;
//     pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
//     pdf.save('print.pdf');
//   };
//      const { DataisLoaded, items } = this.state;
//      // if (!DataisLoaded) return <div>
//      //  <h1> Pleses wait some time.... </h1> </div> ;
//      return (
//       <div>
//          <Header />
//      <div className = "main">
//        <button className='pdf' type="button" onClick={handleDownloadPdf}>
//         Download as PDF
//       </button>
//       <div ref={printRef} className="form">
//       <img src={greenlogo}></img>

//       <form onSubmit={this.handleSubmit}>

//       <label className='label'>
//           Month:
//           <br/>
//           <select style={{"width":"50%"}}value={this.state.value} onChange={this.handleChange}>
//             <option value="April">April</option>
//             <option value="May">May</option>
//             <option value="June">June</option>
//             <option value="July">July</option>
//           </select>
//         </label>
//         <br/>
//         <label className='label'>
//          Level
//          <br/>
//          <select value={this.state.value} onChange={this.handleChange}>
//            <option value="All">All</option>
//             <option value="Basic">Basic</option>
//             <option value="First">First</option>
//             <option value="Second">Second</option>
//             <option value="Theard">Theard</option>
//             <option value="For">For</option>
//           </select>
//         <br/>
//         </label>
//         <br/><br/>
//         <input className='btn_create' type="submit" value="Submit" />
//       </form>
//       <br/><br/>

//          <h1> Monthly Training Program </h1>
//       <br/>
//       <table>
//       <tbody>
//                 <tr>
//                     <th>Days</th>
//                     <th>Detachment</th>
//                     <th>Level</th>
//                     <th>Subject</th>
//                     <th>Lesson 1</th>
//                     <th>Instructor 1</th>
//                     <th>Equipment 1</th>
//                     <th>Subject 2</th>
//                     <th>Lesson 2</th>
//                     <th>Instructor 2</th>
//                     <th>Dress 2</th>
//                     <th>Equipment 2</th>
//                 </tr>
//                 {items.map((item, i) => (
//                     <tr key={item._id}>
//                        <td>{item.date}</td>
//                        <td>{item.detachment}</td>
//                        <td>{item.level}</td>
//                         <td>{item.subject1 }</td>
//                         <td>{item.lesson1}</td>
//                         <td>{item.lesson1tutor}</td>
//                         <td>{item.equipment}</td>
//                         <td>{item.subject2 }</td>
//                         <td>{item.lesson2}</td>
//                         <td>{item.lesson2tutor}</td>
//                         <td>{item.dress}</td>
//                         <td>{item.equipment}</td>

//                     </tr>
//                 ))}
//                 </tbody>
//                 </table>
//                 </div>
//                 </div>
//                 <Footer />
//      </div>
//  );
// }
// }
// export default TrainingTable;
// import logo from './logo.svg';
// import './App.css';
import Header from "./Header";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "./tabledata.css";
import TransactionsLogTable from "./TransactionsLogTable";
import axios from "axios";
import Table from "./TableContainer";
import Footer from "./Footer";
import greenlogo from "../images/greenlogo.png";
import React, { useEffect, useState } from "react";
function TrainingTable() {
  const [data, setData] = useState([]);

  //pdf upload
  const printRef = React.createRef();
  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("print.pdf");
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
      Header: "Lesson",
      accessor: "lesson1",
      accessor: "lesson2",
    },
    {
      Header: "Subject",
      accessor: "subject1",
      accessor: "subject2",
    },
    {
      Header: "Equipment",
      accessor: "equipment",
    },
    {
      Header: "Dress",
      accessor: "dress",
    },
  ];

  return (
    <div className="App">
      <Header />
      <div className="main">
        <button className="pdf" type="button" onClick={handleDownloadPdf}>
          Download as PDF
        </button>
        <div ref={printRef} className="form">
          <br />
          <img src={greenlogo}></img>
          <h2>Humberside and South Yorkshire ACF </h2>
          <br />
          <h3>Automated Detachment Training Program </h3>
          <br />
          <br />
          <TransactionsLogTable columns={columns} data={data} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default TrainingTable;
