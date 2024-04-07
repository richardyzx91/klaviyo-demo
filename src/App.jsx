import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
// import { ApiKeySession, ProfilesApi, EventsApi } from 'klaviyo-api';
import './App.css';
import SearchIcon from './search.svg';
import SearchResults from './SearchResults';
import CryptoDatabase from './CryptoDatabase.json';

const App = () => {
  const data = CryptoDatabase.data;

  const klaviyoApiBaseUrl = "https://a.klaviyo.com/api"
  const klaviyoPk = "pk_cbc2d482a4606854dc0f7b29ef1b959bd3"

  // const klaviyoSession = new ApiKeySession(klaviyoPk)
  // const eventsAPI = new EventsApi(klaviyoSession)
  // const profilesApi = new ProfilesApi(klaviyoSession)

  // try {
  //   const testOutput = profilesApi.getProfiles().then(r => console.log(`Test Output: ${r}`))
  // } catch (e) {
  //   console.log('Error: ' + e)
  // }
  
  // const testOutput = eventsAPI.getEvent("57VXXrihXF6").then()
  // console.log(`Test Output: ${testOutput}`)


  // const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')
  const [testOutput, setTestOutput] = useState('None')

  useEffect(() => {
    klaviyoGetProfiles()
  }, [])

  const klaviyoGetProfiles = async () => {
    const requestUrl = `${klaviyoApiBaseUrl}/profiles/?page[size]=20`
    
    const requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        revision: '2024-02-15',
        Authorization: `Klaviyo-API-Key ${klaviyoPk}`
      },
      redirect: "follow"
    }

    fetch(requestUrl, requestOptions)
    .then(res => setTestOutput(res.toString()))
    .catch(err => console.error('error:' + err));
  }

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
