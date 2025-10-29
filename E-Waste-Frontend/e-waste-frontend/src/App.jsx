import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Submission from "./pages/Submission";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import ProcessPage from "./pages/ProcessPage";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <main className="main-app-wrapper">
        {/* 🌿 Navigation Bar */}
        <header className="app-header">
          <h1 className="brand-logo">♻️ E-Waste</h1>
          <nav className="nav-links">
            <a href="/">Home</a>
            <a href="/process">Process</a>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </nav>
        </header>

        {/* 🛣️ Page Routes */}
        <div className="app-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/process" element={<ProcessPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/submit"
              element={
                <ProtectedRoute>
                  <Submission />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </div>

        {/* 🌎 Footer */}
        <footer className="app-footer">
          <p>© {new Date().getFullYear()} E-Waste Management | Designed by Mohanamithra 💚</p>
        </footer>
      </main>
    </BrowserRouter>
  );
};

export default App;
