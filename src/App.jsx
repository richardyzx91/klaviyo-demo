import React, { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import SearchResults from './SearchResults';
import CryptoDatabase from './CryptoDatabase.json';

const App = () => {
  const data = CryptoDatabase.data;

  const [searchTerm, setSearchTerm] = useState('')
  const [email, setEmail] = useState('')
  const [input, setIntput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setEmail(input)
  }

  return (
    <div className="app">
      <div className="user">
        <form onSubmit={handleSubmit}>
          <input 
            type="text"
            placeholder="Set email here..."
            value={input}
            onChange={e => setIntput(e.target.value)}
          />
        </form>

        <h2>
          Email: {email ? email : "N/A"}
        </h2>
      </div>

      <h1>See Supported Cryptos</h1>

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
                  <SearchResults key={crypto.symbol} result={crypto} email={email}/>
                ) : null)
              }
            </div>
          ) : (
            <div className="container">
              {
                data.map((crypto) => (
                  <SearchResults key={crypto.symbol} result={crypto} email={email}/>
                ))
              }
            </div>
          )           
      }
    </div>
  );
}

export default App;
