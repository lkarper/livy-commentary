import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TokenService from '../services/token-service';

const PublicOnlyRoute = ({ render, component, ...props}) => {
    const Component = render ? render : component;
    return (
        <Route 
            {...props}
            render={componentProps => (
                TokenService.hasAuthToken()
                    ? <Redirect to={'/'} />
                    : <Component {...componentProps} />
            )}
        />
    );
}

export default PublicOnlyRoute;