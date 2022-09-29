import React, {useCallback, useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import classes from "./ProfileForm.module.css";
import laptopworker from "../../assets/pexels-andrea-piacquadio-761993.jpg";
import { useForm } from "react-hook-form";
import useFileUpload from "../../hooks/useFileUpload";
import axios from "axios";
import {PARTICIPANT_URL} from "../../backend-urls/constants";

//specifying back-end URL
const apiURL = PARTICIPANT_URL;

//Obtaining token from local storage to access resource
//Key is specified in LoginForm.js and needs to be consistent
const initialToken = localStorage.getItem('jwt');
console.log(initialToken)

//Here we will use route parameters to access individual participants
//Using "useParams", with "id" as key. Matches the ":id" key from the app component
//Displays the username back to the user in the welcome message to the user

const ConfirmationScreen = () => {

    const {id} = useParams();

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [photoURL, setPhotoURL] = useState('')

    const participant = {firstName, lastName, email, mobileNumber, photoURL}

    console.log(id)
    const participantId = id;
    console.log(participantId)

    //axios get by id call to get the specific user by id
    const getAxios = axios.get(apiURL + '/' + id, {
        headers: {
            'Content-Type': 'application/json',
        },
        'credentials': 'include'
    })
    useEffect(() => {
        getAxios
            .then((response) => {
                console.log(response)
                setFirstName(response.data.firstName)
                setLastName(response.data.lastName)
                setEmail(response.data.email)
                setMobileNumber(response.data.mobileNumber)
                setPhotoURL(response.data.photoURL)
            } ).catch(error => {
            console.log(error)
            console.log(error.response.data)
        } )
    })

    //Persist photo to display to user on refresh
    useEffect(()=> {
        const data = localStorage.getItem('photo');
        if (data) {
            setPhotoURL(JSON.parse(data))
        }
    },[]);

    useEffect(() => {
        localStorage.setItem("photo", JSON.stringify(photoURL));
    });

    // conditional render: if there is a photoURL, the photo is displayed
    //alternatively, a default photo is displayed
    if (photoURL) {

        return (
            <>
                <section className={classes.base} >
                    <div className={classes.control}>
                        <p className={classes.success}>Ready to go {firstName}!</p>
                        <br/>
                        <br/>
                        <p>Klik op een link om te beginnen. </p>
                    </div>
                </section>
                <div className={classes.photo}>
                    <img src={photoURL} height={600} width={580}/>
                </div>
            </>
        );
    } else {

        return (
        <>
            <section className={classes.base} >
                <div className={classes.control}>
                    <p className={classes.success}>Ready to go {firstName}!</p>
                    <br/>
                    <br/>
                    <p>Klik op een link om te beginnen. </p>
                </div>
            </section>
            <div className={classes.photo}>
                <img src={laptopworker} alt="laptopworker" height={600} width={580}/>
            </div>
        </>
    );
    }
};


export default ConfirmationScreen;