import React, {Fragment, useEffect} from 'react';
import classes from './ProfileForm.module.css';
import machineworker from "../../assets/pexels-karolina-grabowska-6920104.jpg";
import {useForm} from "react-hook-form";
import useFileUpload from "../../hooks/useFileUpload";

function ProfileForm({firstName, setFirstName, lastName, setLastName, email, setEmail,
                         mobileNumber, setMobileNumber, submitHandler,
                         error, errorCSS, id, photoURL, setPhotoURL, postcode, setPostcode}, item) {

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
    const postcodeInputChangeHandler = (event) => {
        setPostcode(event.target.value);
        console.log(postcode)
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
                <div>Welkom!
                    <br/>
                    <br/>
                    Voeg wat meer details toe om aan de slag te gaan
                    <br/>
                    <br/>
                    Begin met het toevoegen van een foto van jezelf.
                    Kies een foto om te uploaden en druk vervolgens op de "verzenden"-knop,
                    en typ daarna een willekeurige letter in het volgend veld met het label "Photo URL".
                    Het toevoegen van een foto is verplicht.
                    <br/>
                    <br/>
                    jpg-, jpeg-, and png-files worden geaccepteerd.
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
                            <label htmlFor='File URL'>Photo URL</label>
                            <input
                                type="url"
                                placeholder="Typ op het toetsenbord om te uploaden"
                                name="url"
                                className="form-control"
                                value={photoURL}
                                onChange={URLChangeHandler}
                            />
                        </div>
                        <div className={classes.control}>
                            <label htmlFor='first name'>Aub uw voornaam invullen</label>
                            <input
                                type="text"
                                placeholder="Voornaam"
                                name="firstName"
                                className="form-control"
                                value={firstName}
                                onChange={firstNameInputChangeHandler}
                            />
                        </div>
                        <div className={classes.control}>
                            <label htmlFor='last name'>Aub uw achternaam invullen</label>
                            <input
                                type="text"
                                placeholder="Achternaam"
                                name="last name"
                                className="form-control"
                                value={lastName}
                                onChange={lastNameInputChangeHandler}
                            />
                        </div>
                        <div className={classes.control}>
                            <label htmlFor='postcode'>Aub uw postcode invullen</label>
                            <input
                                type="text"
                                placeholder="Postcode"
                                name="postcode"
                                className="form-control"
                                value={postcode}
                                onChange={postcodeInputChangeHandler}
                            />
                        </div>
                        <div className={classes.control}>
                            <label htmlFor='email'>Aub uw email-adres invullen</label>
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
                            <label htmlFor='mobile number'>Uw mobiele telefoon</label>
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