import React, {Fragment} from 'react';
import classes from './ProfileForm.module.css';
import {useParams} from "react-router-dom";
import leafblower from "../../assets/pexels-pixabay-162564.jpg";

//Here we will use route parameters to access individual participants
//Using "useParams", with "id" as key. Matches the ":id" key from the app component
//Displays the username back to the user in the welcome message to the user

const IndividualProfileDetails = () => {

    const { id } = useParams();
    return (
        <>
        <section className={classes.base} >
            <p className={classes.control}>
                Fijn dat he hier bent {id}! Hier kan je gratis spullen lenen en uitlenen.
                <br/>
                <br/>
                Klik op een link om te beginnen
            </p>
        </section>
        <div className={classes.photo}>
            <img src={leafblower} alt="leafblower" height={600} width={580}/>
        </div>
        </>


    );
};

export default IndividualProfileDetails;