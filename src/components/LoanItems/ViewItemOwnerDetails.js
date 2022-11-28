import React, {useEffect, useState} from 'react';
import classes from "./Qr.module.css";
import {useParams} from "react-router-dom";
import axios from "axios";

import {PARTICIPANT_URL} from "../../backend-urls/constants";
import QRCode from "react-qr-code";
import {WHATSAPP_API} from "../../backend-urls/constants";

import { SkeletonText } from '@chakra-ui/react';
import { useJsApiLoader } from '@react-google-maps/api';
import ParticipantService from "../../services/ParticipantService";
import useAxiosCall from "../../hooks/useAxiosCall";

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
    const [postcode, setPostcode] = useState('')
    const [photoURL, setPhotoURL] = useState('')

    //userId variable
    const [idValue, setIdValue] = useState([]);

    //Below block obtains the stored userid
    const [currentLoggedInId, setCurrentLoggedInId] = useState(() => {
        // getting stored value
        const currentId = localStorage.getItem("userId");
        setIdValue(JSON.parse(currentId));
    });

    const participant = {firstName, lastName, email, mobileNumber, postcode, photoURL}

    //axios get by id call backend and credentials, using axios
    const getAxios = axios.get(apiURL + '/' + ownerId, {
        headers: {
            'Content-Type': 'application/json',
        },
        'credentials': 'include'
    })

    //Using custom hook useAxiosCall to get all the participants from the list
    // const {participants, setParticipants} = useAxiosCall();

    //Using the below code-block to find the participant-id. Cannot use useParams for that here as
    //use-Param is already managing a different id-variable
    useEffect(() => {
        ParticipantService.getAllParticipants().then((response) => {
            console.log(response.data)
            // setParticipants(response.data);
            const participants = response.data;
            console.log(participants);
            console.log(idValue)
            for (let i = 0; i < participants.length; i++)
                if (participants[i].user.id == idValue) {
                    console.log("exists")
                    console.log(participants[i])
                    const currentLoggedInParticipant = participants[i]
                    console.log(currentLoggedInParticipant.id);
                    const currentLoggedInParticipantId = currentLoggedInParticipant.id;
                    console.log(currentLoggedInParticipantId)
                    // setId(currentLoggedInParticipantId);
                } else {
                    console.log("this user is not a participant yet")
                }
        }).catch(error => {
            console.log(error)
        })

    },[]);

    //Runs once, to give the existing owner-data that can be updated
    useEffect(() => {
        getAxios
            .then((response) => {
                console.log(response)
                setFirstName(response.data.firstName)
                setLastName(response.data.lastName)
                setEmail(response.data.email)
                setMobileNumber(response.data.mobileNumber)
                setPostcode(response.data.postcode)
                setPhotoURL(response.data.photoURL)
            } ).catch(error => {
            console.log(error)
            console.log(error.response.data)
        } )
    } , [])

    const [qr, setQr] = useState('')

    console.log(mobileNumber)
    const mobileWithoutFirstZero = mobileNumber.slice(1)
    console.log(mobileWithoutFirstZero)
    const whatsAppAPIAndNumber = WHATSAPP_API + mobileWithoutFirstZero;
    console.log(whatsAppAPIAndNumber)

    useEffect(()=> {
        setQr(whatsAppAPIAndNumber)
    },[])
    console.log(qr)

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ['places'],
    })

    if (!isLoaded) {
        return <SkeletonText />
    }

    let origin = '3543HZ';
    let destination = '3451SX';

    let service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
        {
            origins: [origin],
            destinations: [destination],
            travelMode: 'BICYCLING',
        }, callback);

    function callback(response, status) {
        if (status == 'OK') {
            let origins = response.originAddresses;

            for (let i = 0; i < origins.length; i++) {
                let results = response.rows[i].elements;
                for (let j = 0; j < results.length; j++) {
                    let element = results[j];
                    let distance = element.distance.text;
                    console.log(distance)
                    let duration = element.duration.text;
                    console.log(duration)
                }
            }
        }
    }


    return (


        <>
            <article className={classes.display}>
            <div className={classes.qr}>
                <QRCode value={qr}/>
            </div>
                <br/>
                <br/>
            <section className={classes.base} >
                <div className={classes.control}>
                    <p className={classes.success}>De eigenaar is {firstName +" "+ lastName}.
                    Als {firstName} heeft een geldig whatsapp-nummer geüpload,
                        de QR-code brengt je naar een whatsapp-chat {firstName}.
                        Wijs gewoon naar de code met je foto-app op je mobiel.
                    </p>
                    <p>Of bel {firstName} op: {mobileNumber}</p>
                    <div className={classes.photo}>
                        <img src={photoURL} height={300} width={290}/>
                    </div>
                    <p>Er kan ook een e-mail gestuurd worden naar {email}</p>
                </div>
            </section>
            </article>

        </>
    );
};

export default ViewItemOwnerDetails;