import { useParams } from "react-router-dom"
import CryptoDatabase from "./CryptoDatabase.json"
import { useEffect } from "react"

const CryptoPage = () => {
  const cryptoId = useParams().cryptoId
  console.log(cryptoId)
  const crypto = CryptoDatabase.data.find(crypto => crypto.id === cryptoId)

  useEffect(() => {
    klaviyoCreateEvent()
  }, [])

  const klaviyoCreateEvent = async () => {
    const requestUrl = "https://richardyan422.npkn.net/klaviyo-create-searched-crypto-event/"
    const napkinApiKey = "90d1739dd6b045e98daf4faef739c3e7"

    const requestBody = JSON.stringify({
      email: "sam.marco@klaviyo-demo.com",
      searched_for: crypto.name,
    });
    
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
      },
      body: requestBody,
      redirect: "follow"
    }

    fetch(requestUrl, requestOptions)
    .then(res => res.text())
    .then(res => console.log(`Klaviyo API called: ${res}`))
    .catch(err => console.error(`Error: ${err}`));
  }

  return (
    <div className="crypto-page">
      <h1>{crypto.name}</h1>
      <img src={crypto.image !== "N/A" ? crypto.image : 'https://via.placeholder.com/100'} alt={crypto.name} width="300px" height="300px"/>
      <h2>{crypto.symbol}</h2>
      <h3>{crypto.support ? "Supported" : "Not Supported"}</h3>
    </div>
  )
}

export default CryptoPage