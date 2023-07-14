import { useEffect, useState } from 'react'
import BarList from './components/BarList'
import './App.css'
import axios from 'axios'
import UserInput from './components/UserInput'

function App() {
  const [barList, setBarList] = useState([])
  const [currentLocation, setCurrentLocation] = useState({})
  const [locationUnavailable, setLocationUnavailable] = useState(true)

  const baseURL = new URL('https://api.openbrewerydb.org/v1/breweries')
  
  async function fetchData() {
    if ("geolocation" in navigator) {
      const location = await getLocation()
      await findBarsHandler(location)
    } else {
      await findBarsHandler()
    }
  }

  async function getLocation() {
    const promise = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    try {
      const {coords: location} = await promise
      setCurrentLocation(location)
      setLocationUnavailable(false)
      return location
    } catch (error) {
      console.log(error)
    }
  }
  
  async function findBarsHandler(location=currentLocation) {
    try {
      if (!!location.latitude) {
        const query = `${location.latitude},${location.longitude}`
        baseURL.searchParams.append("by_dist", query)
      } else if (location.length === 5) {
        baseURL.searchParams.append("by_postal", location)
      }
      const response = await axios.get(baseURL)
      setBarList(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  
  let content = <p>Found no Bars</p>

  if (barList.length > 0) {
    content = <BarList bars={barList}/>
  }

  return (
    <>
      {locationUnavailable && <section>
        <UserInput findBars={findBarsHandler}></UserInput>
      </section>}
      <section>
        {content}
      </section>
    </>
  );
}

export default App;
