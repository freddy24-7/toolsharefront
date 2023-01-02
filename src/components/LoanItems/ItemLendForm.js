import React, {Fragment, useContext, useEffect, useState} from 'react';
import classes from "./Item.module.css";
import {useParams} from "react-router-dom";

import useAxiosGetAllItems from "../../hooks/useAxiosGetAllItems";
import {useForm} from "react-hook-form";
import useFileUpload from "../../hooks/useFileUpload";

const ItemLendForm = ({itemName, setItemName, description, setDescription, isLoading, setIsLoading,
                      itemSubmitHandler, photoURL, setPhotoURL, error, errorCSS}, item) => {

    const {id} = useParams()

    //Getting existing users in database
    //Using custom hook useAxiosCall to get all the participants from the list
    const { items, setItems } = useAxiosGetAllItems ();

    console.log(id)
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

    //Dynamic use of CSS, other styles appear if input is invalid
    const inputClasses = errorCSS
        ? classes.invalid
        : classes.base;

    const { obtainPhotoURL, onSubmit, setObtainPhotoURL } = useFileUpload ();
    //using react hook form for image upload
    const {register, handleSubmit} = useForm();

    //using the useFileUpload custom hook
    const URLChangeHandler = (event) => {
        setObtainPhotoURL(obtainPhotoURL);
        setPhotoURL(obtainPhotoURL)
    }

    return (

        <Fragment>
            <section className={inputClasses}>
                <div >
                    <div >Here you can share your tools!
                            <br/>
                            <br/>
                            Please add a tool that others can borrow
                            <br/>
                            <br/>
                            Please start with adding a photo of the tool.
                            Choose file, press submit, then type any key in the next line (FILE URL)
                        </div>
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
                <div className={classes.success}>
                    <button
                        className={classes.button}
                        onClick={(event) => itemSubmitHandler(event)}
                    >Submit</button>
                    {isLoading && <p >Item has been added! Feel free to add more items. To exit, press one of the links above.</p>}
                </div>
                {/*Terniary statement displaying server error back to user*/}
                </div>
                    {error && <div className={classes.error}> {error} </div>}
                </div>
            </section>

        </Fragment>
    );
}

export default ItemLendForm;