// import React, { useState, useEffect } from 'react';
// import Footer from './Footer';
// import Header from './Header'
// import html2canvas from 'html2canvas';
// import { jsPDF } from 'jspdf';
// import './tabledata.css';
// import Button from 'react-bootstrap/Button';
// import greenlogo from '../images/greenlogo.png'



  

// class LessonsTable extends React.Component {
  
// 	// Constructor for month training
// 	constructor(props) {
// 		super(props);

// 		this.state = {
// 			items: [],
// 			DataisLoaded: false
// 		};
// 	}
  
  
// 	// ComponentDidMount for
// 	// fetch from db
// 	componentDidMount() {
// 		fetch(
// "https://kgtrainingserver.herokuapp.com/schedule")
// 			.then((res) => res.json())
// 			.then((json) => {
// 				this.setState({
// 					items: json,
// 					DataisLoaded: true
// 				});
// 			})
// 	}

// 	render() {
  //   const printRef = React.createRef();

  // const handleDownloadPdf = async () => {
  //   const element = printRef.current;
  //   const canvas = await html2canvas(element);
  //   const data = canvas.toDataURL('image/png');

  //   const pdf = new jsPDF();
  //   const imgProperties = pdf.getImageProperties(data);
  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight =
  //     (imgProperties.height * pdfWidth) / imgProperties.width;

  //   pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
  //   pdf.save('print.pdf');
  // };
	// 	const { DataisLoaded, items } = this.state;
	// 	if (!DataisLoaded) return <div>
	// 		<h1> Pleses wait some time.... </h1> </div> ;

// 		return (
//       <div>
//       <Header />
// 		<div className = "main">
    
      
//        <button className='pdf' type="button" onClick={handleDownloadPdf}>
//         Download as PDF
//       </button>
//       <div ref={printRef} className="form">
//       <br/>
//       <img src={greenlogo}></img>
// 	<h2>Humberside and South Yorkshire ACF </h2>  
//     <br/>
// <h3>Automated Detachment Training Program   </h3>
// <br/>
// <br/>
//       <table>
//       <tbody>
//                 <tr>
//                     <th colSpan={2}>Detachment Name</th>
//                     <th colSpan={5}> 
//       <label>
//       Choose Detachment:
//           <br/>
//           <select value={this.state.value} onChange={this.handleChange}>
//            <option value="Basic">All</option>
//             <option value="April">Detachment2</option>
//             <option value="May">Detachment3</option>
//             <option value="June">Detachment4</option>            
//           </select>          
//         </label></th>                    
//                 </tr>
//                 <tr>
//                     <th colSpan={2}>Training Program Start Dates</th>
//                     <th colSpan={1}> 
//               <label>
//      Date:
//           <br/>
//           <select value={this.state.value} onChange={this.handleChange}>
//            <option value="Basic">1/06/2022</option>
//             <option value="April">12/06/2022</option>
//             <option value="May">30/06/2022</option>
//             <option value="June">1/07/2022</option>            
//           </select> 
//           </label>
//           </th>     
//           <th colSpan={2}> 
//           <label>
//           Choose level:
//           <br/>
//           <select value={this.state.value} onChange={this.handleChange}>
//            <option value="Basic">All</option>
//             <option value="April">Basic</option>
//             <option value="May">First</option>
//             <option value="June">Second</option>            
//           </select> 
//           </label>
//           </th> 
//           <th colSpan={3}> 
//           <label>
//           Choose instructor:
//           <br/>
//           <select value={this.state.value} onChange={this.handleChange}>
//            <option value="Basic">All</option>
//             <option value="April">ALL Bond</option>
//             <option value="May">Nevil Jons</option>
//             <option value="June">Joy Mayron</option>            
//           </select> 
//           </label>
//           </th>         
//                 </tr>
//                 <tr><th>Detachment</th>
//                     <th>Level</th>
//                     <th>Lesson</th>
//                     <th>Instructors</th>
//                     <th>Dress</th> 
//                     <th>Equipment</th>                                          
//                 </tr>
//                 {items.map((item, i) => (
//                     <tr key={item._id}>
//                         <td>{item.detachment}</td>
//                         <td>{item.level}</td>
//                         <td>{item.lesson1}{item.lesson2}</td>
//                         <td>{item.lesson1tutor}
//                         {item.lesson2tutor}</td>
//                         <td>{item.dress}</td>
//                         <td>{item.equipment}</td>                       
                        
//                     </tr>

//                 ))}
//                 </tbody>
//                 </table>
//                 </div>
//                 <br/><br/>
//                 <Footer /> 
// 		</div>
//     </div>
// 	);
// }
// }

// export default LessonsTable;
import React, { useState, useEffect } from "react";
import Footer from './Footer';
import Header from './Header'
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import './tabledata.css';
import Button from 'react-bootstrap/Button';
import greenlogo from '../images/greenlogo.png'
import axios from "axios";
import Table from "./TableContainer";
import { SelectColumnFilter } from "./Filter";

function LessonsTable() {
  const [data, setData] = useState([]);

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
      accessor: "schedule.date",
      // disableFilters: true,
      Cell: ({ cell: { value } }) => value || "-",
    },
    {
      Header: "Detachment",
      accessor: "schedule.detachment",
    },
    {
      Header: "level",
      accessor: "schedule.level",
      Filter: SelectColumnFilter,
      filter: "includes",
    },
    {
      Header: "Lesson1",
      accessor: "schedule.lesson1",
    },
    // {
    //   Header: "Official Site",
    //   accessor: "show.officialSite",
    //   Cell: ({ cell: { value } }) =>
    //     value ? <a href={value}>{value}</a> : "-",
    // },
    // {
    //   Header: "Rating",
    //   accessor: "show.rating.average",
    //   Cell: ({ cell: { value } }) => value || "-",
    // },
    // {
    //   Header: "Status",
    //   accessor: "show.status",
      // Filter: SelectColumnFilter,
      // filter: "includes",
    // },
    // {
    //   Header: "Premiered",
    //   accessor: "show.premiered",
    //   // disable the filter for particular column
    //   disableFilters: true,
    //   Cell: ({ cell: { value } }) => value || "-",
    // },
    // {
    //   Header: "Time",
    //   accessor: "show.schedule.time",
    //   disableFilters: true,
    //   Cell: ({ cell: { value } }) => value || "-",
    // },
  ];
 
  
  return (
    <div className="App">
      <Header />
      <div className = "main">
      <button className='pdf' type="button">
  Download as PDF
    </button>
   <div className="form">
    <br/>
    <img src={greenlogo}></img>
	<h2>Humberside and South Yorkshire ACF </h2>  
  <br/>
 <h3>Automated Detachment Training Program   </h3>
<br/>
<br/>
      <Table columns={columns} data={data} />
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default LessonsTable;


