import { React, useContext, useState } from 'react';

import CartContext from '../store/cart-context';
import CartItem from './CartItem'
import Modal from '../UI/Modal';
import Checkout from './Checkout';
import classes from './Cart.module.css';


const Cart = props => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartCtx = useContext(CartContext);

    const totalAmount = cartCtx.total.toFixed(2);
    const hasItems = cartCtx.meals.length > 0;


    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item,amount: 1});
    };

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    };

    const orderHandler = () => {
        setIsCheckout(true);
    };

    const confirmHandler = async(userData) => {
        setIsSubmitting(true);
        
        await fetch('https://react-course-1ab92-default-rtdb.firebaseio.com/orders.json',{
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                items: cartCtx.meals
            })
        });

        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
        
    };

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.meals.map(item => {
                return <CartItem 
                    key = {item.id}
                    name = {item.name}
                    amount = {item.amount}
                    price = {item.price}
                    onAdd = {cartItemAddHandler.bind(null, item)}
                    onRemove = {cartItemRemoveHandler.bind(null, item.id)}
                />
            })} 
        </ul>
    );

    const modalActions = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onCloseCart}>Close</button>
            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>
    );

    const cartModalContent = (
        <>
            {cartItems}
            <div className={classes.total}>
                <span>Total amount</span>
                <span>{totalAmount}$</span>
            </div>
            {isCheckout && <Checkout onConfirm={confirmHandler} onCancel={props.onCloseCart}/>}
            {!isCheckout && modalActions}
        </>
    );

    const isSubmittingModalContent = <p>Sending order....</p>

    const didSubmitModalContent = (
        <>
            <p>Succesfully sent rhe order!</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onCloseCart}>
                    Close
                </button>
            </div>
        </>
    )

    return (
        <Modal onClick={props.onCloseCart}>
            {!isSubmitting && !didSubmit &&  cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    )
};

export default Cart;