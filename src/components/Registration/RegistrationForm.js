import {SIGN_UP_URL} from "../../backend-urls/constants";
import {useState, useEffect} from 'react';
import { useHistory} from 'react-router-dom';

import classes from './RegistrationForm.module.css';
import RegistrationService from "../../services/RegistrationService";

const RegistrationForm = () => {

    const history = useHistory();
    //Below are added fields from spring security set-up in backend (user class)
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    //Constants used for frontend validation
    const [enteredNameIsValid, setEnteredNameIsValid] = useState(false)
    const [enteredUsernameIsValid, setEnteredUsernameIsValid] = useState(false)
    const [enteredPasswordIsValid, setEnteredPasswordIsValid] = useState(false)
    const [enteredNameTouched, setEnteredNameTouched] = useState(false)
    const [enteredUsernameTouched, setEnteredUsernameTouched] = useState(false)
    const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false)

    //Creating the variable that will be used to send data to backend / Spring Security
    const user = {name, username, password}
    console.log(user);

    //Variables used for the form submission
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    //Change handlers for submission field below
    const nameInputChangeHandler = (event) => {
        setName(event.target.value);
    }
    const usernameInputChangeHandler = (event) => {
        setUsername(event.target.value);
    }
    const passwordInputChangeHandler = (event) => {
        setPassword(event.target.value);
    }

    //This handler toggles between registration and log-in
    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    //For validation purposes
    useEffect(()=> {
        if (enteredNameIsValid) {
            console.log("enteredNameIsValid is true")
        }
    }, [enteredNameIsValid]);


    //Forms
    const submitHandler = (event) => {
        event.preventDefault();

        //Upon submission
        setEnteredNameTouched(true)
        setEnteredUsernameTouched(true)
        setEnteredPasswordTouched(true)

        //Validation checks for length of name, username, and password
        if (name.trim() === '') {
            setEnteredNameIsValid(false);
            return;
        }
        setEnteredNameIsValid(true)
        console.log(name);

        if (username.trim() === '') {
            setEnteredUsernameIsValid(false);
            return;
        }
        setEnteredUsernameIsValid(true)
        console.log(username);

        if (password.length < 8 || password.length > 16) {
            setEnteredPasswordIsValid(false);
            return;
        }
        setEnteredPasswordIsValid(true);
        console.log(password);

        setIsLoading(true);
        let url = SIGN_UP_URL;
        RegistrationService.register(user, url)
            .then(response => {
                console.log(response);
                history.push('/login');
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            });
    };

    //Validation checks for input validity, post submission
    const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
    const usernameInputIsInvalid = !enteredUsernameIsValid && enteredUsernameTouched;
    const passwordInputIsInvalid = !enteredPasswordIsValid && enteredPasswordTouched;

    //Dynamic use of CSS, other styles appear if input is invalid
    const InputClasses = nameInputIsInvalid || usernameInputIsInvalid || passwordInputIsInvalid
        ? classes.authinvalid
        : classes.auth;

    return (
        <section className={InputClasses}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='name'>Full Name</label>
                    <input
                        type="text"
                        placeholder= "Enter full name"
                        name= "fullName"
                        className= "form-control"
                        value={name}
                        onChange={nameInputChangeHandler}
                    />
                    {nameInputIsInvalid && <p className={classes.error}>Please enter a valid name</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor='username'>Username</label>
                    <input
                        type="text"
                        placeholder= "Enter username"
                        name= "username"
                        className= "form-control"
                        value={username}
                        onChange={usernameInputChangeHandler}
                    />
                    {usernameInputIsInvalid && <p className={classes.error}>Please enter a valid username</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        placeholder= "Enter password"
                        value={password}
                        onChange={passwordInputChangeHandler}
                    />
                    {passwordInputIsInvalid && <p className={classes.error}>Password needs 8 to 16 characters</p>}
                </div>
                <div className={classes.actions}>
                    {!isLoading && (
                        <button>{isLogin ? 'Login' : 'Create Account'}</button>
                    )}
                    {isLoading && <p>Your inputs are ok!</p>}
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

export default RegistrationForm;