import { useContext } from 'react';

import MealForm from './MealForm';
import CartContext from '../../store/cart-context';
import classes from './Meal.module.css'

const Meal = (props) => {
    const cartCtx = useContext(CartContext);

    const addMealHandler = (amount) => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        })
    };   

    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{`$${props.price.toFixed(2)}`}</div>
            </div>
            <div>
                <MealForm id={props.id} onAddAmount={addMealHandler}/>
            </div>
        </li>
    )
}

export default Meal;