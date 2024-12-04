import React from 'react';
import Navigation from "./components/Navbar.js";
import HomePage from "./pages/HomePage.js";
import { Route, Routes, Navigate } from "react-router-dom";
import AboutPage from './pages/AboutPage.js';
import FindPage from './pages/FindPage.js';
import SignIn from './login/SignIn.js';
import SignUp from './login/SignUp.js';
import Account from './login/Account.js';
import './App.css';
import firebaseConfig from './firebase/FirebaseConfig.js';
import { AuthProvider } from './components/AuthContext.js';
import PrivateRoute from './components/PrivateRoute.js';
import { initializeApp } from 'firebase/app';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function App() {
  return (
    <AuthProvider>
      <Navigation />
      <Routes>
        {/* Redirect "/" to "/home" */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Protected Routes */}
        <Route path="/home" element={<PrivateRoute />}>
          <Route path="/home" element={<HomePage />} />
        </Route>
        <Route path="/account" element={<PrivateRoute />}>
          <Route path="/account" element={<Account />} />
        </Route>
        <Route path="/find" element={<PrivateRoute />}>
          <Route path="/find" element={<FindPage />} />
        </Route>
        <Route path="/about" element={<PrivateRoute />}>
          <Route path="/about" element={<AboutPage />} />
        </Route>

        {/* Public Routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
