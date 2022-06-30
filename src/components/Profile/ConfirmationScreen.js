import React from 'react';
import {useParams} from "react-router-dom";
import classes from "./ProfileForm.module.css";
import laptopworker from "../../assets/pexels-andrea-piacquadio-761993.jpg";

//Here we will use route parameters to access individual participants
//Using "useParams", with "id" as key. Matches the ":id" key from the app component
//Displays the username back to the user in the welcome message to the user

const ConfirmationScreen = () => {

    const { id } = useParams();
    return (
        <>
            <section className={classes.base} >
                <p className={classes.control}>
                    Ready to go {id}!
                    <br/>
                    <br/>
                    Klik op een link om te beginnen
                </p>
            </section>
            <div className={classes.photo}>
                <img src={laptopworker} alt="laptopworker" height={600} width={580}/>
            </div>
        </>


    );
};


export default ConfirmationScreen;