import React, { useState, useEffect } from 'react';
import { calculateHaversineDistance } from '../components/distanceUtils.js';

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
    <div>
      <h1>Find Ski Resorts</h1>
      <input
        type="text"
        placeholder="Enter location (e.g., Brooklyn, NY)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter maximum distance (miles)"
        value={maxDistance}
        onChange={(e) => setMaxDistance(e.target.value)}
      />
      <button onClick={handleFindResorts}>Find Resorts</button>

      {filteredResorts.length > 0 && (
        <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Resort Name</th>
              <th>Country</th>
              <th>Distance (miles)</th>
            </tr>
          </thead>
          <tbody>
            {filteredResorts.map((resort, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{resort.Resort}</td>
                <td>{resort.Country}</td>
                <td>{resort.distance.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}







