import React, {useEffect, useState} from 'react';
import ParticipantService from "../../services/ParticipantService";
import classes from './ProfileForm.module.css';
import useFileUpload from "../../hooks/useFileUpload";
import useAxiosCall from "../../hooks/useAxiosCall";

const ParticipantList = () => {

    //Using custom hook useAxiosCall to get all the participants from the list
    const { participants, setParticipants } = useAxiosCall ();

    return (
        <ul>
            {/*checking that we have "participants", then using the map-method to output the participants*/}
            {participants &&
                participants.map(participant =>
                ( <div className={classes.preview} key={participant.id}>
                    <h3>Name: {participant.firstName} {participant.lastName}</h3>
                    <h4>Email: {participant.email} / Phone: {participant.mobileNumber} </h4>
                    <div className={classes.photo}>
                        <img src={participant.photoURL} height={150} width={145}/>
                    </div>
                </div>))}
        </ul>
    );
};

export default ParticipantList;