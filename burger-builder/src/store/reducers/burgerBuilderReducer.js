import * as actionTypes from '../actions/actionsTypes'
import { updateObject } from '../utility'

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 2,
    bacon: 1
}

const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedState)
}
const removeIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedState)
}
const setIngredients = (state, action) => {
    return updateObject(state,
        {
            ingredients: {
                salad: action.ingredients.salad,
                bacon: action.ingredients.bacon,
                cheese: action.ingredients.cheese,
                meat: action.ingredients.meat
            },
            totalPrice: 4,
            error: false
        })
}
const fetchIngredient = (state, action) => {
    return updateObject(state, { error: true })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS: return addIngredient(state, action)
        case actionTypes.REMOVE_INGREDIENTS:
            //kept like this to show other way, call removeIngredient
            return {
                ...state,
                ingredients: {
                    //this makes a deep clone of ingredients
                    ...state.ingredients,
                    //payload recieve new value and target with ES6 syntax inside object
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredient(state, action)
        default:
            return state;
    }
}

export default reducer;