import React, {Fragment, useEffect, useState} from 'react';
import classes from './ProfileForm.module.css';
import ParticipantService from "../../services/ParticipantService";
import machineworker from "../../assets/pexels-karolina-grabowska-6920104.jpg";
import {useForm} from "react-hook-form";
import useFileUpload from "../../hooks/useFileUpload";
import useAxiosCall from "../../hooks/useAxiosCall";

function ProfileForm({firstName, setFirstName, lastName, setLastName, email, setEmail,
                         mobileNumber, setMobileNumber, submitHandler,
                     error, errorCSS, id, photoURL, setPhotoURL}, item) {

    //Getting existing users in database
    //Using custom hook useAxiosCall to get all the participants from the list
    const { participants, setParticipants } = useAxiosCall ();

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

    console.log(firstName)
    console.log(id)
    console.log(photoURL)

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
    //using react hook form for image upload
    const {register, handleSubmit} = useForm();
    //using the useFileUpload custom hook
    const { obtainPhotoURL, onSubmit, setObtainPhotoURL } = useFileUpload ();
    const URLChangeHandler = (event) => {
        setObtainPhotoURL(obtainPhotoURL);
        setPhotoURL(obtainPhotoURL)
    }

    //Dynamic use of CSS, other styles appear if input is invalid
    const inputClasses = errorCSS
        ? classes.invalid
        : classes.base;
    console.log(photoURL)

    return (
        <Fragment>
            <section className={inputClasses}>
                <div>Welcome!
                    <br/>
                    <br/>
                    Please add some more details to get started
                    <br/>
                    <br/>
                    Please start with adding your photo.
                        Choose file, press submit, then type any key in the next line (FILE URL)
                </div>
                <div className={classes.photo}>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <input type="file" {...register("file")} />
                        <input type="submit" className={classes.submit}/>
                    </form>
                </div>
                <form onSubmit={submitHandler} key={item.id}>
                    <div className={classes.click}>
                        <div className={classes.control}>
                            <label htmlFor='File URL'>File URL</label>
                            <input
                                type="url"
                                placeholder="Click, then type any key to upload"
                                name="url"
                                className="form-control"
                                value={photoURL}
                                onChange={URLChangeHandler}
                            />
                        </div>
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
                        {/*Terniary statement displaying server error back to user*/}
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