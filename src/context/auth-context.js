// import React, { useState, useEffect, useCallback } from 'react';
//
// //TODO: Add logic for token expiration
//
// const AuthContext = React.createContext({
//     token: '',
//     isLoggedIn: false,
//     login: (token) => {},
//     logout: () => {},
// });
//
// const retrieveStoredToken = () => {
//     const storedToken = localStorage.getItem('token');
//
//     return {
//         token: storedToken,
//     };
// };
//
// export const AuthContextProvider = (props) => {
//     const tokenData = retrieveStoredToken();
//     let initialToken;
//     if (tokenData) {
//         initialToken = tokenData.token;
//     }
//
//     const [token, setToken] = useState(initialToken);
//     const userIsLoggedIn = !!token;
//     const logoutHandler = useCallback(() => {
//         setToken(null);
//         localStorage.removeItem('token');
//
//     }, []);
//
//     const loginHandler = (token) => {
//         setToken(token);
//         localStorage.setItem('token', token);
//     };
//
//     const contextValue = {
//         token: token,
//         isLoggedIn: userIsLoggedIn,
//         login: loginHandler,
//         logout: logoutHandler,
//     };
//
//     return (
//         <AuthContext.Provider value={contextValue}>
//             {props.children}
//         </AuthContext.Provider>
//     );
// };
//
// export default AuthContext;
import React, { useState } from 'react';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
});

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);
    console.log(initialToken)

    const userIsLoggedIn = !!token;

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem('token', token)
    };

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token')
    };

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;