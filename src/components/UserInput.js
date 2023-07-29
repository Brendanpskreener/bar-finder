import { useEffect, useState } from "react"
import classes from './UserInput.module.css'

const UserInput = ({defaultState, findBars, locationUnavailable}) => { 
  const [formData, setFormData] = useState(defaultState)
  const [timer, setTimer] = useState(null)
  const [formIsValid, setFormIsValid] = useState(false)

  const autoSearch = () => {
    clearTimeout(timer)
    const newTimer = setTimeout(() => {
      setFormIsValid(true)
      console.log('API called')
    }, 300);
    setTimer(newTimer)
  }

  const handleNameChange = (event) => {
    const {value} = event.target
    setFormData(prevFormData => ({...prevFormData, name: value}))
    if (formData.zipcode.length === 5 || formData.zipcode.length === 0) {
      autoSearch()
    }
  }

  const handleZipChange = (event) => {
    const {value} = event.target
    const validatedZip = value.replace(/[^\d{5}]$/, "").substr(0,5)
    setFormData(prevFormData => ({...prevFormData, zipcode: validatedZip}))
    if (value.length === 5 || value.length === 0) {
      autoSearch()
    }
  }

  const handleLocationToggleChange = (event) => {
    const {checked} = event.target
    setFormData(prevFormData => ({...prevFormData, locationToggle: checked, zipcode: ''}))
    autoSearch()
  }

  useEffect(() => {
    if (formIsValid) {
      findBars(formData)
      setFormIsValid(false)
    }
  }, [formIsValid])

  console.log(formData, 'user input render')

  return (
    <form className={classes['user-input']}>
      <input type="search" placeholder="Bar Name" name="name" value={formData.name} onChange={handleNameChange} />
      <label>
        <input type="search" placeholder="Zip Code" name="zipcode" value={formData.zipcode} onChange={handleZipChange} disabled={formData.locationToggle} />
        {/* {formData.zipcode.length > 0 && !formIsValid ? <p>Zipcode must be valid</p> : ''} */}
      </label>
      <label>
        <input type="checkbox" name="locationToggle" checked={formData.locationToggle} onChange={handleLocationToggleChange} disabled={locationUnavailable} />
        {locationUnavailable ? 'User Denied Location': 'Use Location' }
      </label>
      
    </form>
  )
}

export default UserInput