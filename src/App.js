import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { actions } from './store'

function App() {
  const counter = useSelector((state) => state.counter)
  const dispatch = useDispatch()

  function increment() {
    dispatch(actions.increment())
  }

  function decrement() {
    dispatch(actions.decrement())
  }

  function addBy() {
    dispatch(actions.addBy(10))
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