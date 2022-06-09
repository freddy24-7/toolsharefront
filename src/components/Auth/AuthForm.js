//This form is used to login the user after registration

import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import classes from './AuthForm.module.css';
import AuthenticationService from "../../services/AuthenticationService";
import {SIGN_IN_URL} from "../../backend-urls/constants";
import {authHeaders} from "../../store/auth-helper";

export const AuthForm = ( {Login, error }) => {

    const history = useHistory();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const user = {username, password}
    console.log(user);

    const authCtx = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    const usernameInputChangeHandler = (event) => {
        setUsername(event.target.value);
        console.log(username)
    }
    const passwordInputChangeHandler = (event) => {
        setPassword(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        setIsLoading(true);
        AuthenticationService.login(user, SIGN_IN_URL)
            .then((response) => {
                const data = response.data;
                const user = {
                    token: data.token,
                    username: data.username,
                    password: data.password,
                };
                authCtx.login(user);
                localStorage.setItem('jwt', data.token)
                console.log(user);
                history.push('/profile');
                console.log(authHeaders)
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    return (
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
                </div>
            </form>
        </section>
    );
};

export default AuthForm;