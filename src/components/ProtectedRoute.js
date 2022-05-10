import React, { Component } from "react";
import { Routes, Route, Link, Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({
    isAllowed,
    redirectPath = '/home',
    children,
  }) => {
    if (!isAllowed) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return children ? children : <Outlet />;
  };
  export default ProtectedRoute