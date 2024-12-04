import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

const Homepage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/findpage');
  };

  return (
    <div className="homepage-container">
      <h1>Welcome to SkiFindr!</h1>
      <p>Let's go skiing!</p>
      <button onClick={handleButtonClick}>Find Your Ski Resort</button>
    </div>
  );
};

export default Homepage;
