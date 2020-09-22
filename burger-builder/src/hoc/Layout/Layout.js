import React, { Component } from 'react';
import { connect } from 'react-redux'
import Aux from '../AuxHoc/AuxHoc';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.css';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    SideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false })
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !this.state.showSideDrawer };
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar
                    isAuth={this.props.s_isAuthed}
                    drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    isAuth={this.props.s_isAuthed}
                    open={this.state.showSideDrawer}
                    closed={this.SideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>)
    }

};

const mapStateToProps = state => {
    return {
        s_isAuthed: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(Layout);