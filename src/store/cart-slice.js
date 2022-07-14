import { createSlice } from '@reduxjs/toolkit'
import { uiActions } from './ui-slice'


const cartSlice = createSlice({
    name: 'cart',
    
    initialState: {
        itemsList: [],
        totalQuantity: 0,
        showCart: false,
    },
    
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload

            // check if item is already available
            const existingItem = state.itemsList.find((item) => item.id === newItem.id)

            if(existingItem) {
                existingItem.quantity++
                existingItem.totalPrice += newItem.price
            } else {
                state.itemsList.push({
                    id: newItem.id,
                    name: newItem.name,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                })
            }
            state.totalQuantity++
        },

        removeFromCart: (state, action) => {
            const id = action.payload
            const existingItem = state.itemsList.find((item) => item.id === id)
            
            if(existingItem.quantity === 1) {
                state.itemsList = state.itemsList.filter((item) => item.id !== id)
            } else {
                existingItem.quantity--
                existingItem.totalPrice -= existingItem.price
            }
            state.totalQuantity--
        },

        setShowCart: (state) => {
            state.showCart = !state.showCart
        }
    }
})

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



export const cartActions = cartSlice.actions

export default cartSlice