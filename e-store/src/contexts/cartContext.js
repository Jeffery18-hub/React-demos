import React, {createContext} from 'react'
import { useReducer } from 'react';
import {CartReducer} from './cartReducer';

export const CartContext = createContext();

const Storage = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')?localStorage.getItem('cartItems'):[]);
    return cartItems;
}

const initialState = {
    cartItems: Storage()
}
// we are not allowed to modify the state in the context, so we need to use reducer


const CartContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(CartReducer, initialState);// dispatch is callback function


    const addProduct = payload => {
        dispatch({
            type: 'ADD_TO_CART',
            payload
        })
        return state.cartItems;
    }

    const removeProduct = payload => {
        dispatch({
            type: 'REMOVE_FROM_CART',
            payload
        })
        return state.cartItems;
    }

    const increaseQuantity = payload => {
        dispatch({
            type: 'INCQTY',
            payload
        })
        return state.cartItems;
    }

    const decreaseQuantity = payload => {
        dispatch({
            type: 'DECQTY',
            payload
        })
        return state.cartItems;
    }

    const clearCart = () => {
        dispatch({
            type: 'CLEAR_CART',
            payload: undefined
        })
        return state.cartItems;
    }

    const getItems = () => {
        return state.cartItems;
    }

    
    const contextValues = {
        addProduct,
        removeProduct,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        getItems,
        ...state
    }

    return (
        <CartContext.Provider value={contextValues}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;