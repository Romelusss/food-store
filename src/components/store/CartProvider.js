import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultState = {
    meals: [],
    total: 0
};

const cartReducer = (state,action) => {
    
    if(action.type === "ADD"){
        const updatedTotal = state.total + action.item.price * action.item.amount;

        const existingCartItemIndex = state.meals.findIndex(
            (item) => item.id === action.item.id
        );
        const existingCartItem = state.meals[existingCartItemIndex];
        let updatedMeals;

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedMeals = [...state.meals];
            updatedMeals[existingCartItemIndex] = updatedItem;
            
        
        } else {
            updatedMeals = state.meals.concat(action.item);
        }


        return {
            meals: updatedMeals,
            total: updatedTotal
        };
    }


    if(action.type === "REMOVE"){
        const existingCartItemIndex = state.meals.findIndex(
            (item) => item.id === action.id
        );
        const cartItem = state.meals[existingCartItemIndex];
        const updatedTotal = state.total - cartItem.price;
        let updatedMeals; 

        if(cartItem.amount === 1){
            updatedMeals = state.meals.filter(item => item.id !== action.id);
        } else {
            const updatedItem = {
                ...cartItem,
                amount: cartItem.amount - 1
            };
            updatedMeals = [...state.meals];
            updatedMeals[existingCartItemIndex] = updatedItem;
        }

        return {
            meals: updatedMeals,
            total: updatedTotal
        }

    }

    if (action.type === 'CLEAR'){
        return defaultState;
        
    }

    return defaultState;
};


const CartProvider = (props) => {
    const [cartState,dispatchCartAction] = useReducer(cartReducer, defaultState);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({type: 'ADD',item: item})
    };

    const removeItemFromCardHandler = (id) => {
        dispatchCartAction({type: 'REMOVE', id})
    };

    const clearCartHandler = () => {
        dispatchCartAction({type: 'CLEAR'})
        
    };

    const cartContext = {
        meals: cartState.meals,
        total: cartState.total,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCardHandler,
        clearCart: clearCartHandler

    };

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;