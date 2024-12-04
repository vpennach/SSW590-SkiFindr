import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AboutPage.css';

const AboutPage = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/find'); // Navigate back to FindPage
  };

  return (
    <div className="about-page">
      <h1 className="about-title">About SkiFindr</h1>
      <p className="about-subtitle">
        SkiFindr is your ultimate guide to discovering the perfect ski resort. Whether you’re a beginner or an expert, we’ve got you covered!
      </p>
      <ul className="about-list">
        <li>Search ski resorts by location and distance</li>
        <li>Filter resorts based on pricing and amenities</li>
        <li>Access detailed resort information</li>
      </ul>
      <p className="about-subtitle">
        Our mission is to make your skiing experience effortless and enjoyable by providing the tools to plan your next adventure.
      </p>
      <button className="about-button" onClick={handleNavigation}>
        Find Your Ski Resort
      </button>
    </div>
  );
};

export default AboutPage;
