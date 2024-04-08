import React from 'react';
import { useNavigate } from 'react-router-dom';

const SearchResults = ({ result, email }) => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/${result.id}`, { state: { email } })
  }
  
  return (
    <div className="result">
      <div>
        <p>{result.name}</p>
      </div>
      
      <div>
        
        <img src={result.image !== "N/A" ? result.image : 'https://via.placeholder.com/100'} alt={result.name} />
      </div>

      <div onClick={handleNavigate}>
          <span>{result.symbol}</span>
          <h3>{result.support ? "Supported" : "Not Supported"}</h3>
      </div>
    </div>
  )
}

export default SearchResults;