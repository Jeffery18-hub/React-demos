const Storage = (cartItems)=> {
    localStorage.setItem('cartItems', JSON.stringify(cartItems.length>0 ? cartItems : []));
}


export const CartReducer = (state, action) => {
    let index = -1;
    if (action.payload) {
        index = state.cartItems.findIndex(p => p.id === action.payload.id);
    }

    let newItems = [...state.cartItems]; // copy state

    switch (action.type) {
        case 'ADD_TO_CART':
        case 'INCQTY':
            if (index === -1) {
                // state.cartItems.push({ ...action.payload, quantity: 1 }); bad way to modify the state
                newItems.push({ ...action.payload, quantity: 1 });

            } else {
                // state.cartItems[index].quantity++;
                newItems[index].quantity++;

            }
            break;

        case 'REMOVE_FROM_CART':
            if (index > -1) {
                // state.cartItems.splice(index, 1);
                newItems = state.cartItems.filter(p => p.id !== action.payload.id);
            }
            break;

        case 'DECQTY':
            if (index > -1) {
                // state.cartItems[index].quantity--;
                if (newItems[index].quantity >= 1){
                    newItems[index].quantity--;
                }
            }
            break;

        case 'CLEAR_CART':
            newItems = [];
            break;

        default:
            break;
    }
    state.cartItems = newItems;
    Storage(state.cartItems);
    return state;
}