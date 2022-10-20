import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import isLogin from './Login';

const Protected = ({ element: Element, ...rest }) => {
    if (isLogin()) {
        return <Element />
    } else {
        alert("로그인해라.");
        return <Navigate to="/" />
    }
}

export default Protected;