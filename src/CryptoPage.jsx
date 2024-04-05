import { useParams } from "react-router-dom"
import CryptoDatabase from "./CryptoDatabase.json"

const CryptoPage = () => {
  const cryptoId = useParams().cryptoId
  console.log(cryptoId)
  const crypto = CryptoDatabase.data.find(crypto => crypto.id === cryptoId)

  return (
    <div>
      <h1>{crypto.name}</h1>
      <img src={crypto.image !== "N/A" ? crypto.image : 'https://via.placeholder.com/100'} alt={crypto.name} width="300px" height="300px"/>
      <h2>{crypto.symbol}</h2>
      <h3>{crypto.support ? "Supported" : "Not Supported"}</h3>
    </div>
  )
}

export default CryptoPage