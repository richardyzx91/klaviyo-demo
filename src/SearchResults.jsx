import React from 'react';
import { Link } from 'react-router-dom';

const SearchResults = ({result}) => {

  return (
    <div className="result">
      <div>
        <p>{result.name}</p>
      </div>
      
      <div>
        
        <img src={result.image !== "N/A" ? result.image : 'https://via.placeholder.com/100'} alt={result.name} />
      </div>

      <div>
        <Link to={`/${result.id}`}>
          <span>{result.symbol}</span>
          <h3>{result.support ? "Supported" : "Not Supported"}</h3>
        </Link>
      </div>
    </div>
  )
}

export default SearchResults;