import { act } from 'react-dom/test-utils'
import * as actionTypes from '../actions/actionsTypes'
import { updateObject } from '../utility'

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false })
}
const purchaseStart = (state, action) => {
    return updateObject(state, { loading: true })
}
const purchaseSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, { id: action.orderId })
    return updateObject(state, {
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
    });
}
const purchaseFail = (state, action) => {
    return updateObject(state, { loading: false });
}
const fetchStart = (state, action) => {
    return updateObject(state, { loading: false })
}
const fetchSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        orders: action.orders,
    })
}
const fetchFailed = (state, action) => {
    return updateObject(state, { loading: false })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
        case actionTypes.PURCHASE_BURGER_START: return purchaseStart(state, action)
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseSuccess(state, action)
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseFail(state, action)
        case actionTypes.FETCTH_ORDERS_START: return fetchStart(state, action)
        case actionTypes.FETCTH_ORDERS_SUCCESS: return fetchSuccess(state, action)
        case actionTypes.FETCTH_ORDERS_FAILED: return fetchFailed(state, action)
        default:
            return state
    }
}
export default reducer