import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import Order from '../../components/Order/Order'
import axios from '../../axios-order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/actionIndex'
import Spinner from '../../components/UI/Spinner/Spinner'

const Orders = props => {
    const { onFetchOrders } = props
    useEffect(() => {
        onFetchOrders(props.s_token, props.s_userId)
    }, [onFetchOrders])
    let orders = <Spinner />
    if (!props.s_loading) {
        orders = props.s_orders.map(order => (
            <Order key={order.id}
                ingredients={order.ingredients}
                price={order.price} />
        ))
    }
    return (
        <div>
            {orders}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        s_orders: state.order.orders,
        s_loading: state.order.loading,
        s_token: state.auth.token,
        s_userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));