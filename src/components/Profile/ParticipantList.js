import React, {useEffect, useState} from 'react';
import ParticipantService from "../../services/ParticipantService";
import classes from './ProfileForm.module.css';

const ParticipantList = () => {

    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        ParticipantService.getAllParticipants().then((response) => {
            console.log(response.data)
            setParticipants(response.data);
        }).catch(error => {
            console.log(error)
        }
        )
    }, [])

    return (
        <ul>
            {/*checking that we have "participants", then using the map-method to output the participants*/}
            {participants &&
                participants.map(participant =>
                ( <div className={classes.preview} key={participant.id}>
                    <h3>Name: {participant.firstName} {participant.lastName}</h3>
                    <h4>Email: {participant.email} / Phone: {participant.mobileNumber}</h4>
                </div>))}
        </ul>
    );
};

export default ParticipantList;