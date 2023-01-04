//custom-hook to get all participants
import React, {useEffect, useState} from 'react';
import ParticipantService from "../services/ParticipantService";

const UseAxiosCall = () => {

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
    return { participants, setParticipants }
};

export default UseAxiosCall;