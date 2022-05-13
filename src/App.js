import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Signup from "./components/Singup";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Main from "./components/Main";
import LessonsTable from "./components/lessons-table.component";
import TrainingTable from "./components/training-table.component";
import CommanderLessons from "./components/commander";
import EditSesion from "./components/edit-session";
import TrainingRole from "./components/role-training.component";
import EditUser from "./components/user-edit.component";
import CreateLessons from "./components/create-seccion";

const App = () => {
  const user = localStorage.getItem("token");
  const userrole = localStorage.getItem("role");
  console.log("role:", userrole);
  const str = userrole || "";
  const [editEmailID, cEditEmailID] = useState("");
  const [editsessionid, cEditsessionid] = useState("");
  const [detachments, cDetachments] = useState([]);

  function handleEditClick(emailID) {
    cEditEmailID(emailID);
  }
  function handlesessionEditClick(id) {
    cEditsessionid(id);
  }

  useEffect(() => {
    axios
      .post("https://kgtrainingserver.herokuapp.com/config/showfiltered", {
        filters: { configid: "detachment" },
      })
      .then((res) => {
        cDetachments(res.data);
        console.log("detachmentsapp", detachments);
      });
  }, []);

  return (
    <>
      <div className="App">
        <div className="wrapper">
          <Routes>
            {user && <Route index element={<Main />} />}
            <Route element={<ProtectedRoute isAllowed={!!user} />}>
              <Route path="training-table" element={<TrainingTable />} />
            </Route>
            <Route
              path="lessons-table"
              element={
                <ProtectedRoute
                  redirectPath="/"
                  isAllowed={!!user && str?.includes("0")}
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
                  isAllowed={!!user && str?.includes("0")}
                >
                  <TrainingRole />
                </ProtectedRoute>
              }
            />
            <Route
              path="modify-user"
              element={
                <ProtectedRoute
                  redirectPath="/"
                  isAllowed={!!user && str?.includes("0")}
                >
                  <EditUser emailID={editEmailID} detachments={detachments} />
                  <EditUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="comander"
              element={
                <ProtectedRoute
                  redirectPath="/"
                  isAllowed={!!user && str?.includes("0")}
                >
                  <CommanderLessons
                    handleEditClick={(id) => {
                      handlesessionEditClick(id);
                    }}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="edit-lesson"
              element={
                <ProtectedRoute
                  redirectPath="/"
                  isAllowed={!!user && str?.includes("0")}
                >
                  <EditSesion sessionid={editsessionid} />
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
};

export default App;
