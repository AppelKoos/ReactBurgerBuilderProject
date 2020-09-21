import * as actionTypes from './actionsTypes'
import axios from '../../axios-order';

export const addIngredient = (ingredientName) => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
        ingredientName: ingredientName
    }
}
export const removeIngredient = (ingredientName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: ingredientName
    }
}

const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-my-burger-93143.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data))
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed())
            })
    }
}