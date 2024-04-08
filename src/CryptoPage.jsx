import { useLocation, useParams } from "react-router-dom"
import CryptoDatabase from "./CryptoDatabase.json"
import { useEffect } from "react"

const CryptoPage = () => {
  const cryptoId = useParams().cryptoId
  const location = useLocation()
  const email = location.state?.email
  console.log(cryptoId)
  const crypto = CryptoDatabase.data.find(crypto => crypto.id === cryptoId)

  useEffect(() => {
    console.log(`Sending event: { email: ${email}, searched_for: ${crypto.name}`)
    klaviyoCreateEvent()
  }, [])

  const klaviyoCreateEvent = async () => {
    const requestUrl = "https://richardyan422.npkn.net/klaviyo-create-searched-crypto-event/"

    const requestBody = JSON.stringify({
      email,
      searched_for: crypto.name,
    })
    
    const requestOptions = {
      method: 'POST',
      headers: {
        "Accept": "application/json",
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