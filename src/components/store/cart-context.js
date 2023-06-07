import React from "react";

const CartContext = React.createContext({
    meals: [],
    total: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {},
});

export default CartContext;