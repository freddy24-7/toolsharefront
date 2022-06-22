import React, {useState} from 'react';
import classes from './ProfileForm.module.css';
import {useHistory} from 'react-router-dom';
import ParticipantService from "../../services/ParticipantService";

function DisplayNameForm() {

    //History hook is used later to navigate the user to the following component
    const history = useHistory();

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')

    //Creating the variable that will be used to send data to backend
    const participant = {firstName, lastName, email, mobileNumber}

    //This code is made to simply the JSX in the return statement
    const firstNameInputChangeHandler = (event) => {
        setFirstName(event.target.value);
        console.log(firstName)
    }
    const lastNameInputChangeHandler = (event) => {
        setLastName(event.target.value);
        console.log(lastName)
    }
    const emailInputChangeHandler = (event) => {
        setEmail(event.target.value);
        console.log(email)
    }
    const mobileNumberInputChangeHandler = (event) => {
        setMobileNumber(event.target.value);
        console.log(mobileNumber)
    }

    //Below is the axios call to the participant class in backend
    const submitHandler = (e) => {
        e.preventDefault();

        ParticipantService.saveParticipant(participant)
            .then((response) => {

                //Checking in console what data we obtain
                console.log(response.data)

                history.push('/login')

                }).catch(error => {
                console.log(error)
            });

    }

    return (
        // Using fragment
        <>
            {/*Here you can insert text*/}
            <section className={classes.base}>
                <form onSubmit={submitHandler}>
                    <div className={classes.control}>
                        <div className={classes.control}>
                            <label htmlFor='first name'>Please enter your first name</label>
                            <input
                                type="text"
                                placeholder="First Name"
                                name="firstName"
                                className="form-control"
                                value={firstName}
                                onChange={firstNameInputChangeHandler}
                            />
                        </div>
                        <div className={classes.control}>
                            <label htmlFor='last name'>Please enter your last Name</label>
                            <input
                                type="text"
                                placeholder="Last Name"
                                name="last name"
                                className="form-control"
                                value={lastName}
                                onChange={lastNameInputChangeHandler}
                            />
                        </div>
                        <div className={classes.control}>
                            <label htmlFor='email'>Please enter your email address</label>
                            <input
                                type="text"
                                placeholder="Email"
                                name="email"
                                className="form-control"
                                value={email}
                                onChange={emailInputChangeHandler}
                            />
                        </div>
                        <div className={classes.control}>
                            <label htmlFor='mobile number'>Please enter your mobile number</label>
                            <input
                                type="text"
                                placeholder="Mobile Number"
                                name="mobile number"
                                className="form-control"
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
        </>
        );

}
export default DisplayNameForm;