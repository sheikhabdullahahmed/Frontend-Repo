// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/Auth/Login.jsx";
import Signup from "./pages/Auth/Signup.jsx";
import Home from "./Pages/Dashboard/Home.jsx";
import Income from "./Pages/Dashboard/Income.jsx";
import UserProvider from "./Context/UserContext.jsx";
import Expense from "./Pages/Dashboard/Expenses.jsx";
import ExpenseTracker from "./Pages/Dashboard/ExpenseTracker.jsx";
// import { toast, ToastContainer } from "react-toastify";



function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected / App Routes */}
          {/* <Route path="/expensetracker" element={<ExpenseTracker />} /> */}
          <Route path="/expensetracker" element={<ExpenseTracker />}>
            <Route path="dashboard"   element={<Home/>} />
            <Route path="income" element={<Income />} />
            <Route path="expense" element={<Expense />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;

const Root = () => {
  // true if user is authenticated (exists in localStorage)
  const isAuthenticated = !!localStorage.getItem("item");

  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};
