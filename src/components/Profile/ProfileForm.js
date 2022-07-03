import React, {Fragment, useEffect, useState} from 'react';
import classes from './ProfileForm.module.css';
import {useHistory, useParams} from 'react-router-dom';
import ParticipantService from "../../services/ParticipantService";
import machineworker from "../../assets/pexels-karolina-grabowska-6920104.jpg";
import Layout from "../Layout/Layout";
import LoginForm from "../Login/LoginForm";

function ProfileForm({ setUserDetailsClicked }) {

    //History hook is used later to navigate the user to the following component
    const history = useHistory();
    const { id } = useParams()

    //Defining the variables
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')


    //Creating the variable that will be used to send data to backend
    const participant = {firstName, lastName, email, mobileNumber}

    //Error-handling
    const [error, setError] = useState(null);
    //Constant for dynamic CSS display
    const [errorCSS, setErrorCSS] = useState(false);

    const [form, setForm] = useState(false);




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
    const submitHandler = (event) => {
        event.preventDefault();

        // if (id) {
        //     ParticipantService.updateParticipant(id, participant)
        //         .then((response) => {
        //             //Checking in console what data we obtain
        //             console.log(response.data)
        //             setUserDetailsClicked(false)
        //             history.push(`/participant/${response.data.firstName}`)
        //             // UpdateTable()
        //         }).catch(error => {
        //         console.log(error)
        //     })

            ParticipantService.saveParticipant(participant)
                .then((response) => {

                    //Checking in console what data we obtain
                    console.log(response.data)
                    console.log(response.data.id)
                    const id = (response.data.id)
                    const firstName = (response.data.firstName)
                    const lastName = (response.data.lastName)
                    const email = (response.data.email)
                    const mobileNumber = (response.data.mobileNumber)
                    console.log(id)
                    // setForm(true)
                    console.log(firstName)
                    console.log(lastName)
                    console.log(email)
                    console.log(mobileNumber)

                    //Closing the form through props received from Layout
                    // setUserDetailsClicked(false)

                    //we have access to firstName and we pass that on with a string literal:
                    history.push(`/participant/${response.data.firstName}`)
                    setUserDetailsClicked(false)
                    setForm(true)

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
                            "Please check that your email address is valid and that your mobile number" +
                            " has ten digits. Name sections also need to be filled out.")
                        setErrorCSS(true)
                    }

                }
            );
        // const submissionControl = () => {
        //     setFormSubmitted(true)
        // }
    }
    // }
    //Dynamic use of CSS, other styles appear if input is invalid
    const inputClasses = errorCSS
        ? classes.invalid
        : classes.base;

    // useEffect(() => {
    //
    //     ParticipantService.getParticipantById(id)
    //         .then((response) =>{
    //             console.log(response)
    //             setFirstName(response.data.firstName)
    //             setLastName(response.data.lastName)
    //             setEmail(response.data.email)
    //             setMobileNumber(response.data.mobileNumber)
    //     }).catch(error => {
    //         console.log(error)
    //     })
    // },[])
    //
    // const Title = () => {
    //
    //     if (id) {
    //         return <h2 className={classes.control}> Update your details</h2>
    //     } else{
    //         return <h2 className={classes.control}> Add details </h2>
    //     }
    // }



    return (
    <Fragment>
        <LoginForm
            id={id}
        />
        <Layout
            form={form}
        />
            <section className={inputClasses}>
                <div>Welcome {id}</div>
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
                            <button onClick={(event) => submitHandler(event)}>Submit</button>
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