/*
#####This component is no longer in use#####
!!!! IT IS ONLY KEPT FOR REFRENCE PURPOSES !!!!!!
REPLACED BY  REACT.LAZY
*/

import React, { Component } from 'react';
const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null
        }

        componentDidMount() {
            importComponent()
                .then(cmp => {
                    this.setState({ component: cmp.default })
                })
        }

        render() {
            const C = this.state.component;

            return C ? <C {...this.props} /> : null;
        }
    }
}
export default asyncComponent