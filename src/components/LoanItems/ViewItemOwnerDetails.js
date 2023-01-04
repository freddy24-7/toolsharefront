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

//specifying back-end URL
const apiURL = PARTICIPANT_URL;


//Obtaining token from local storage to access resource
//Key is specified in LoginForm.js and needs to be consistent
const initialToken = localStorage.getItem('jwt');
console.log(initialToken)

const ViewItemOwnerDetails = () => {

    const {ownerId} = useParams()

    //These variables pertain to the owner of an item
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [postcode, setPostcode] = useState('')
    const [photoURL, setPhotoURL] = useState('')

    //userId variable. Will be used to identify the participant trying to get in touch in with an owner
    const [idValue, setIdValue] = useState([]);

    //Below block obtains the stored userid
    const [currentLoggedInId, setCurrentLoggedInId] = useState(() => {
        // getting stored value
        const currentId = localStorage.getItem("userId");
        setIdValue(JSON.parse(currentId));
    });

    //Variables used to work with google distance matrix api, to obtain the cycle distance between an owner and a participant
    //interested in an borrowing an item.
    const [bikeDistance, setBikeDistance] = useState("");
    const [bikeTime, setBikeTime] = useState("");

    //Participant postcode: this allows that we set the participant postcode later in the code
    //so that the distance matrix can do its job
    const [participantPostcode, setParticipantPostcode] = useState([]);

    //axios get by id call backend and credentials, using axios (to identify owner)
    const getAxios = axios.get(apiURL + '/' + ownerId, {
        headers: {
            'Content-Type': 'application/json',
        },
        'credentials': 'include'
    })

    //Using the below code-block to find the participant-id. Cannot use useParams for that here as
    //use-Param is already managing a different id-variable
    useEffect(() => {
        ParticipantService.getAllParticipants().then((response) => {
            console.log(response.data)
            const participants = response.data;
            console.log(participants);
            console.log(idValue)
            for (let i = 0; i < participants.length; i++)
                if (participants[i].user.id == idValue) {
                    console.log("exists")
                    console.log(participants[i])
                    const currentLoggedInParticipant = participants[i]
                    console.log(currentLoggedInParticipant.postcode);
                    const currentLoggedInParticipantPostcode = currentLoggedInParticipant.postcode;
                    console.log(currentLoggedInParticipantPostcode)
                    setParticipantPostcode(currentLoggedInParticipantPostcode)
                } else {
                    console.log("an unexpected error occurred")
                }
        }).catch(error => {
            console.log(error)
        })

    },[]);

    //This block runs once, to give the existing owner-data that can be updated
    useEffect(() => {
        getAxios
            .then((response) => {
                console.log(response)
                setFirstName(response.data.firstName)
                setLastName(response.data.lastName)
                setEmail(response.data.email)
                setMobileNumber(response.data.mobileNumber)
                setPostcode(response.data.postcode)
                console.log(postcode)
                setPhotoURL(response.data.photoURL)
            } ).catch(error => {
            console.log(error)
            console.log(error.response.data)
        } )
    } , [])

    //Here we are adding qr-codes and manipulating mobile numbers using the slice-method so that we can generate a qr-code that
    //can take a participant to the whatsapp number of an owner through a qr-code
    const [qr, setQr] = useState('')
    console.log(mobileNumber)
    const mobileWithoutFirstZero = mobileNumber.slice(1)
    console.log(mobileWithoutFirstZero)
    const whatsAppAPIAndNumber = WHATSAPP_API + mobileWithoutFirstZero;
    console.log(whatsAppAPIAndNumber)

    //setting the qr code - gets updated for every re-render
    useEffect(()=> {
        setQr(whatsAppAPIAndNumber)
    })
    console.log(qr)

    //Getting the API and API key, and adding language as per documentation to get the output in Dutch
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ['places'],
        language: ['nl'],
    })

    //Using the google resource that we have imported from chakra
    if (!isLoaded) {
        return <SkeletonText />
    }

    //Defining the two postcodes needed to measure distance. "Origin" in is the participant postcode,
    // "destination" is the owner-postcode
    let origin = participantPostcode;
    let destination = postcode;
    console.log(origin)
    console.log(destination)


    //Specifying the resources needed from the google distance matrix api. Only using the resources needed for this specific
    //application

    let service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
        {
            origins: [origin],
            destinations: [destination],
            travelMode: 'BICYCLING',
        }, callback);

    //For loop to determine distance and duration using google maps resources
    function callback(response, status) {
        if (status == 'OK') {
            let origins = response.originAddresses;
            for (let i = 0; i < origins.length; i++) {
                let results = response.rows[i].elements;
                for (let j = 0; j < results.length; j++) {
                    let element = results[j];
                    let distance = element.distance.text;
                    console.log(distance)
                    setBikeDistance(distance)
                    let duration = element.duration.text;
                    setBikeTime(duration)
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
                    Als {firstName} een geldig whatsapp-nummer heeft geüpload,
                        dan brengt de QR-code je naar een whatsapp-chat met {firstName}.
                        Wijs gewoon naar de code met je foto-app op je mobiel.
                    </p>
                    <p>Of bel {firstName} op: {mobileNumber}</p>
                    <div className={classes.photo}>
                        <img src={photoURL} height={300} width={290}/>
                    </div>
                    <p className={classes.cycle}>Maak er straks een leuk fietstocht van. U woont op {bikeDistance} afstand
                       van de eigenaar. Dat is {bikeTime} op de fiets.</p>
                    <p>Er kan ook een e-mail gestuurd worden naar {email}</p>
                </div>
            </section>
            </article>

        </>
    );
};

export default ViewItemOwnerDetails;