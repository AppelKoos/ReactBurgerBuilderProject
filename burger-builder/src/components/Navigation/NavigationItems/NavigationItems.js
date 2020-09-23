import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

//import { checkPropTypes } from 'prop-types';

const Navigationitems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/orders" >Orders</NavigationItem> : null}
        {!props.isAuthenticated
            ? <NavigationItem link="/auth" >Authenticate</NavigationItem>
            : <NavigationItem link="/logout" >Logout</NavigationItem>}
    </ul>
);

export default Navigationitems;