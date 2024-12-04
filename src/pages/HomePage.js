import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/find');
  };

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Welcome to SkiFindr!</h1>
      <p className="homepage-subtitle">Let's go skiing!</p>
      <button className="homepage-button" onClick={handleNavigation}>
        Find Your Ski Resort
      </button>
    </div>
  );
};

export default HomePage;
