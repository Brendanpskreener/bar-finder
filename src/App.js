import { useEffect, useState } from 'react'
import BarList from './components/BarList'
import './App.css'
import UserInput from './components/UserInput'
import findBars from './repositories/Bars'

function App() {
  const [barList, setBarList] = useState([])
  const [currentLocation, setCurrentLocation] = useState({})
  const [locationUnavailable, setLocationUnavailable] = useState(true)
  const [mounted, setMounted] = useState(false)

  const defaultState = {name:'', zipcode:'', locationToggle:!locationUnavailable}
  
  async function getLocation() {
    console.log('calling get location')
    const promise = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    try {
      const {coords: {latitude, longitude}} = await promise
      setCurrentLocation({latitude, longitude})
      setLocationUnavailable(false)
    } catch (error) {
      console.log(error)
    } finally {
      setMounted(true)
    }
  }
  
  async function findBarsHandler(query) {
    console.log('calling find bars')
    try {
      const bars = await findBars({...query, ...currentLocation})
      setBarList(bars)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      getLocation()
    }, 500);
  }, [])

  useEffect(() => {
    if (mounted) {
      findBarsHandler(defaultState)
    }
  }, [mounted])

  console.log('app render')

  return (
    <>
      <h1>
        Bar Finder
      </h1>
      {!mounted ? <section>Loading...</section>: <div>
        <div className='container'>
          <div className='left'>
            <UserInput findBars={findBarsHandler} locationUnavailable={locationUnavailable} defaultState={defaultState}/>
          </div>
          {barList.length > 0 ? <BarList bars={barList}/> : <section>Found no Bars</section>}
          <div className='right' />
        </div>
      </div>}
    </>
    
  );
}

export default App;
