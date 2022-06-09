import React, {useContext, useState} from 'react';
import classes from './AvatarForm.module.css';
import ParticipantService from "../../services/ParticipantService";
import {PARTICIPANT_URL} from "../../backend-urls/constants";
import AuthContext from '../../context/auth-context';
import { useHistory } from 'react-router-dom';
import {authHeaders} from "../../store/auth-helper";

//using the destructuring syntax to pull out the props
function DisplayNameForm()  {

    const history = useHistory();

    // const [firstName, setFirstName] = useState({
    //     firstName: '',
    // });
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')

    //Creating the variable that will be used to send data to backend
    const participant = {firstName, lastName, email, mobileNumber}

    const authCtx = useContext(AuthContext);

    //fetches the token from local storage
    const token = localStorage.getItem('jwt');

    const emailInputChangeHandler = (event) => {
        setEmail(event.target.value);
        console.log(email)
    }

    const firstNameInputChangeHandler = (event) => {
        setFirstName(event.target.value);
        console.log(firstName)
    }

    const lastNameInputChangeHandler = (event) => {
        setLastName(event.target.value);
        console.log(lastName)
    }
    const mobileNumberInputChangeHandler = (event) => {
        setMobileNumber(event.target.value);
        console.log(mobileNumber)
    }


    const submitHandler = (e) => {
        e.preventDefault();
        console.log(firstName)
        // Display(firstName);

        //Pick up token from local storage and attach to axios request header
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
        //Send the data to the backend
        ParticipantService.createParticipant(participant, PARTICIPANT_URL, headers)
            .then((response) => {
                const data = response.data;
                const user = {
                    token: data.token,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    mobileNumber: data.mobileNumber,
                };
                authCtx.login(user);
                localStorage.setItem('jwt', data.token)
                console.log(user);
                history.push('/profile');
                console.log(authHeaders)
            })
    };

    return (
        <section className={classes.base}>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    {/*<h2>Please enter your first name</h2>*/}
                    {/*{(error !="") && <div> {error} </div>}*/}
                    {/*<div className={classes.actions}>*/}
                    {/*    <label htmlFor="firstname">Name</label>*/}
                    {/*    <input type="text" name="name" id="name" onChange={event =>*/}
                    {/*        setFirstName({...firstName, firstName: event.target.value})}*/}
                    {/*           value={firstName.firstName}/>*/}
                    {/*</div>*/}
                    <div className={classes.control}>
                        <label htmlFor='first name'>Please enter your first name</label>
                        <input
                            type="text"
                            placeholder= "First Name"
                            name= "firstName"
                            className= "form-control"
                            value={firstName}
                            onChange={firstNameInputChangeHandler}
                        />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='last name'>Please enter your last Name</label>
                        <input
                            type="text"
                            placeholder= "Last Name"
                            name= "last name"
                            className= "form-control"
                            value={lastName}
                            onChange={lastNameInputChangeHandler}
                        />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='email'>Please enter your email address</label>
                        <input
                            type="text"
                            placeholder= "Email"
                            name= "email"
                            className= "form-control"
                            value={email}
                            onChange={emailInputChangeHandler}
                        />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='mobile number'>Please enter your mobile number</label>
                        <input
                            type="text"
                            placeholder= "Mobile Number"
                            name= "mobile number"
                            className= "form-control"
                            value={mobileNumber}
                            onChange={mobileNumberInputChangeHandler}
                        />
                    </div>
                    <div className={classes.actions}>
                            <button>Enter</button>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default DisplayNameForm;