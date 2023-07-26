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
    const location = await getLocation()
    console.log(location)
    await findBarsHandler(location)
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
  
  async function findBarsHandler(formData) {
    console.log(currentLocation)
    try {
      if (formData.locationToggle) {
        const query = `${currentLocation.latitude},${currentLocation.longitude}`
        baseURL.searchParams.append("by_dist", query)
      } else if (formData.zipcode !== '') {
        baseURL.searchParams.append("by_postal", formData.zipcode)
      }
      const response = await axios.get(baseURL)
      console.log(response)
      setBarList(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  
  return (
    <>
      <h1>
        Bar Finder
      </h1>
      <div className='container'>
        <div className='left'>
          <UserInput findBars={findBarsHandler} locationUnavailable={locationUnavailable} />
        </div>
        {barList.length > 0 ? <BarList bars={barList}/> : <section>Found no Bars</section>}
        <div className='right' />
      </div>
    </>
    
  );
}

export default App;
