import {SIGN_UP_URL} from "../../backend-urls/constants";
import React, {useState, useEffect, Fragment} from 'react';
import {useHistory} from 'react-router-dom';

import classes from './RegistrationForm.module.css';
import RegistrationService from "../../services/RegistrationService";
import laptopguy from "../../assets/pexels-mikhail-nilov-6964367.jpg";

const RegistrationForm = () => {

    //history used for post-submission navigation
    const history = useHistory();

    //Below are added fields from spring security set-up in backend (user class)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    //Constants used for frontend validation
    const [enteredUsernameIsValid, setEnteredUsernameIsValid] = useState(false)
    const [enteredPasswordIsValid, setEnteredPasswordIsValid] = useState(false)
    const [enteredUsernameTouched, setEnteredUsernameTouched] = useState(false)
    const [enteredPasswordTouched] = useState(false)
    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);

    //Constant used for frontend validation
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
    //Renders once upon the state change of the dependent constant - when the component "mounts"
    //Then it unmounts due to the clean-up function, as per the lifecycle logic
    useEffect(()=> {
        if (enteredUsernameIsValid) {
            console.log("enteredUserNameIsValid is true")
        }
        return () => {
            //clean-up
            console.log("We unmounted")
        }
    }, [enteredUsernameIsValid]);

    //This code-block validates password consistency
    const confirmPasswordInputChangeHandler = (event) => {
        setMatchPassword(event.target.value);
    }
    useEffect(() => {
        setValidMatch(password === matchPassword);
    }, [matchPassword, password])

    //Form submission
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
        if (password !== matchPassword  ) {
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
                //requiring a specific format for the password yet.
                //Checking error response stats
                console.log(error.response.status);
                //storing it in a variable
                const errorCheck = (error.response.status)
                //setting the error
                if (errorCheck === 409) {
                    setError("Gebruikersnaam In gebruik, kies een andere gebruikersnaam")
                }
                setIsLoading(false);
            });
    };

    //Validation checks for input validity, post submission
    const usernameInputIsInvalid = !enteredUsernameIsValid && enteredUsernameTouched;
    const passwordInputIsInvalid = !enteredPasswordIsValid && enteredPasswordTouched;

    //Dynamic use of CSS, other styles appear if input is invalid
    const InputClasses = usernameInputIsInvalid || passwordInputIsInvalid
        ? classes.authinvalid
        : classes.auth;

    return (
        <Fragment>
        <section className={InputClasses}>
            <h1>Sign Up</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='username'>Gebruikersnaam</label>
                    <input
                        type="text"
                        placeholder= "Gebruikersnaam"
                        name= "username"
                        className= "form-control"
                        value={username}
                        onChange={usernameInputChangeHandler}
                    />
                    {usernameInputIsInvalid && <p className={classes.error}>Please enter a valid username</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Wachtwoord</label>
                    <input
                        type='password'
                        id='password'
                        placeholder= "Wachtwoord"
                        value={password}
                        onChange={passwordInputChangeHandler}
                    />
                    {passwordInputIsInvalid && <p className={classes.error}>Password needs 8 to 16 characters</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor='confirm password'>Wachtwoord bevestigen</label>
                    <input
                        type='password'
                        id='confirm password'
                        placeholder= "Wachtwoord bevestigen"
                        value={matchPassword}
                        onChange={confirmPasswordInputChangeHandler}
                    />
                    {!validMatch && <p className={classes.error}>Wachtwoorden komen niet overeen</p>}
                </div>
                <div className={classes.actions}>
                    {!isLoading && (
                        <button className={classes.button}>Account aanmaken</button>
                    )}
                    {/*Ternary statements based on frontend validation of username and password*/}
                    {/*and backend validation of password*/}
                    {isLoading && <p>Your inputs are ok!</p>}
                    {error && <div className={classes.error}> {error} </div>}
                </div>
            </form>
        </section>
            <div className={classes.photo}>
                <img src={laptopguy} alt="laptopguy" height={300} width={220}/>
            </div>
        </Fragment>
    );
};

export default RegistrationForm;