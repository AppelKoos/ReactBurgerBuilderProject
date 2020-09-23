import React from 'react';
import Aux from '../../../hoc/AuxHoc/AuxHoc';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:
                    {props.ingredients[igKey]}
                </li>)
        })
    return (
        <Aux>
            <h3>Your Order</h3>
            <p> A yummy burger containing:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: R{props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>{/* will call cancel for now,no access to processing */}
        </Aux>
    )
}



export default OrderSummary;