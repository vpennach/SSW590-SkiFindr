import React, { useState, useEffect } from 'react';
import { calculateHaversineDistance } from '../components/distanceUtils.js';
import '../styles/FindPage.css';

export default function FindPage() {
  const [location, setLocation] = useState('');
  const [maxDistance, setMaxDistance] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [resorts, setResorts] = useState([]);
  const [filteredResorts, setFilteredResorts] = useState([]);

  // Fetch all resorts when the component loads
  useEffect(() => {
    const fetchResorts = async () => {
      try {
        const response = await fetch('/api/resorts');
        const data = await response.json();
        setResorts(data);
      } catch (error) {
        console.error('Error fetching resorts:', error);
      }
    };

    fetchResorts();
  }, []);

  // Function to fetch coordinates from the backend
  const fetchCoordinates = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/geocode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location }),
      });
      const data = await response.json();

      if (data.error) {
        alert(data.error);
        return null;
      }

      console.log('Fetched Coordinates:', data);
      return data; // Return the coordinates
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      return null;
    }
  };

  // Function to calculate distances and filter resorts
  const calculateDistancesAndFilter = (coords) => {
    const { latitude: userLat, longitude: userLon } = coords;

    const filtered = resorts
      .map((resort) => {
        const resortLat = parseFloat(resort.Latitude); // Resort Latitude
        const resortLon = parseFloat(resort.Longitude); // Resort Longitude

        const distance = calculateHaversineDistance(userLat, userLon, resortLat, resortLon);
        return { ...resort, distance };
      })
      .filter((resort) => resort.distance <= maxDistance)
      .sort((a, b) => a.distance - b.distance);

    setFilteredResorts(filtered);
  };

  // Function called when the button is pressed
  const handleFindResorts = async () => {
    if (!location || !maxDistance) {
      alert('Please enter a valid location and maximum distance');
      return;
    }

    const coords = await fetchCoordinates(); // Step 1: Get coordinates
    if (coords) {
      calculateDistancesAndFilter(coords); // Step 2: Calculate and filter
    }
  };

  return (
    <div className="find-page">
      <div className="prompt-container">
        <h1 className="find-page-title">Find Your Next Ski Resort</h1>
        <p className="find-page-subtitle">
          Enter a location and a maximum distance to find ski resorts near you.
        </p>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter location (e.g., Brooklyn, NY)"
            className="input-field"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter maximum distance (miles)"
            className="input-field"
            value={maxDistance}
            onChange={(e) => setMaxDistance(e.target.value)}
          />
          <button className="find-button" onClick={handleFindResorts}>
            Find Resorts
          </button>
        </div>
      </div>

      {filteredResorts.length > 0 ? (
        <table className="resort-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Resort Name</th>
              <th>Distance (miles)</th>
              <th>Country</th>
              <th>Price ($)</th>
              <th>Highest Point</th>
              <th>Total Slopes</th>
            </tr>
          </thead>
          <tbody>
            {filteredResorts.map((resort, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{resort.Resort}</td>
                <td>{resort.distance.toFixed(2)}</td>
                <td>{resort.Country}</td>
                <td>{resort.Price}</td>
                <td>{resort["Highest point"]}</td>
                <td>{resort["Total slopes"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-results-message">
          No ski resorts found within the specified distance. Try a different location or increase the maximum distance.
        </p>
      )}
    </div>
  );

}







