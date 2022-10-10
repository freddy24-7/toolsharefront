import React, {Fragment, useEffect, useState} from 'react';
import classes from './ProfileForm.module.css';
import {useHistory, useParams} from "react-router-dom";
import leafblower from "../../assets/pexels-pixabay-162564.jpg";

import {PARTICIPANT_URL} from "../../backend-urls/constants";
import axios from 'axios';

//specifying back-end URL
const apiURL = PARTICIPANT_URL;

//Obtaining token from local storage to access resource
//Key is specified in LoginForm.js and needs to be consistent
const initialToken = localStorage.getItem('jwt');
console.log(initialToken)

//Here we will use route parameters to access individual participants
//Using "useParams", with "id" as key. Matches the ":id" key from the app component
//Displays the username back to the user in the welcome message to the user

const IndividualDetails = ( {error, errorCSS, editS, setEditS, handleDelete, formS} ) => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')

    const participant = {firstName, lastName, email, mobileNumber}

    const {id} = useParams()

    const history = useHistory();
    console.log(id)
    const participantId = id;
    console.log(participantId)

    //axios edit call credentials
    const editAxios = axios.put(apiURL + '/' + id, {firstName, lastName, email, mobileNumber}, {
        headers: {
            'Content-Type': 'application/json',
        },
        'credentials': 'include'
    })

    //axios get by id call
    const getAxios = axios.get(apiURL + '/' + id, {
        headers: {
            'Content-Type': 'application/json',
        },
        'credentials': 'include'
    })

    //axios edit call
    const UpdateParticipant = async (event) => {
        event.preventDefault();

        //use query params to construct the URL
        console.log(participant)
        console.log(participantId)
        if (participantId) {
            try {
                editAxios
                    .then((response) => {
                        console.log(response)
                        history.push(`/participant/${response.data.id}`)
                        setEditS(true)
                    }).catch(error => {
                    console.log(error)
                    console.log(error.response.data)

                })
            } finally {
                console.log('finally')
            }
        }
    }

    //Runs once, to give the existing data that can be updated
    useEffect(() => {
        getAxios
            .then((response) => {
                console.log(response)
                setFirstName(response.data.firstName)
                setLastName(response.data.lastName)
                setEmail(response.data.email)
                setMobileNumber(response.data.mobileNumber)
            } ).catch(error => {
                console.log(error)
                console.log(error.response.data)
            } )
        } , [])

    //Dynamic use of CSS, other styles appear if input is invalid
    const inputClasses = errorCSS
        ? classes.invalid
        : classes.base;

    //Launches whenever there is a change in the edit input, given the dependency array
    //These two useEffects persists the changes made in the input
    useEffect(()=> {
        const data = localStorage.getItem('detailsEdited');
        if (data) {
            setEditS((data))
        }
    },[setEditS]);
    useEffect(() => {
        localStorage.setItem('detailsEdited', JSON.stringify(editS));
    });

    const deleteParticipant = (event) => {
        handleDelete(event);
    }

    return (
        <Fragment>
            <section className={inputClasses}>
                <div>
                    <p>Change details here:</p>
                    <br/>
                    <br/>
                    <p>Here you can change your details if you wish</p>
                    <p>Earlier entered details are displayed</p>
                </div>
                <br/>
                <br/>
                <form >
                    <div className={classes.control}>
                        <div className={classes.control}>
                            <label htmlFor='first name'>Please enter your first name</label>
                            <input
                                type="text"
                                placeholder={firstName}
                                name="firstName"
                                className="form-control"
                                value={firstName}
                                onChange={(event) => setFirstName(event.target.value)}
                            />
                        </div>
                        <div className={classes.control}>
                            <label htmlFor='last name'>Please enter your last Name</label>
                            <input
                                type="text"
                                placeholder={lastName}
                                name="last name"
                                className="form-control"
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value)}
                            />
                        </div>
                        <div className={classes.control}>
                            <label htmlFor='email'>Please enter your email address</label>
                            <input
                                type="text"
                                placeholder={email}
                                name="email"
                                className="form-control"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className={classes.control}>
                            <label htmlFor='mobile number'>Please enter your mobile number</label>
                            <input
                                type="text"
                                placeholder={mobileNumber}
                                name="mobile number"
                                className="form-control"
                                value={mobileNumber}
                                onChange={(event) => setMobileNumber(event.target.value)}
                            />
                        </div>
                        <div className={classes.actions}>
                            <button
                                onClick={(event) => UpdateParticipant(event)}
                            >Submit</button>
                        </div>
                        {/*Tertiary statement displaying server error back to user*/}
                        {error && <div className={classes.error}> {error} </div>}
                    </div>
                </form>
                <br/>
                <br/>
                <p className={classes.warning}>DANGER ZONE</p>
                <p>Do you wish to delete your records?</p>
                <p>You will no longer be able to trade</p>
                <button onClick={(event) => deleteParticipant(event)}
                >Delete all my records</button>
            </section>
        <div className={classes.photo}>
            <img src={leafblower} alt="leafblower" height={600} width={580}/>
        </div>
        </Fragment>
    );
};

export default IndividualDetails;