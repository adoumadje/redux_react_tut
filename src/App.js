import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

function App() {
  const counter = useSelector((state) => state.counter)
  const dispatch = useDispatch()

  function increment() {
    dispatch({ type: 'INC' })
  }

  function decrement() {
    dispatch({ type: 'DEC' })
  }

  function addBy() {
    dispatch({ type: 'ADD', payload: 10 })
  }

  return (
    <div>
      <h1>Counter App</h1>
      <h2>{counter}</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={addBy}>Add by 10</button>
    </div>
  )
}

export default App