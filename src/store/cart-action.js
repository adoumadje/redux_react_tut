import { cartActions } from './cart-slice'
import { uiActions } from './ui-slice'


export function fetchData() {
    return async (dispatch) => {
        const fetchHandler = async () => {
            const res = await fetch('https://redux-react-tut-76088-default-rtdb.firebaseio.com/cartItems.json')
            const data = await res.json()
            return data
        }

        try {
            const cartData = await fetchHandler()
            dispatch(cartActions.replaceData(cartData))
        } catch (err) {
            dispatch(uiActions.showNotification({
                open: true,
                message: 'Sending Request Failed',
                type: 'error',
            }))
        } 
    }
}

export function sendCartData(cart) {
    return (dispatch) => {
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

        try {
            sendRequest()
        } catch (err) {
            dispatch(uiActions.showNotification({
                open: true,
                message: 'Sending Request Failed',
                type: 'error',
            }))
        }
    }
}