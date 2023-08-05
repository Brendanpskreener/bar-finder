import { useEffect, useState } from 'react'
import BarList from './components/BarList'
import './App.css'
import UserInput from './components/UserInput'
import findBars from './interfaces/Bars'
import Pagination from './components/Pagination'

function App() {
  const [barList, setBarList] = useState([])
  const [currentLocation, setCurrentLocation] = useState({})
  const [locationUnavailable, setLocationUnavailable] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const defaultState = {name:'', zipcode:'', page:1, locationToggle:!locationUnavailable}
  const perPage = 4
  
  async function getLocation() {
    const promise = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    try {
      const {coords: {latitude, longitude}} = await promise
      setCurrentLocation({latitude, longitude})
      setLocationUnavailable(false)
    } catch (error) {
      console.warn(error)
    } finally {
      setMounted(true)
    }
  }
  
  async function findBarsHandler(query) {
    try {
      const bars = await findBars({...query, ...currentLocation})
      setBarList(bars)
    } catch (error) {
      console.warn(error)
    }
  }

  const previousPage = () => {
    if (currentPage!==1) {
      setCurrentPage(currentPage-1)
    }
  }

  const nextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  useEffect(() => {
    getLocation()
  }, [])

  // useEffect(() => {
  //   if (mounted) {
  //     findBarsHandler(defaultState)
  //   }
  // }, [mounted])

  return (
    <>
      <h1>
        Bar Finder
      </h1>
      {!mounted ? <div className='loading'>Loading...</div>:
        <div className='container'>
          <UserInput 
            findBars={findBarsHandler} 
            locationUnavailable={locationUnavailable} 
            defaultState={defaultState}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          {barList.length > 0 ? <BarList bars={barList}/> : <div className='zilch'>Found no Bars</div>}
          <Pagination 
            currentPage={currentPage}
            previousPage={previousPage}
            nextPage={nextPage}
            perPage = {perPage}
            pageLength = {barList.length}
          />
        </div>}
    </>
  )
}

export default App
