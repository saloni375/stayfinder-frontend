import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResultPage = () => {
  const location = useLocation();
  const query = location.state?.query || 'No search query';

  return (
    <div className="container mt-5">
      <h2>Search Results for: {query}</h2>
      <p>Results will be displayed here...</p>
    </div>
  );
};

export default SearchResultPage;
