import { useState } from "react"

const UserInput = (props) => {
  const [enteredInput, setEnteredInput] = useState('')
  const InputChangeHandler = (event) => {
    setEnteredInput(event.target.value)
  }
  const submitHandler = (event) => {
    event.preventDefault()
    if (enteredInput.length !== 5) {
      return
    }
    props.findBars(enteredInput)
    setEnteredInput('')
  }
  return (
    <form onSubmit={submitHandler}>
      <button type='submit'>Find Bars</button>
      <p>
        <label>Enter Your Zip Code: </label>
        <input type="number" value={enteredInput} onChange={InputChangeHandler} />
      </p>
    </form>
  )
}

export default UserInput