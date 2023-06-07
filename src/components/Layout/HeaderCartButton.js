import React,{useContext,useEffect,useState}from 'react';

import CartContext from '../store/cart-context'
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
    const [isBtnHighlighed,setBtnIsHighlighted] = useState(false);

    const cartCtx = useContext(CartContext);

    const {meals} = cartCtx;

    const numberOfItems = cartCtx.meals.reduce((currNumber,item) => {
        return currNumber + item.amount;
    }, 0)

    useEffect(() => {
        if(meals.length === 0){
            return;
        }

        setBtnIsHighlighted(true);
        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        },100)

        return (() => {
            clearTimeout(timer)
        })
    }, [meals])

    const buttonClasses = `${classes.button} ${isBtnHighlighed ? classes.bump : ''}`

    return <button className={buttonClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>
            {numberOfItems}
        </span>
    </button>
};

export default HeaderCartButton;