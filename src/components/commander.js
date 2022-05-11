import 'bootstrap/dist/css/bootstrap.min.css'
import TrainingSession from './session'
import CreateLessons from './create-seccion'
import './tabledata.css';
import Footer from './Footer'
import { IconContext } from "react-icons";
import { IoIosArrowDown} from "react-icons/io";
import Container from 'react-bootstrap/Container'
import React,{useState} from 'react';
import Header from './Header'


const CommanderLessons = (props) => {
    
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
        
    };
    const [show,setShow]=useState(false)
    return (
        <div>
            <Header />
        <div className='main'>
            <div className="form-wrapper">
     <Container>
           <div className='mainHeading'>
            
                <h1 >Lessons</h1>
               
            </div>
            <div className='heading'>
            <IconContext.Provider value={{size:"70"
					}}>
						<div className="arrow">
						<IoIosArrowDown />
						</div>
						</IconContext.Provider>
            <h3>Create lessons</h3>
            </div>
            
            < CreateLessons />
        </Container>
        <button onClick={()=>setShow(true)} className="pdf">
         Show list of lessons
        </button>
            {show?<TrainingSession />:false}
            <br/><br/><br/>
            
            </div>

            </div>
            
            <Footer /> 
        </div>
    );
};
export default CommanderLessons;