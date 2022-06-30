import React, {Fragment, useState} from 'react';
import classes from './ProfileForm.module.css';
import {useHistory} from 'react-router-dom';
import ParticipantService from "../../services/ParticipantService";
import machineworker from "../../assets/pexels-karolina-grabowska-6920104.jpg";

function ProfileForm({ setUserDetailsClicked }) {

    //History hook is used later to navigate the user to the following component
    const history = useHistory();

    //Defining the variables
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')

    //Creating the variable that will be used to send data to backend
    const participant = {firstName, lastName, email, mobileNumber}

    //Error-handling
    const [error, setError] = useState(null);

    //This code section is made to simplify the JSX in the return statement
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

                //Closing the form through props received from Layout
                setUserDetailsClicked(false)
                //we have access to firstName and we pass that on with a string literal:
                history.push(`/participant/${response.data.firstName}`)

                // }).catch(error => {
                // console.log(error)
            }).catch(error => {
                //500 is the only backend error response possible in this configuration

                //checking error response stats
                console.log(error.response.status);
                //storing it in a variable
                const errorCheck = (error.response.status)
                //setting the error
                if (errorCheck === 500) {
                    setError("Invalid user details entered. " +
                        "Please check that your email address has an @-sign and that your mobile number" +
                        " has ten digits. Name sections also need to be filled out.")
                }
            }
        )
        ;

    }


    return (
    // Using fragment
    <Fragment>
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
                            <button>Submit</button>
                        </div>
                        {/*Tertiary statement displaying server error back to user*/}
                        {error && <div className={classes.error}> {error} </div>}
                    </div>
                </form>
            </section>
        <div className={classes.photo}>
            <img src={machineworker} alt="machineworker" height={300} width={300}/>
        </div>

    </Fragment>
        );

}
export default ProfileForm;