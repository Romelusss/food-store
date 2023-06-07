import { useRef,useState } from 'react';

import Input from '../../UI/Input';
import classes from './MealForm.module.css';

const MealForm = (props) => {
    const [amountIsValid,setAmountIsValid] = useState(true);
    const amountInputRef = useRef();

    const submitHandler = event => {
        event.preventDefault();

        const enertedAmount = amountInputRef.current.value;
        const amountNumber = +enertedAmount;

        if(enertedAmount.trim().length === 0 || amountNumber < 1 || amountNumber > 10){
            setAmountIsValid(false)
            return;
        }

        props.onAddAmount(amountNumber);
    };

    return <form className={classes.form} onSubmit={submitHandler}>
        <Input
            ref={amountInputRef} 
            label = 'Amount'
            input = {{
                id: props.id,
                type: 'number',
                min: '1',
                max: '10',
                step: '1',
                defaultValue: '1',
            }}
        />
        <button>+ Add</button>
        {!amountIsValid && <p>Please enter a valid amount (1-10)</p>}
    </form>
};

export default MealForm;