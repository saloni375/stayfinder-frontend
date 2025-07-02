import React from 'react';
import { FaHome, FaCalendarAlt, FaUserFriends } from 'react-icons/fa';

const SearchSection = ({
  searchInput,
  handleChange,
  handleSearch,
  filteredPlaces,
  showSuggestions,
  setShowSuggestions,
  handleSuggestionClick,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      className="search-box d-flex flex-wrap flex-md-nowrap gap-2 position-relative justify-content-md-start justify-content-center align-items-stretch"
    >
   
      <div
        className="search-item bg-light px-3 py-2 rounded d-flex align-items-center mx-auto mx-md-0"
        style={{
          width: '100%',
          maxWidth: '250px',
          height: '50px',
        }}
      >
        <FaHome className="me-2" style={{ fontSize: '18px', color: 'black' }} />
        <input
          type="text"
          placeholder="Where"
          value={searchInput}
          onChange={handleChange}
          onFocus={() => setShowSuggestions(true)}
          className="form-control border-0 bg-transparent p-0"
          style={{
            color: '#333',
            fontWeight: '500',
            background: 'transparent',
          }}
        />
        {searchInput && filteredPlaces.length > 0 && showSuggestions && (
          <ul
            className="list-group position-absolute top-100 start-0 w-40px mt-1 shadow suggestion-list"
            style={{ zIndex: 10 }}
          >
            {filteredPlaces.map((place, i) => (
              <li
                key={i}
                className="list-group-item list-group-item-action suggestion-item"
                onClick={() => handleSuggestionClick(place)}
              >
                {place}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="d-flex flex-wrap flex-md-nowrap gap-2 justify-content-center justify-content-md-start w-100 w-md-auto">
       
        <div
          className="search-item bg-light px-3 py-2 rounded d-flex align-items-center"
          style={{
            width: 'calc(50% - 6px)',
            maxWidth: '150px',
            height: '50px',
          }}
        >
          <FaCalendarAlt className="me-2 text-primary" />
          <input type="date" className="form-control border-0 bg-transparent p-0" />
        </div>

        <div
          className="search-item bg-light px-3 py-2 rounded d-flex align-items-center"
          style={{
            width: 'calc(50% - 6px)',
            maxWidth: '150px',
            height: '50px',
          }}
        >
          <FaCalendarAlt className="me-2 text-primary" />
          <input type="date" className="form-control border-0 bg-transparent p-0" />
        </div>

        <div
          className="search-item bg-light px-3 py-2 rounded d-flex align-items-center"
          style={{
            width: 'calc(50% - 6px)',
            maxWidth: '150px',
            height: '50px',
          }}
        >
          <FaUserFriends className="me-2" style={{ fontSize: '18px', color: 'black' }} />
          <input type="number" placeholder="Guests" className="form-control border-0 bg-transparent p-0" />
        </div>

        <button
          type="submit"
          className="btn px-4 rounded"
          style={{
            width: 'calc(50% - 6px)',
            maxWidth: '150px',
            height: '50px',
            backgroundColor: '#4B0082',
            color: 'white',
            border: 'none',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'purple';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#4B0082';
            e.target.style.transform = 'scale(1)';
          }}
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchSection;
