import { useEffect, useState } from 'react'
import BarList from './components/BarList'
import './App.css'

function App() {
  const [barList, setBarList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [locationUnavailable, setLocationUnavailable] = useState(false)
  const [currentLocation, setCurrentLocation] = useState({})
  const [error, setError] = useState(null)
  
  const success = (position) => {
    const { latitude, longitude } = position.coords
    setCurrentLocation({ latitude, longitude })
  }
  
  const failure = () => {
    setLocationUnavailable(true)
  }
  
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(success, failure)
  }
  
  useEffect(() => {
    if ("geolocation" in navigator) {
      getLocation()
    } else {
      setLocationUnavailable(true)
    }
  }, [])
  
  const findBarsHandler = async () => {
    setIsLoading(true)
    try {
      const url = 'https://api.openbrewerydb.org/v1/breweries'
      if (currentLocation) {
        //append current location data to URL
      }
      //else append zip code from user input form 
      const response = await fetch(url)
      //fetch does not throw its own errors, unlike Axios
      if (!response.ok) {
        throw new Error('API response was not okay')
      }
      const data = await response.json()
      setBarList(data)
    } catch (error) {
      setError(error.message)
    }
    setIsLoading(false)
  }

  let content = <p>Found no Bars</p>

  if (barList.length > 0) {
    content = <BarList bars={barList}/>
  }

  if (error) {
    content = <p>{error}</p>
  }

  if (isLoading) {
    content = <p>Loading...</p>
  }

  return (
    //conditionally render the zipcode input form if geolocation fails/is blocked
    <>
      <section>
        <button onClick={findBarsHandler}>Find Bars</button>
      </section>
      <section>
        {content}
      </section>
    </>
  );
}

export default App;
