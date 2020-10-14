import React, { useState } from 'react';
import { connect } from 'react-redux'
import Aux from '../AuxHoc/AuxHoc';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.css';

const Layout = props => {
    const [sideDrawerIsVisible, setSideDrawerVisibility] = useState(false)

    const SideDrawerClosedHandler = () => {
        setSideDrawerVisibility(false)
    }

    const sideDrawerToggleHandler = () => {
        setSideDrawerVisibility(!sideDrawerIsVisible)
    }
    return (
        <Aux>
            <Toolbar
                isAuth={props.s_isAuthed}
                drawerToggleClicked={sideDrawerToggleHandler} />
            <SideDrawer
                isAuth={props.s_isAuthed}
                open={sideDrawerIsVisible}
                closed={SideDrawerClosedHandler} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>)
}

const mapStateToProps = state => {
    return {
        s_isAuthed: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(Layout);