import React, {Fragment} from 'react';
import {PARTICIPANT_URL} from "../../backend-urls/constants";
import axios from "axios";
import { useParams } from "react-router-dom";
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

    // axios delete call, deletes participant but user details remain
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
                Je bent verwijderd. Indien gewenst kunt u opnieuw inloggen met uw gebruikersreferenties en
                nieuwe deelnemersgegevens aanmaken. Of begin helemaal opnieuw en registreer u als nieuwe gebruiker.
            </p>
        </div>
            <div className={classes.photo}>
                <img src={goodbye} alt="goodbye" height={600} width={580}/>
            </div>
        </Fragment>

    );
};

export default ConfirmDeleteParticipant;