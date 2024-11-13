import React, { useState, useEffect } from 'react';
import configRoutesFunction from '../server/routes.js';


export default function FindPage() {
  const [resortCount, setResortCount] = useState(0);

  useEffect(() => {
    const fetchResortCount = async () => {
      try {
        const response = await fetch('/api/resorts/count');  
        const data = await response.json();
        setResortCount(data.count);  
      } catch (error) {
        console.error('Error fetching resort count:', error);
      }
    };

    fetchResortCount(); 
  }, []); 
  return (
    <div>
      <h1>Find Ski Resorts</h1>
      <p>Number of resorts: {resortCount}</p>
    </div>
  );
}
