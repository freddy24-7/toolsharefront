import React, {Fragment} from 'react';
import {PARTICIPANT_URL} from "../../backend-urls/constants";
import axios from "axios";
import {useHistory, useParams} from "react-router-dom";
import classes from './ProfileForm.module.css';
import goodbye from "../../assets/pexels-polina-kovaleva-6265892.jpg";


//specifying back-end URL
const apiURL = PARTICIPANT_URL;

//Obtaining token from local storage to access resource
//Key is specified in LoginForm.js and needs to be consistent
const initialToken = localStorage.getItem('jwt');
console.log(initialToken)

const ConfirmDeleteParticipant = () => {

    const {id} = useParams()

    console.log(id)
    const participantId = id;
    console.log(participantId)

    //axios delete call
    const deleteAxios = axios.delete(apiURL + '/' + id, {
        headers: {
            Authorization: `Bearer ${initialToken}`,
            'Content-Type': 'application/json',
        },
        'credentials': 'include'

    });

    return (
        <Fragment>
        <div>
            <p className={classes.base}>
                You have been deleted
            </p>
        </div>
            <div className={classes.photo}>
                <img src={goodbye} alt="goodbye" height={600} width={580}/>
            </div>
        </Fragment>

    );
};

export default ConfirmDeleteParticipant;