//Validation can be further strengthened for this component.
//It now blocks a blank username, and it controls password consistency
//It does not set requirements for password length or character types
//Backend validation is done, so that one cannot register a user that already exists in the database
//Dynamic use of CSS implemented for blank username submission attempts

import {SIGN_UP_URL} from "../../backend-urls/constants";
import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import classes from './RegistrationForm.module.css';
import RegistrationService from "../../services/RegistrationService";
import laptopguy from "../../assets/pexels-mikhail-nilov-6964367.jpg";

const RegistrationForm = () => {

    const history = useHistory();
    //Below are added fields from spring security set-up in backend (user class)
    // const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    //Constants used for frontend validation
    // const [enteredNameIsValid, setEnteredNameIsValid] = useState(false)
    const [enteredUsernameIsValid, setEnteredUsernameIsValid] = useState(false)
    const [enteredPasswordIsValid, setEnteredPasswordIsValid] = useState(false)
    // const [enteredNameTouched, setEnteredNameTouched] = useState(false)
    const [enteredUsernameTouched, setEnteredUsernameTouched] = useState(false)
    const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false)

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [error, setError] = useState(null);

    //Creating the variable that will be used to send data to backend / Spring Security
    const user = {username, password}
    console.log(user);

    //Variables used for the form submission
    const [isLoading, setIsLoading] = useState(false);

    //Change handlers for submission field below
    const usernameInputChangeHandler = (event) => {
        setUsername(event.target.value);
    }
    const passwordInputChangeHandler = (event) => {
        setPassword(event.target.value);
    }

    //For validation purposes
    useEffect(()=> {
        if (enteredUsernameIsValid) {
            console.log("enteredUserNameIsValid is true")
        }
    }, [enteredUsernameIsValid]);

    const confirmPasswordInputChangeHandler = (event) => {
        setMatchPassword(event.target.value);
    }

    useEffect(() => {
        setValidMatch(password === matchPassword);
    }, [matchPassword])


    //Forms
    const submitHandler = (event) => {
        event.preventDefault();

        //Upon submission
        setEnteredUsernameTouched(true)

        //Validation checks for length of name, username, and password
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

        if (password != matchPassword  ) {
            setValidMatch(false);
            return;
        }
        setValidMatch(true);
        console.log("passwords match");

        setIsLoading(true);

        //Axios call, pushing the user to the login-page or handling errors
        //useHistory use to redirect the user to the login-page
        RegistrationService.register(user, SIGN_UP_URL)
            .then(response => {
                console.log(response);
                history.push('/login')
            })
            .catch(error => {
                //409 for username is the only backend error response for now as we are not
                //requiring a specific format for the password yet

                //checking error response stats
                console.log(error.response.status);
                //storing it in a variable
                const errorCheck = (error.response.status)
                //setting the error
                if (errorCheck === 409) {
                    setError("Username Taken, please choose a different username")
                }
                setIsLoading(false);
            });
    };

    //Validation checks for input validity, post submission
    // const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
    const usernameInputIsInvalid = !enteredUsernameIsValid && enteredUsernameTouched;
    const passwordInputIsInvalid = !enteredPasswordIsValid && enteredPasswordTouched;

    //Dynamic use of CSS, other styles appear if input is invalid
    const InputClasses = usernameInputIsInvalid || passwordInputIsInvalid
        ? classes.authinvalid
        : classes.auth;

    return (
        <>
        <section className={InputClasses}>
            <h1>Sign Up</h1>
            <form onSubmit={submitHandler}>
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
                <div className={classes.control}>
                    <label htmlFor='confirm password'>Confirm Password</label>
                    <input
                        type='password'
                        id='confirm password'
                        placeholder= "Confirm password"
                        value={matchPassword}
                        onChange={confirmPasswordInputChangeHandler}
                    />
                    {!validMatch && <p className={classes.error}>Passwords don't match</p>}
                </div>
                <div className={classes.actions}>
                    {!isLoading && (
                        <button>Create Account</button>
                    )}
                    {/*Tertiary statements based on frontend validation of username and password*/}
                    {/*and backend validation of password*/}
                    {isLoading && <p>Your inputs are ok!</p>}
                    {error && <div className={classes.error}> {error} </div>}
                </div>
            </form>
        </section>
            <div className={classes.photo}>
                <img src={laptopguy} alt="laptopguy" height={300} width={220}/>
            </div>
        </>


    );
};

export default RegistrationForm;