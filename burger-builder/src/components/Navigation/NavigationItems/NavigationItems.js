import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

import { checkPropTypes } from 'prop-types';

const Navigationitems = () => (
    <ul className={classes.NavigationItems}>

        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        <NavigationItem link="/orders" >Orders</NavigationItem>
    </ul>
);

export default Navigationitems;