import React, { useState } from 'react';

//Defining Security context - to produce JWT tokens on login for authentication
const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
});

//Defining set up for login and logout with token. In login-component, this is used to create JWT-token which
//is then used for authentication for the application
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