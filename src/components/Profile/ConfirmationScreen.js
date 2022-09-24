import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import classes from "./ProfileForm.module.css";
import laptopworker from "../../assets/pexels-andrea-piacquadio-761993.jpg";
import { useForm } from "react-hook-form";


//Here we will use route parameters to access individual participants
//Using "useParams", with "id" as key. Matches the ":id" key from the app component
//Displays the username back to the user in the welcome message to the user

const ConfirmationScreen = () => {

    const { id } = useParams();

    // //ensure that component loads
    // useEffect(() => {
    //     console.log(id)
    // })
    // //clean up
    // useEffect(() => {
    //     return () => {
    //         console.log("clean up")
    //     }
    // } , [id])

    //using react hook form for image upload
    const { register, handleSubmit } = useForm();

    //state variable for downloading the file
    const [obtainPhotoURL, setObtainPhotoURL] = useState('');

    //setting up variables
    let baseUrl = "http://localhost:8080/api/imagefile/upload";
    let downloadUrl;
    let obtainPhoto;

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("file", data.file[0]);
        console.log(formData)

        //using fetchAPI to post the file
        const result = await fetch(baseUrl, {
            method: "POST",
            body: formData,
        }).then((result) => result.json());

        console.log(result)
        //server sends back the url to be used for downloading the image
        console.log(result.downloadURL)
        //storing the download-url in a variable
        downloadUrl = result.downloadURL;
        console.log(downloadUrl)

        //using fetchAPI to obtain the file
        obtainPhoto = await fetch(downloadUrl,{
            method: "GET"
        });
        //updating the state
        setObtainPhotoURL(obtainPhoto.url);
    };
    //as the state is updated, we now have access to the download-image data
    console.log(obtainPhotoURL)

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
};


export default ConfirmationScreen;