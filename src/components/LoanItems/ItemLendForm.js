import React, {Fragment, useContext, useState} from 'react';
import AuthContext from "../../context/auth-context";
import classes from "./Item.module.css";
import {useParams} from "react-router-dom";
import {POST_SHARE_ITEM_URL} from "../../backend-urls/constants";
import axios from "axios";

const ItemLendForm = () => {

    const {id} = useParams()

    console.log(id)
    const participantId = id;
    console.log(participantId)

    //Defining the variables for uploading new item
    const [itemName, setItemName] = useState('')
    const [description, setDescription] = useState('')

    //Creating the variable that will be used to send data to backend
    const loanItem = { participantId, itemName, description }

    //Error-handling
    const [error, setError] = useState(null);
    //Constant for dynamic CSS display
    const [errorCSS, setErrorCSS] = useState(false);

    //Using useContext to manage the login-state
    const [formS, setFormS]= useState(false);

    const itemSubmitter = POST_SHARE_ITEM_URL + "/" + participantId;
    console.log(itemSubmitter)

    //Below is the axios call to the participant class in backend
    const submitHandler = (event) => {
        event.preventDefault();
        axios.post(itemSubmitter, loanItem)
            .then((response) => {
                //Checking in console what data we obtain
                console.log(response)
                const itemName = (response.data.itemName)
                const description = (response.data.description)
                // console.log(id)
                console.log(itemName)
                console.log(description)

                setFormS(true)
                setItemName("");
                setDescription("");

            }).catch(function (error) {

            if (error.response) {
                // Request made and server responded
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                const errorCheck = (error.response.status)
                //setting the error
                if (errorCheck === 500) {
                    setError("An error has occurred. " )
                    setErrorCSS(true)
                } else if (errorCheck === 403) {
                    setError("The server has declined the request. " +
                        "A likely reason is that another participant is already " +
                        " logged in to the server from the device that you are using. " +
                        "You may try to reload the page and submit again.")
                    setErrorCSS(true)
                }
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        });
    }

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

    return (

        <Fragment>
            <section className={inputClasses}>
                <div>
                    <div>Here you can share your tools!
                            <br/>
                            <br/>
                            Please add a tool that others can borrow
                            <br/>
                            <br/>
                            Please start with adding a photo of the tool.
                            Choose file, press submit, then type any key in the next line (FILE URL)
                        </div>
                <div className={classes.control}>
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
                        onClick={(event) => submitHandler(event)}
                    >Submit</button>
                </div>
                {/*Terniary statement displaying server error back to user*/}
                {error && <div className={classes.error}> {error} </div>}
                </div>

            </section>

        </Fragment>
    );
}

export default ItemLendForm;