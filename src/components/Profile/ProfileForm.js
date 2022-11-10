import React, {Fragment, useEffect} from 'react';
import classes from './ProfileForm.module.css';
import machineworker from "../../assets/pexels-karolina-grabowska-6920104.jpg";
import {useForm} from "react-hook-form";
import useFileUpload from "../../hooks/useFileUpload";

function ProfileForm({firstName, setFirstName, lastName, setLastName, email, setEmail,
                         mobileNumber, setMobileNumber, submitHandler,
                         error, errorCSS, id, photoURL, setPhotoURL}, item) {

    //This code-block forces a reload post submission, to ensure the behaviour we want
    const reloadCount = Number(sessionStorage.getItem('reloadCount')) || 0;
    useEffect(() => {
        if(reloadCount < 2) {
            sessionStorage.setItem('reloadCount', String(reloadCount + 1));
            window.location.reload();
        } else {
            sessionStorage.removeItem('reloadCount');
        }
        //Webstorm wants that "reloadCount" is to be added as dependency here.
        //However, this is not done as that creates infinite loop.
        //This code should also only run once, does not removing dependency array
    }, []);

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

    //using react hook form for image upload (inbuilt react hook)
    const {register, handleSubmit} = useForm();
    //using the useFileUpload custom hook
    const { obtainPhotoURL, onSubmit, setObtainPhotoURL } = useFileUpload ();
    const URLChangeHandler = () => {
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
                    Please start with adding a photo of yourself.
                    Choose a photo to upload, then press the "pink" submit button,
                    and thereafter type any key in the next line labelled "FILE URL".
                    Adding a photo is not mandatory.
                    <br/>
                    <br/>
                    jpg-, jpeg-, and png-files are accepted.
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
                                placeholder="Type any key to upload"
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