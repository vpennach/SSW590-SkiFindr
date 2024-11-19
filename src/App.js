import React from 'react';
import Navbar from "./components/Navbar.js";
import HomePage from "./pages/HomePage.js";
import { Route, Routes, Navigate } from "react-router-dom";
import AboutPage from './pages/AboutPage.js';
import FindPage from './pages/FindPage.js';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/find" element={<FindPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
    </>
  )
}

export default App;
