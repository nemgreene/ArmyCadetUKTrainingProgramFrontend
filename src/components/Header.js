import React, { Component } from "react";
import './FooterStyles.css'
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css'
import acfLogo from '../images/acfLogo.png';
import styles from "./Main/styles.module.css";


export default class Header extends Component{
  
    render() {
      const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
      };
      return (
<div className="main_container">
  <header className="App-header">
    <hr className="hr-line"></hr>
    <Navbar>
      <Container>            
        <Navbar.Brand>             
        <div className='logo'>
        <a href="#home"><img src={acfLogo}/></a>
        </div>
        </Navbar.Brand>
        <Nav className="justify-content-end">
        <Nav>                
        <Link to={'/'} className="nav-link">
            Home
          </Link>
          </Nav>        
          <Nav>                
            <Link to={'/lessons-table'} className="nav-link">
             Lessons 
            </Link>
          </Nav>
        <Nav>                
            <Link to={'/training-table'} className="nav-link">
             Training 
            </Link>
          </Nav>
          <Nav>                
            <Link to={'/comander'} className="nav-link">
             Comander
            </Link>
          </Nav>
          <Nav>                
            <Link to={'/role'} className="nav-link">
             Role 
            </Link>
          </Nav>          
        </Nav>        
  </Container>
      <nav className={styles.navbar}>        
				<button className="btn" onClick={handleLogout}>
        <span>Logout</span>
				</button>
			</nav>
    </Navbar>
    <hr className="hr-line"></hr>
  </header>
  </div>
   );
}
}