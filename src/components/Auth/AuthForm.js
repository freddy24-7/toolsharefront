import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';
import {SIGN_IN_URL, SIGN_UP_URL} from "../../backend-urls/constants";
import RegistrationService from "../../services/RegistrationService";
import AuthenticationService from "../../services/AuthenticationService";

const AuthForm = () => {
    const history = useHistory();
    // const usernameInputRef = useRef();
    // const passwordInputRef = useRef();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const user = {username, password}
    console.log(user);
    const usernameInputChangeHandler = (event) => {
        setUsername(event.target.value);
    }
    const passwordInputChangeHandler = (event) => {
        setPassword(event.target.value);
    }

    const authCtx = useContext(AuthContext);


    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        // const enteredUsername = usernameInputRef.current.value;
        // const enteredPassword = passwordInputRef.current.value;

        // optional: Add validation

        setIsLoading(true);
        let url = SIGN_IN_URL;

        // fetch(url, {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         email: enteredEmail,
        //         password: enteredPassword,
        //         returnSecureToken: true,
        //     }),
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // })
        AuthenticationService.login(user, url)
            .then((response) => {
                const data = response.data;
                const user = {
                    token: data.token,
                    username: data.username,
                    password: data.password,
                };
                authCtx.login(user);
                history.push('/profile');
            })
            // .then((res) => {
            //     setIsLoading(false);
            //     if (res.ok) {
            //         return res.json();
            //     } else {
            //         return res.json().then((data) => {
            //             let errorMessage = 'Authentication failed!';
            //             // if (data && data.error && data.error.message) {
            //             //   errorMessage = data.error.message;
            //             // }
            //
            //             throw new Error(errorMessage);
            //         });
            //     }
            // })
            // .then((data) => {
            //     // const expirationTime = new Date(
            //     //     new Date().getTime() + +data.expiresIn * 1000
            //     // );
            //     // authCtx.login(data.idToken, expirationTime.toISOString());
            //     authCtx.login(data.idToken);
            //     history.replace('/');
            // })
            .catch((err) => {
                alert(err.message);
            });
    };

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    {/*<label htmlFor='username'>Your Username</label>*/}
                    {/*<input type='username' id='username' required ref={usernameInputRef} />*/}
                    <input
                        type="text"
                        placeholder= "Enter username"
                        name= "username"
                        className= "form-control"
                        value={username}
                        onChange={usernameInputChangeHandler}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    {/*<input*/}
                    {/*    type='password'*/}
                    {/*    id='password'*/}
                    {/*    required*/}
                    {/*    ref={passwordInputRef}*/}
                    {/*/>*/}
                    <input
                        type='password'
                        id='password'
                        placeholder= "Enter password"
                        value={password}
                        onChange={passwordInputChangeHandler}
                    />
                </div>
                <div className={classes.actions}>
                    {!isLoading && (
                        <button>{isLogin ? 'Login' : 'Create Account'}</button>
                    )}
                    {isLoading && <p>Sending request...</p>}
                    <button
                        type='button'
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AuthForm;