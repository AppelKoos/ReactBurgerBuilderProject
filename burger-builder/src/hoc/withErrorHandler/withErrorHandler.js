import React from 'react';
import useHttpErrorhandler from '../../hooks/httpErrorHandler'
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../AuxHoc/AuxHoc';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, clearError] = useHttpErrorhandler(axios);

        return (
            <Aux>
                <Modal show={error} modalClosed={clearError}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        );
    }

}

export default withErrorHandler;