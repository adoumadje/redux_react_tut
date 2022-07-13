import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Notification from "./components/Notification";
import { uiActions } from "./store/ui-slice";

function App() {
  const [isFirstRender, setIsFirstRender] = useState(true)
  const dispatch = useDispatch()

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const cart = useSelector(state => state.cart)
  const notification = useSelector(state => state.ui.notification)

  useEffect(() => {
    if(isFirstRender) {
      setIsFirstRender(false)
      return
    }

    // Send state as Sending Request
    dispatch(uiActions.showNotification({
      open: true,
      message: 'Sending Request',
      type: 'warning',
    }))
    const sendRequest = async () => {
      const res = await fetch('https://redux-react-tut-76088-default-rtdb.firebaseio.com/cartItems.json', {
        method: 'PUT',
        body: JSON.stringify(cart),
      })
      const data = await res.json()
      // Send state as Request is successfull
      dispatch(uiActions.showNotification({
        open: true,
        message: 'Sent Request To Database Successfully',
        type: 'success',
      }))
    }
    
    sendRequest().catch((err) => {
      //Send state as Error
      dispatch(uiActions.showNotification({
        open: true,
        message: 'Sending Request Failed',
        type: 'error',
      }))
    })
  }, [cart])

  return (
    <div className="App">
      {notification && <Notification type={notification.type} message={notification.message} />}
      {isLoggedIn ? <Layout /> : <Auth />}
    </div>
  );
}

export default App;