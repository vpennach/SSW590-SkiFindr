import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css'; // Updated path for styles

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/find'); // Corrected route
  };

  return (
    <div className="homepage-container">
      <h1>Welcome to SkiFindr!</h1>
      <p>Let's go skiing!</p>
      <button onClick={handleNavigation}>Find Your Ski Resort</button>
    </div>
  );
};

export default HomePage;
