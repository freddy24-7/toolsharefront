import React, {useEffect, useState} from 'react';
import classes from "./Item.module.css";
import {useParams} from "react-router-dom";
import axios from "axios";

import {PARTICIPANT_URL} from "../../backend-urls/constants";

//specifying back-end URL
const apiURL = PARTICIPANT_URL;

//Obtaining token from local storage to access resource
//Key is specified in LoginForm.js and needs to be consistent
const initialToken = localStorage.getItem('jwt');
console.log(initialToken)

const ViewItemOwnerDetails = () => {

    const {ownerId} = useParams()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [photoURL, setPhotoURL] = useState('')

    const participant = {firstName, lastName, email, mobileNumber, photoURL}

    //axios get by id call backend and credentials, using axios
    const getAxios = axios.get(apiURL + '/' + ownerId, {
        headers: {
            'Content-Type': 'application/json',
        },
        'credentials': 'include'
    })

    //Runs once, to give the existing data that can be updated
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
    } , [])


    return (
        <section>
            {/*<div className={classes.photo}>*/}
            {/*    <img src={photoURL} height={300} width={290}/>*/}
            {/*</div>*/}
            <section className={classes.base} >
                <div className={classes.control}>
                    <p className={classes.success}>The owner is {firstName +" "+ lastName}, who can be contacted at
                        mobile/whatsapp on</p>
                    <p>{mobileNumber}.</p>
                    <div className={classes.photo}>
                        <img src={photoURL} height={300} width={290}/>
                    </div>
                    <p>An email can also be sent to {email}</p>
                </div>
            </section>

        </section>
    );
};

export default ViewItemOwnerDetails;