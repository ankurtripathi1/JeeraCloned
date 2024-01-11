import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Component/Home";
import LoginForm from "./Component/LoginForm";
import RegisterForm from "./Component/RegisterForm";
import ErrorBoundary from "./Component/ErrorHandler";
import Dashboard from "./Component/DashBoard";
import { useEffect, useState } from "react";
import EditTask from "./Component/EditTask";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem(
      "currentUsers",
      JSON.stringify({
        email: user.email,
        id: user.id,
        role: user.role,
        username: user.username,
      })
    );
    <Navigate to="/dashboard" />;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    <Navigate to="/" />;
  };

  const handleRegister = (user) => {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    localStorage.setItem("users", JSON.stringify([...existingUsers, user]));
    <Navigate to="/" />;
  };

  useEffect(() => {
    console.log("CurrentUser", currentUser);
  });

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/login"
            element={
              currentUser ? (
                <Navigate to="/dashboard" />
              ) : (
                <LoginForm onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/register"
            element={
              currentUser ? (
                <Navigate to="/dashboard" />
              ) : (
                <RegisterForm onRegister={handleRegister} />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              currentUser ? (
                <Dashboard user={currentUser} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/edit-task/:id" element={<EditTask />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
