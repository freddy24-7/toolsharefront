import React, {Fragment, useEffect, useState} from 'react';
import classes from './ProfileForm.module.css';
import {useHistory, useParams} from "react-router-dom";
import leafblower from "../../assets/pexels-pixabay-162564.jpg";
import ParticipantService from "../../services/ParticipantService";

//Here we will use route parameters to access individual participants
//Using "useParams", with "id" as key. Matches the ":id" key from the app component
//Displays the username back to the user in the welcome message to the user

const IndividualDetails = ({setFormS, firstName, setFirstName, lastName, setLastName, email,
                               setEmail, mobileNumber, setMobileNumber}) => {

    const { id } = useParams()

    const history = useHistory();

    const participant = {id, firstName, lastName, email, mobileNumber};

    console.log(id)
    console.log(firstName)
    console.log(lastName)
    console.log(email)
    console.log(mobileNumber)
    console.log(participant)

    if (id) {
        ParticipantService.updateParticipant(id, participant).then((response) => {
            console.log(response)
            // history.push(`/participant/${response.data.firstName}`)
        }).catch(error => {
            console.log(error)
            console.log(error.response.data)

        })

    }
    useEffect(() => {

        ParticipantService.getParticipantById(id).then((response) =>{
            console.log(response.data)
            // setFirstName(response.data.firstName)
            // setLastName(response.data.lastName)
            // setEmail(response.data.email)
        }).catch(error => {
            console.log(error)
            console.log(error.response.data)
        })
    },[]);


    return (
        <>
        <section className={classes.base} >
            <div>
                <h2>Welcome {id}</h2>
            </div>


        </section>
        <div className={classes.photo}>
            <img src={leafblower} alt="leafblower" height={600} width={580}/>
        </div>
        </>


    );
};

export default IndividualDetails;