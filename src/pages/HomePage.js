import React, { useState } from 'react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch('/api/resorts/search?query=' + searchQuery);
      const data = await response.json();
      setSearchResults(data.resorts);
    } catch (error) {
      console.error('Error searching resorts:', error);
    }
  };

  return (
    <div>
      <h1>Ski Resort Finder</h1>
      
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for resorts..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div>
        {searchResults.map((resort) => (
          <div key={resort.id}>
            <h2>{resort.name}</h2>
            <p>Location: {resort.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
