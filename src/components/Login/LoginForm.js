//This form is used to login the user after registration

import React, {useState, useContext, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import classes from './LoginForm.module.css';
import AuthenticationService from "../../services/AuthenticationService";
import {SIGN_IN_URL} from "../../backend-urls/constants";
import laptopgirl from "../../assets/pexels-jopwell-2422286.jpg";

export const LoginForm = () => {

    const history = useHistory();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const user = {username, password}
    console.log(user);

    //Error-handling
    const [error, setError] = useState(null);

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
                    username: data.username,
                    password: data.password,
                };
                //Authenticating the user
                authCtx.login(user);
                localStorage.setItem('jwt', data.token)
                //checking the data we have access to with a console.log
                console.log(user);
                //using template literal to display individual user after login
                history.push(`/profile/${response.data.username}`)
            })
            // .catch((err) => {
            //     alert(err.message);
            // });
            .catch(error => {
                //403 is the only backend error response possible in this configuration

                //checking error response stats
                console.log(error.response.status);
                //storing it in a variable
                const errorCheck = (error.response.status)
                //setting the error
                if (errorCheck === 403) {
                    setError("Invalid user details entered")
                }
                setIsLoading(false);
            });

    };


    return (
        <>
        <section className={classes.auth}>
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
                        <button>Login</button>
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
        </>
    );
};

export default LoginForm;