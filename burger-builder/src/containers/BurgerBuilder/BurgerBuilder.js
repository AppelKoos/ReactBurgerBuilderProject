import React, { Component } from 'react';
import { connect } from 'react-redux'

import Aux from '../../hoc/AuxHoc/AuxHoc';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionType from '../../store/actions'

class BurgerBuilder extends Component {
    state = {
        purchaseing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // axios.get('https://react-my-burger-93143.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data })
        //     }).catch(error => this.setState({ error: true }))
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
    }

    render() {
        const disableInfo = {
            ...this.props.s_ings
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients cant be loaded</p> : <Spinner />
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
        if (this.state.loading) {
            orderSummary = <Spinner />
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
        s_ings: state.ingredients,
        s_tPrice: state.totalPrice
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch({ type: actionType.ADD_INGREDIENTS, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({ type: actionType.REMOVE_INGREDIENTS, ingredientName: ingName })
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));