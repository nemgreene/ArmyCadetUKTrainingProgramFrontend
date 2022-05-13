import React, { useState, useMemo } from "react";
//import { Route, Routes, Link, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "./tabledata.css";
import Footer from "./Footer";
import greenlogo from "../images/greenlogo.png";
import CreateLessons from "./create-seccion";
import Pagination from "react-bootstrap/Pagination";

class TrainingSession extends React.Component {
  // Constructor for month training
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      items: [],
      DataisLoaded: false,
      postsPerPage: 5,
    };
  }

  // ComponentDidMount for
  // fetch from db
  componentDidMount() {
    fetch("http://kgtrainingserver.herokuapp.com/schedule")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          items: json,
          DataisLoaded: true,
        });
      });
  }

  render() {
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const currentitems = this.state.items.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    const pageNumbers = [];

    for (
      let i = 1;
      i <= Math.ceil(this.state.items.length / this.state.postsPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }

    //Set current page
    const setPage = (pageNum) => {
      this.setState({ currentPage: pageNum });
    };

    const printRef = React.createRef();

    const handleDownloadPdf = async () => {
      const element = printRef.current;
      const canvas = await html2canvas(element);
    };
    const { DataisLoaded, items } = this.state;
    if (!DataisLoaded)
      return (
        <div>
          <h1> Please wait some time.... </h1>{" "}
        </div>
      );
    console.log(items);
    return (
      <div className="main">
        <div ref={printRef} className="form">
          <br />

          <img src={greenlogo}></img>
          <h3>List of lessons</h3>
          <br />
          <br />
          <table>
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
              {currentitems.map((item, i) => (
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
                    <button
                      className="btn_edit"
                      onMouseEnter={() => {
                        this.props.handleEditClick(item._id);
                      }}
                    >
                      <Link className="btn_edit" to="/edit-lesson">
                        Edit
                      </Link>
                    </button>
                    <button className="btn_delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {pageNumbers.map((pageNum, index) => (
              <span
                key={index}
                onClick={() => {
                  setPage(pageNum);
                }}
              >
                <Pagination>
                  <Pagination.Item>{pageNum}</Pagination.Item>
                </Pagination>
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

<Footer />;

export default TrainingSession;
