import React, {Fragment, useContext, useEffect, useState} from 'react';
import classes from "./Item.module.css";
import {useParams} from "react-router-dom";

import {useForm} from "react-hook-form";
import useFileUpload from "../../hooks/useFileUpload";
import working from "../../assets/pexels-bidvine-1249611.jpg";
import axios from "axios";

import {GET_SHARE_ITEM_BY_PARTICIPANT_URL, POST_SHARE_ITEM_URL} from "../../backend-urls/constants";

//specifying back-end URL
const apiURL = GET_SHARE_ITEM_BY_PARTICIPANT_URL;

//Obtaining token from local storage to access resource
//Key is specified in LoginForm.js and needs to be consistent
const initialToken = localStorage.getItem('jwt');
console.log(initialToken)

const ItemLendForm = ({itemName, setItemName, description, setDescription, isLoading,
                          itemSubmitHandler, photoURL, handleMyListOfItems,
                          setPhotoURL, error, errorCSS}, item) => {

    const [uploadedItems, setUploadedItems] = useState(null);

    const {id} = useParams()
    const participantId = id;
    console.log(participantId)

    //This code section is made to simplify the JSX in the return statement
    const itemNameInputChangeHandler = (event) => {
        setItemName(event.target.value);
        console.log(itemName)
    }
    const itemDescriptionInputChangeHandler = (event) => {
        setDescription(event.target.value);
        console.log(description)
    }
    const URLChangeHandler = (event) => {
        setObtainPhotoURL(obtainPhotoURL);
        setPhotoURL(obtainPhotoURL)
    }

    //using custom hook for file upload
    const {obtainPhotoURL, onSubmit, setObtainPhotoURL} = useFileUpload();

    //using react hook form for submission
    const {register, handleSubmit} = useForm();

    //Dynamic use of CSS, other styles appear if input is invalid
    const inputClasses = errorCSS
        ? classes.invalid
        : classes.base;

    //displaying successful upload message through a function
    function successMessage() {
        return (
            <div className={classes.animation}>
                Item has been added! Feel free to add more items.
                    Number of items added: <p className={classes.uploaded}>{uploadedItems}</p>
                    Scroll down to see a list of all the items you are lending out.
                    To exit, press one of the links in the toolshare navigation area.
            </div>
        )
    }

    //axios get by id call backend and credentials, using axios
    const getAxios = axios.get(GET_SHARE_ITEM_BY_PARTICIPANT_URL + '/' + id, {
        headers: {
            'Content-Type': 'application/json',
        },
        'credentials': 'include'
    })
    //Runs once, to give the existing data that can be updated
    useEffect(() => {
        getAxios
            .then((response) => {
                console.log(response)
                console.log(response.data.items.length)
                const numberOfItems = response.data.items.length;
                console.log(numberOfItems)
                setUploadedItems(numberOfItems);
            } ).catch(error => {
            console.log(error)
            console.log(error.response.data)
        } )
    });
    console.log(uploadedItems)

    const goToMyListOfItems = (event) => {
        handleMyListOfItems(event);
    }



    return (

        <Fragment>
            <section className={inputClasses}>
                <div>
                    <div >Here you can share your tools!
                            <br/>
                            <br/>
                            Please add a tool that others can borrow
                            <br/>
                            <br/>
                            Please start with adding a photo of the tool.
                            Choose a photo to upload, then press the "pink" submit button,
                        and thereafter type any key in the next line labelled "FILE URL".
                        <br/>
                        <br/>
                        jpg-, jpeg-, and png-files are accepted.
                        </div>
                    <br/>
                    <br/>
                    {/*Terniary statement displaying server error back to user*/}
                    {error && <div className={classes.error}> {error} </div>}

                    {/*Success message displayed on successful upload*/}
                    {isLoading && successMessage()}

                    <div className={classes.photo}>
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <input type="file" {...register("file")} />
                            <input type="submit" className={classes.submit}/>
                        </form>
                    </div>
                        <div className={classes.click}>
                            <div className={classes.control}>
                                <label htmlFor='File URL'>File URL</label>
                                <input
                                    type="url"
                                    placeholder="Click, then type any key to upload"
                                    name="url"
                                    className="form-control"
                                    value={photoURL}
                                    onChange={URLChangeHandler}
                                />
                            </div>
                <div className={classes.control} >
                    <label htmlFor='itemName'>Type of tool</label>
                    <input
                        type="text"
                        placeholder="Please insert the type of tool it is"
                        name="itemName"
                        className="form-control"
                        value={itemName}
                        onChange={itemNameInputChangeHandler}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor='itemDescription'>Tool description</label>
                    <input
                        type="text"
                        placeholder="Please briefly describe what the tool is used for"
                        name="itemDescription"
                        className="form-control"
                        value={description}
                        onChange={itemDescriptionInputChangeHandler}
                    />
                </div>
                <div className={classes.actions}>
                    <button
                        className={classes.button}
                        onClick={(event) => itemSubmitHandler(event)}
                    >Add item to loan out</button>
                    <br/>
                    <br/>
                    <button
                        className={classes.button}
                        onClick={(event) => goToMyListOfItems(event)}
                    >All my items</button>
                        </div>
                    </div>
                </div>
            </section>
            <div className={classes.photo}>
                <img src={working} alt="laptopgirl" height={300} width={320}/>
            </div>
        </Fragment>

);
}

export default ItemLendForm;