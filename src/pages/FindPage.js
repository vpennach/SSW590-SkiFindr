import React, { useState, useEffect } from 'react';

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
    <form id="resort-search-form">
  <label for="location">Search resorts near a location:</label>
  <input type="text"
    id="location"
    name="location"
    placeholder="City, State (optional), Country"
  />

  <div>
    <input
      type="checkbox"
      id="use-current-location"
      name="useCurrentLocation"
    />
    <label for="use-current-location">Use my current location</label>
  </div>

  <button type="submit">Find Resorts</button>
</form>

  );
}
