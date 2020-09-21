import React, { Component } from 'react';
import { connect } from 'react-redux'

import Aux from '../../hoc/AuxHoc/AuxHoc';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/actionIndex';
import axios from '../../axios-order';

class BurgerBuilder extends Component {
    state = {
        purchaseing: false
    }

    componentDidMount(){
        this.props.onInitIngredients()
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchaseing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchaseing: false });
    }

    purchaseContinuehandler = () => {
        this.props.history.push('/checkout')
        this.props.onInitPurchase()
    }

    render() {
        const disableInfo = {
            ...this.props.s_ings
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.props.s_err ? <p>Ingredients cant be loaded</p> : <Spinner />
        if (this.props.s_ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.s_ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemove={this.props.onIngredientRemoved}
                        disabled={disableInfo}
                        purchaseable={this.updatePurchaseState(this.props.s_ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.s_tPrice} />
                </Aux>)
            orderSummary = <OrderSummary
                ingredients={this.props.s_ings}
                price={this.props.s_tPrice}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinuehandler}
            />
        }

        return (
            <Aux>
                <Modal show={this.state.purchaseing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        s_ings: state.burgerBuilder.ingredients,
        s_tPrice: state.burgerBuilder.totalPrice,
        s_err: state.burgerBuilder.error
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));