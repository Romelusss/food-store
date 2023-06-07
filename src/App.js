import { useState} from 'react';

import CartProvider from './components/store/CartProvider';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals'
import Cart from './components/Cart/Cart';
import './App.css';

function App() {
    const [isShownCart, setCartShown] = useState(false);

    const showCartHandler = () => {
        setCartShown(true);
    }

    const hideCartHandler = () => {
        setCartShown(false);
    }

    return(
        <CartProvider>
            {isShownCart && <Cart onCloseCart={hideCartHandler}/>}
            <Header onShowCart={showCartHandler}/>
            <main>
                <Meals />
            </main>
        </CartProvider>
    )
}

export default App;
