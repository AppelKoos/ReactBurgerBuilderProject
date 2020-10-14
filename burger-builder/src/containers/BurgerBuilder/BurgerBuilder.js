import React, { useState, useEffect, useCallback } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux'

import Aux from '../../hoc/AuxHoc/AuxHoc';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/actionIndex';
import axios from '../../axios-order';

export const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false)

    const s_ings = useSelector(state => state.burgerBuilder.ingredients)
    const s_tPrice = useSelector(state => state.burgerBuilder.totalPrice)
    const s_err = useSelector(state => state.burgerBuilder.error)
    const s_isAuthed = useSelector(state => state.auth.token !== null)

    const dispatch = useDispatch();

    const onIngredientAdded = (ingName) => dispatch(actions.addIngredient(ingName))
    const onIngredientRemoved = (ingName) => dispatch(actions.removeIngredient(ingName))
    const onInitIngredients = useCallback(()=> dispatch(actions.initIngredients()), [])
    const onInitPurchase = () => dispatch(actions.purchaseInit())
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path))

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients])

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    const purchaseHandler = () => {
        if (s_isAuthed) {
            setPurchasing(true)
        } else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false)
    }

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    }

    const disableInfo = {
        ...s_ings
    };
    for (let key in disableInfo) {
        disableInfo[key] = disableInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = s_err ? <p>Ingredients cant be loaded</p> : <Spinner />
    if (s_ings) {
        burger = (
            <Aux>
                <Burger ingredients={s_ings} />
                <BuildControls
                    ingredientAdded={onIngredientAdded}
                    ingredientRemove={onIngredientRemoved}
                    disabled={disableInfo}
                    purchaseable={updatePurchaseState(s_ings)}
                    ordered={purchaseHandler}
                    isAuth={s_isAuthed}
                    price={s_tPrice} />
            </Aux>)
        orderSummary = <OrderSummary
            ingredients={s_ings}
            price={s_tPrice}
            purchaseCanceled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
        />
    }

    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
}
// const mapStateToProps = (state) => {
//     return {
//         s_ings: state.burgerBuilder.ingrediens,
//         t_Price: state.burgerBuilder.totalPrice,
//         s_err: state.burgerBuilder.error,
//         s_isAuthed: state.auth.token !== null
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
//         onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
//         onInitIngredients: () => dispatch(actions.initIngredients()),
//         onInitPurchase: () => dispatch(actions.purchaseInit()),
//         onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
//     }
// }

export default withErrorHandler(BurgerBuilder, axios);