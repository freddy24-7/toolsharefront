import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import classes from "./ProfileForm.module.css";
import laptopworker from "../../assets/pexels-andrea-piacquadio-761993.jpg";
import { useForm } from "react-hook-form";
import useFileUpload from "../../hooks/useFileUpload";

//Here we will use route parameters to access individual participants
//Using "useParams", with "id" as key. Matches the ":id" key from the app component
//Displays the username back to the user in the welcome message to the user

const ConfirmationScreen = () => {

    const {id} = useParams();

    //ensure that component loads
    useEffect(() => {
        console.log(id)
    })
    //clean up
    useEffect(() => {
        return () => {
            console.log("clean up")
        }
    } , [id])

    //using react hook form for image upload
    const {register, handleSubmit} = useForm();

    //using the useFileUpload custom hook
    const { obtainPhotoURL, onSubmit, setObtainPhotoURL } = useFileUpload ();

    //Below code block persists uploaded image on refresh
    useEffect(()=> {
        const data = localStorage.getItem('fileURL');
        console.log(data)
        if (data !== null) {
            setObtainPhotoURL(JSON.parse(data))
        }
    },[]);
    console.log(obtainPhotoURL)
    useEffect(()=> {
        localStorage.setItem('fileURL', JSON.stringify(obtainPhotoURL))
    },[obtainPhotoURL]);

    //conditional render: if there is a photoURL, the photo is displayed
    //if not, a default photo is displayed that the user can replace

    if (obtainPhotoURL) {

        return (
            <>
                <section className={classes.base} >
                    <div className={classes.control}>
                        <p className={classes.success}>Ready to go {id}!</p>
                        <br/>
                        <br/>
                        <p>Klik op een link om te beginnen. </p>
                        <p>U kunt ook een photo file van jezelf kiezen</p>
                        <p>om de foto hieronder te vervangen</p>
                    </div>
                </section>
                <div className={classes.photo}>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <input type="file" {...register("file")} />
                        <input type="submit" className={classes.submit}/>
                    </form>
                    <div>
                        <img src={obtainPhotoURL} alt="Your image" height={600} width={580}/>
                    </div>
                </div>
            </>
        );
    } else {

        return (
        <>
            <section className={classes.base} >
                <div className={classes.control}>
                    <p className={classes.success}>Ready to go {id}!</p>
                    <br/>
                    <br/>
                    <p>Klik op een link om te beginnen. </p>
                    <p>U kunt ook een photo file van jezelf kiezen</p>
                    <p>om de foto hieronder te vervangen</p>
                </div>
            </section>
            <div className={classes.photo}>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <input type="file" {...register("file")} />
                    <input type="submit" className={classes.submit}/>
                </form>
                <div>
                    <img src={obtainPhotoURL} alt="Your image" height={600} width={580}/>
                </div>
            </div>
            <div className={classes.photo}>
                <img src={laptopworker} alt="laptopworker" height={600} width={580}/>
            </div>

        </>
    );
    }
};


export default ConfirmationScreen;