import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Signup from "./components/Singup";
import Login from "./components/Login";
import ProtectedRoute from './components/ProtectedRoute'
import Main from "./components/Main";
import LessonsTable from './components/lessons-table.component'
import TrainingTable from './components/training-table.component'
import CommanderLessons from './components/commander'
import EditSesion from './components/edit-session'
import TrainingRole from './components/role-training.component'
import EditUser from './components/user-edit.component';
import axios from 'axios';

const App = () => {
  const user = localStorage.getItem("token");
  const userrole = localStorage.getItem("role");
  console.log("role:", userrole)	
  const str = userrole || '';
  const [editEmailID, cEditEmailID] = useState("");
  const [detachments, cDetachments] = useState([]);

  // added to allow us to navigate back from other pages cleanly
  const navigate = useNavigate();

  function handleEditClick(emailID) {
    cEditEmailID(emailID);
  }
  
  useEffect(() => {
      axios.post('https://kgtrainingserver.herokuapp.com/config/showfiltered', { "filters": { "configid": "detachment" } }) 
      .then((res) => {
        cDetachments(res.data);
        console.log("detachmentsapp", detachments)
      });
  }, []);

  return (
  <>
  <div className="App"> 
    
  <div className="wrapper">  
<Routes>
{user &&<Route index element={<Main />} />}
 <Route element={<ProtectedRoute isAllowed={!!user} />}>
  <Route path="training-table" element={<TrainingTable />} />
</Route>
<Route
       path="lessons-table"
        element={
          <ProtectedRoute
           redirectPath="/"
           isAllowed={
             !!user && str?.includes('0')
           }
          >
            <LessonsTable />
        </ProtectedRoute>
   }
    />
     <Route
         path="role"
      element={
         <ProtectedRoute
           redirectPath="/"
            isAllowed={!!user && str?.includes('0')}
        >
              <TrainingRole handleEditClick={ (emailID) => { handleEditClick(emailID) } } navigate={ navigate }/>
         </ProtectedRoute>
       }
      />
      <Route
         path="modify-user"
      element={
         <ProtectedRoute
           redirectPath="/"
            isAllowed={!!user && str?.includes('0')}
        >
              <EditUser emailID={ editEmailID } detachments={ detachments } navigate={ navigate }/>
         </ProtectedRoute>
       }
      />
      <Route
         path="comander"
      element={
         <ProtectedRoute
           redirectPath="/"
            isAllowed={!!user && str?.includes('0')}
        >
                <CommanderLessons />
         </ProtectedRoute>
       }
      />
      <Route
         path="edit-lesson"
      element={
         <ProtectedRoute
           redirectPath="/"
            isAllowed={!!user && str?.includes('0')}
        >
              <EditSesion />
         </ProtectedRoute>
       }
      />
       <Route path="*" element={<p>There's nothing here: 404!</p>} />
       <Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
    	<Route path="/" element={<Navigate replace to="/login" />} />
      </Routes> 
      
      </div>
           
  </div>  

      </>
      
  );
 }

export default App

    
