import * as actionTypes from '../actions/actionsTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseInit = (state) => {
    return updateObject(state, { purchased: false })
}
const purchaseStart = (state) => {
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
const purchaseFail = (state) => {
    return updateObject(state, { loading: false });
}
const fetchStart = (state) => {
    return updateObject(state, { loading: false })
}
const fetchSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        orders: action.orders,
    })
}
const fetchFailed = (state) => {
    return updateObject(state, { loading: false })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state);
        case actionTypes.PURCHASE_BURGER_START: return purchaseStart(state)
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseSuccess(state, action)
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseFail(state)
        case actionTypes.FETCTH_ORDERS_START: return fetchStart(state)
        case actionTypes.FETCTH_ORDERS_SUCCESS: return fetchSuccess(state, action)
        case actionTypes.FETCTH_ORDERS_FAILED: return fetchFailed(state)
        default:
            return state
    }
}
export default reducer