import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Notification from "./components/Notification";
import { sendCartData } from "./store/cart-slice";

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

    dispatch(sendCartData(cart))
  }, [cart])

  return (
    <div className="App">
      {notification && <Notification type={notification.type} message={notification.message} />}
      {isLoggedIn ? <Layout /> : <Auth />}
    </div>
  );
}

export default App;