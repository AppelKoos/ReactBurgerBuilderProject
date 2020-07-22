import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/AuxHoc';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:
                        {this.props.ingredients[igKey]}
                    </li>)
            })
        return (
            <Aux>
                <h3>Your Order</h3>
                <p> A yummy burger containg:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: R{this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>{/* will call cancel for now,no access to processing */}
            </Aux>
        )
    }

}



export default OrderSummary;