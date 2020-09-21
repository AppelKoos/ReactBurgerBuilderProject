import React, { Component } from 'react';
import { connect } from 'react-redux'
import Order from '../../components/Order/Order'
import axios from '../../axios-order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/actionIndex'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders()
    }
    render() {
        let orders = <Spinner />
        if (!this.props.s_loading) {
            orders = this.props.s_orders.map(order => (
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
}

const mapStateToProps = state => {
    return {
        s_orders: state.order.orders,
        s_loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));