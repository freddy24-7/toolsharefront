import React, {useEffect, useState} from 'react';
import classes from "./Item.module.css";
import {useParams} from "react-router-dom";
import axios from "axios";

import {GET_SHARE_ITEM_BY_ITEM_ID_URL} from "../../backend-urls/constants";
import useAxiosCall from "../../hooks/useAxiosCall";
import useAxiosGetAllItems from "../../hooks/useAxiosGetAllItems";

//specifying back-end URL
const apiURL = GET_SHARE_ITEM_BY_ITEM_ID_URL;

//Obtaining token from local storage to access resource
//Key is specified in LoginForm.js and needs to be consistent
const initialToken = localStorage.getItem('jwt');
console.log(initialToken)

const ItemLoanAction = () => {

    //Getting itemId from params and logging it to console for check
    //We later need to find the owner of this particular item
    const {itemId} = useParams()
    console.log(itemId)

    //Defining the variables for participant
    const [itemName, setItemName] = useState('')
    const [description, setDescription] = useState('')
    const [photoURL, setPhotoURL] = useState('')

    //axios get by id call backend and credentials, using axios
    const getAxios = axios.get(apiURL + '/' + itemId, {
        headers: {
            'Content-Type': 'application/json',
        },
        'credentials': 'include'
    })

    //Runs once, to give the existing data
    useEffect(() => {
        getAxios
            .then((response) => {
                console.log(response)
                const itemName = (response.data.itemName)
                const description = (response.data.description)
                const photoURL = (response.data.photoURL)
                setItemName(itemName)
                setDescription(description)
                setPhotoURL(photoURL)
            }).catch(error => {
            console.log(error)
            console.log(error.response.data)
        })
    }, [])

    //Using custom hook useAxiosCall to get all the participants from the list
    const {participants, setParticipants} = useAxiosCall();

    //The below code may look redundant but is not. Using "itemId" directly in the
    // "owner-find"-function below confuses the compiler
    const transferValue = itemId
    console.log(transferValue)

    //the below code block was tricky and took days to figure out, this is a nested array of objects and to find the owner of a particular
    //itemId was the trickiest part of this application. The "Array.isArray"-method solved this, as all the filter-, find- and
    //map methods did not work for this more complex array structure
    const owner = participants.find(({items}) => Array.isArray(items) && items.find(({itemId}) => itemId == transferValue))
    console.log(owner)
    // Destructuring to get the id of the owner;
    const idOfOwner = owner?.id;
    console.log(idOfOwner);


    return (

        <section>
            <section className={classes.base} >
                <div className={classes.control}>
                    <p className={classes.success}>You have indicated interest in a {itemName}</p>
                </div>
            </section>
            <div className={classes.photo}>
                <img src={photoURL} height={300} width={290}/>
            </div>
            <section className={classes.base} >
                <div className={classes.control}>
                    <p className={classes.success}>You have indicated interest in a {itemName}</p>
                </div>
            </section>

        </section>
    );
};

export default ItemLoanAction;