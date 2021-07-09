// Basic Forms
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

function UsernameForm({onSubmitUsername}) {
  // 🐨 add a submit event handler here (`handleSubmit`).
  // 💰 Make sure to accept the `event` as an argument and call
  // `event.preventDefault()` to prevent the default behavior of form submit
  // events (which refreshes the page).
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
  //
  // 🐨 get the value from the username input (using whichever method
  // you prefer from the options mentioned in the instructions)
  // 💰 For example: event.target.elements[0].value
  // 🐨 Call `onSubmitUsername` with the value of the input

  // 🐨 add the onSubmit handler to the <form> below

  // 🐨 make sure to associate the label to the input.
  // to do so, set the value of 'htmlFor' prop of the label to the id of input
  function handleSubmit(event) {
    event.preventDefault()
    // using ref
    const value = inputRef.current.value
    onSubmitUsername(value)
  }

  function handleValidation(event) {
    const inputValue = event.target.value
    const isValid = inputValue === inputValue.toLowerCase()
    setError(
      isValid
        ? null
        : `The value ${inputValue} is not valid because we want just lowercase letters`,
    )
  }
  // define error state
  const [error, setError] = React.useState(null)
  const inputRef = React.createRef()
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstNameInput">First name:</label>
        <input name="firstName" id="firstNameInput" type="text" />
      </div>
      <div>
        <label htmlFor="usernameInput">Username:</label>
        <input
          onChange={handleValidation}
          ref={inputRef}
          name="username"
          id="usernameInput"
          type="text"
        />
        {error && (
          <div style={{color: 'red'}} role="alert" id="error">
            {error}
          </div>
        )}
      </div>
      <button type="submit" disabled={Boolean(error)}>
        Submit
      </button>
    </form>
  )
}

function App() {
  const onSubmitUsername = username => alert(`You entered: ${username}`)
  return <UsernameForm onSubmitUsername={onSubmitUsername} />
}

export default App
