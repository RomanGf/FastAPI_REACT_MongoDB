import React from "react";
import { Navigate, useLocation } from "react-router-dom";


export const setToken = (token) => {
    localStorage.getItem('rasyueToken', token)
}

export const fetchToken = (token) => {
    let auth = fetchToken()
    let location = useLocation
}

export const RequiredToken = ({children}) => {
    let auth = fetchToken()
    let location = useLocation()

    if (!auth) {
        return <Navigate  to={'/'} state={{from:location}} />
    }
    return children;
}