import React, {Fragment, useEffect, useState} from 'react';
import classes from './ProfileForm.module.css';
import ParticipantService from "../../services/ParticipantService";
import machineworker from "../../assets/pexels-karolina-grabowska-6920104.jpg";

function ProfileForm({
                         firstName, setFirstName, lastName, setLastName, email, setEmail,
                         mobileNumber, setMobileNumber, submitHandler,
                     error, errorCSS, id}) {


    //This code forces a reload to obtain participant data
    const reloadCount = Number(sessionStorage.getItem('reloadCount')) || 0;
    useEffect(() => {
        if(reloadCount < 2) {
            sessionStorage.setItem('reloadCount', String(reloadCount + 1));
            window.location.reload();
        } else {
            sessionStorage.removeItem('reloadCount');
        }
    }, []);

    const [participants, setParticipants] = useState([]);

    //Getting existing users in database
    useEffect(() => {
        ParticipantService.getAllParticipants().then((response) => {
            console.log(response.data)
            setParticipants(response.data)
        }).catch(error => {
                console.log(error)
            })
    },[]);

    console.log(firstName)
    console.log(id)

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

    //Dynamic use of CSS, other styles appear if input is invalid
    const inputClasses = errorCSS
        ? classes.invalid
        : classes.base;

    return (
        <Fragment>
            <section className={inputClasses}>
                <div>Welcome!
                    <br/>
                    <br/>
                    Please add some more details to get started</div>
                <br/>
                <br/>
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
                            <button
                                className={classes.button}
                                onClick={(event) => submitHandler(event)}
                            >Submit</button>
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