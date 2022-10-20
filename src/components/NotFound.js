import React from 'react';
import { Navigate } from 'react-router-dom';

const NotFound = () => {
    alert("어딜 들어오노 ㅋㅋㅋ");
    return <Navigate to="/" />
}

export default NotFound;