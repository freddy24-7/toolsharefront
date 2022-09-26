import React, {useState} from 'react';
import {FILE_UPLOAD_URL} from "../backend-urls/constants";

//Below we are defining a custom hook and returning the variable values
//These can then be re-used in other components

const UseFileUpload = () => {
    //state variable for downloading the file
    const [obtainPhotoURL, setObtainPhotoURL] = useState('');

    //setting up variables for the onSubmit function
    let downloadUrl;
    let obtainPhoto;

    const onSubmit = async (data, event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("file", data.file[0]);
        console.log(formData)

        //using fetchAPI to post the file
        const result = await fetch(FILE_UPLOAD_URL, {
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
        obtainPhoto = await fetch(downloadUrl, {
            method: "GET"
        });
        //updating the state
        setObtainPhotoURL(obtainPhoto.url);

    };
    return { obtainPhotoURL, setObtainPhotoURL, onSubmit }

};

export default UseFileUpload;