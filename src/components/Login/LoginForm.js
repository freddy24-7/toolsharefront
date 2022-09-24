//This form is used to login the user after registration

import React, {useState, useContext, useEffect, Fragment} from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import classes from './LoginForm.module.css';
import AuthenticationService from "../../services/AuthenticationService";
import {SIGN_IN_URL} from "../../backend-urls/constants";
import laptopgirl from "../../assets/pexels-jopwell-2422286.jpg";

export const LoginForm = ({userId}) => {

    const history = useHistory();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const user = {userId, username, password}
    console.log(user);

    //Constant for error-handling
    const [error, setError] = useState(null);
    //Constant for dynamic CSS display
    const [errorCSS, setErrorCSS] = useState(false);

    //Using "useContext" here for authentication below
    const authCtx = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    const usernameInputChangeHandler = (event) => {
        setUsername(event.target.value);
        console.log(username)
    }
    const passwordInputChangeHandler = (event) => {
        setPassword(event.target.value);
    }

    //Axios call for login and authentication
    const submitHandler = (event) => {
        event.preventDefault();

        setIsLoading(true);
        AuthenticationService.login(user, SIGN_IN_URL)
            .then((response) => {
                const data = response.data;
                //Defining user object for backend
                const user = {
                    token: data.token,
                    id: data.id,
                    username: data.username,
                    password: data.password,
                };
                //Authenticating the user
                authCtx.login(user);
                localStorage.setItem('jwt', data.token)
                //checking the data we have access to with a console.log
                console.log(user);
                console.log(user.id);
                localStorage.setItem('userId', user.id)
                console.log(user.token)

                //using template literal to display individual user after login
                // history.push(`/profile/${response.data.username}`)
            })
            .catch(error => {
                //403 is the only backend error response possible in this configuration

                //checking error response stats
                console.log(error.response.status);
                //storing it in a variable
                const errorCheck = (error.response.status)
                //setting the error
                if (errorCheck === 403) {
                    setError("Invalid user details entered")
                    setErrorCSS(true)
                }
                setIsLoading(false);
            });

    };

    //Dynamic use of CSS, other styles appear if input is invalid
    const inputClasses = errorCSS
        ? classes.authinvalid
        : classes.auth;

    return (
        <Fragment>
        <section className={inputClasses}>
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='username'>Your Username</label>
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
                        <button className={classes.button}>Login</button>
                    )}
                    {isLoading && <p>Sending request...</p>}
                    {/*Tertiary statement displaying server error back to user*/}
                    {error && <div className={classes.error}> {error} </div>}
                </div>
            </form>
        </section>
            <div className={classes.photo}>
                <img src={laptopgirl} alt="laptopgirl" height={300} width={320}/>
            </div>
        </Fragment>
    );
};

export default LoginForm;