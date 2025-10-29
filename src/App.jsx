// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";
import Home from "./pages/dashboard/Home.jsx";
import Income from './Pages/Dashboard/Income.jsx'

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Root/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/income" element={<Income/>} />


        </Routes>
    </Router>
  );
}

export default App;


const Root = () => {
  const isAuthenticated = !localStorage.getItem("item");

   return isAuthenticated ? (
    <Navigate to="/dashboard"/>
    ) : (
    <Navigate to="/Login"/>

    )
   }











  //  jo masla wo sahi karna bss zada lambi mnhi karna