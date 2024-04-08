import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
// import { ApiKeySession, ProfilesApi, EventsApi } from 'klaviyo-api';
import './App.css';
import SearchIcon from './search.svg';
import SearchResults from './SearchResults';
import CryptoDatabase from './CryptoDatabase.json';

const App = () => {
  const data = CryptoDatabase.data;

  const [searchTerm, setSearchTerm] = useState('')
  const [testOutput, setTestOutput] = useState('None')

  return (
    <div className="app">
      <h1>See Supported Cryptos</h1>
      {testOutput}

      <div className="search">
        <input 
          placeholder="Search cryptos..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <img 
          src={SearchIcon}
          alt="Search"
        />
      </div>

      {
        searchTerm
          ? (
            <div className="container">
              {
                data.map((crypto) => crypto.name == searchTerm ? (
                  <SearchResults key={crypto.symbol} result={crypto} />
                ) : null)
              }
            </div>
          ) : (
            <div className="container">
              {
                data.map((crypto) => (
                  <SearchResults key={crypto.symbol} result={crypto} />
                ))
              }
            </div>
          )           
      }

    </div>
  );
}

export default App;
