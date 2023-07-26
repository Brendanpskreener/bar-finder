import { useState } from "react"
import classes from './UserInput.module.css'

const UserInput = (props) => {
  const defaultFormState = {name:'', zipcode:'', locationToggle:!props.locationUnavailable}
  const [formData, setFormData] = useState(defaultFormState)
  const [timer, setTimer] = useState(null)

  const autoSearch = () => {
    clearTimeout(timer)
    const newTimer = setTimeout(() => {
      props.findBars(formData)
      //setFormData(defaultFormState)
      console.log('API called')
    }, 800);
    setTimer(newTimer)
  }

  const handleNameChange = (event) => {
    const {value} = event.target
    setFormData(prevFormData => ({...prevFormData, name: value}))
    autoSearch()
  }

  const handleZipChange = (event) => {
    const {value} = event.target
    const validatedZip = value.replace(/[^\d{5}]$/, "").substr(0,5)
    setFormData(prevFormData => ({...prevFormData, zipcode: validatedZip}))
    if (value.length === 5) {
      autoSearch()
    }
  }

  const handleLocationToggleChange = (event) => {
    const {checked} = event.target
    setFormData(prevFormData => ({...prevFormData, locationToggle: checked, zipcode: ''}))
  }

  console.log(formData)

  return (
    <form className={classes['user-input']}>
      <input type="search" placeholder="Bar Name" name="name" value={formData.name} onChange={handleNameChange} />
      <input type="search" placeholder="Zip Code" name="zipcode" value={formData.zipcode} onChange={handleZipChange} disabled={formData.locationToggle} />
      <label>
        <input type="checkbox" name="locationToggle" checked={formData.locationToggle} onChange={handleLocationToggleChange} disabled={props.locationUnavailable} />
        {props.locationUnavailable ? 'User Denied Location': 'Use Location' }
      </label>
      
    </form>
  )
}

export default UserInput