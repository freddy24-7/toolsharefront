import React, {Fragment, useEffect, useState} from 'react';
import classes from "./Item.module.css";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";

import {
    EXPRESS_INTEREST_GET_OWNER_DETAILS_URL,
    GET_SHARE_ITEM_BY_ITEM_ID_URL, GET_SHARE_ITEM_BY_PARTICIPANT_URL
} from "../../backend-urls/constants";

import useAxiosCall from "../../hooks/useAxiosCall";
import useAxiosGetAllItems from "../../hooks/useAxiosGetAllItems";
import working from "../../assets/pexels-bidvine-1249611.jpg";
import useBackButtons from "../../hooks/useBackButtons";
import ParticipantService from "../../services/ParticipantService";

//specifying back-end URL
const apiURL = GET_SHARE_ITEM_BY_ITEM_ID_URL;
const getOwnerAPI = EXPRESS_INTEREST_GET_OWNER_DETAILS_URL

//Obtaining token from local storage to access resource
//Key is specified in LoginForm.js and needs to be consistent
const initialToken = localStorage.getItem('jwt');
console.log(initialToken)

const ItemLoanAction = ( {handleOwnerDetailViewedItems, ownerDetailsClickHandler, ownerId, setOwnerId} ) => {

    const history = useHistory();

    //Getting itemId from params and logging it to console for check
    //We later need to find the owner of this particular item
    const {itemId} = useParams()
    console.log(itemId)

    //Defining the variables for participant
    const [participantId, setParticipantId] = useState('')
    const [itemName, setItemName] = useState('')
    const [description, setDescription] = useState('')
    const [photoURL, setPhotoURL] = useState('')

    //Setting the state used to launch Owner Details component on click
    // const[ownerDetailsClicked, setOwnerDetailsClicked]= useState(false);

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

    const [idValue, setIdValue] = useState([]);

    //The below code may look redundant but is not. Using "itemId" directly in the
    // "owner-find"-function below confuses the compiler
    const transferValue = itemId
    console.log(transferValue)

    //the below code block was tricky and took days to figure out, this is a nested array of objects and to find the owner of a particular
    //itemId was the trickiest part of this application. The "Array.isArray"-method solved this, as all the filter-, find- and
    //map methods did not work for this more complex array structure
    const owner = participants.find(({items}) => Array.isArray(items) && items.find(({itemId}) => itemId == transferValue))
    console.log(owner)
    // Destructuring object to get the id of the owner;
    const ownerOfItem = owner?.id;
    setOwnerId(ownerOfItem);

    console.log(ownerId);

    //Persist ownerId
    useEffect(()=> {
        const data = localStorage.getItem('ownerId');
        if (data) {
            setOwnerId(JSON.parse(data))
        }
    },[]);

    useEffect(() => {
        localStorage.setItem("ownerId", JSON.stringify(ownerId));
    });

    console.log(ownerId)



    //Below block obtains the stored userid
    const [currentLoggedInId, setCurrentLoggedInId] = useState(() => {
        // getting stored value
        const currentId = localStorage.getItem("userId");
        setIdValue(JSON.parse(currentId));
    });
    console.log(idValue);
    console.log(currentLoggedInId)

    const [id, setId] = useState([]);

    //Getting existing users in database
    useEffect(() => {
        ParticipantService.getAllParticipants().then((response) => {
            console.log(response.data)
            setParticipants(response.data);
            const participants = response.data;
            console.log(participants);
            console.log(idValue)
            for (let i = 0; i < participants.length; i++)
                if (participants[i].user.id == idValue) {
                    console.log("exists")
                    console.log(participants[i])
                    const currentLoggedInParticipant = participants[i]
                    console.log(currentLoggedInParticipant.id);
                    const currentLoggedInParticipantId = currentLoggedInParticipant.id;
                    console.log(currentLoggedInParticipantId)
                    setId(currentLoggedInParticipantId);
                } else {
                    console.log("this user is not a participant yet")
                }
        }).catch(error => {
            console.log(error)
        })

    },[]);
    console.log(id)

    const getOwnerAPI = EXPRESS_INTEREST_GET_OWNER_DETAILS_URL

    //Modifying URL to check by id
    const itemSubmitter = getOwnerAPI + "/" + id;
    console.log(itemSubmitter)



    //Modifying URL to check by id
    const ownerDetailsSubmitter = getOwnerAPI + "/" + id;
    console.log(ownerDetailsSubmitter)

    //Obtaining token from local storage to access resource
    //Key is specified in LoginForm.js and needs to be consistent
    const initialToken = localStorage.getItem('jwt');
    console.log(initialToken)

    const authAxios = axios.create(
        {
            baseURL: getOwnerAPI,
            headers: {
                Authorization: `Bearer ${initialToken}`
            }
        }
    )

    //Creating the variable that will be used to send data to backend
    const loanItemId = {itemId}
    console.log(ownerId)

    const ownerDetailsSubmitHandler = (event) => {
        event.preventDefault();
        authAxios.post(ownerDetailsSubmitter, loanItemId)
            .then((response) => {
                //Checking in console what data we obtain
                console.log(response)
                // const itemId = response.data.itemId
                setOwnerId(ownerId)
                console.log(ownerId)
                history.push(`/item-owner/${ownerId}`)
            }).catch(error => {
            //checking error response stats
            console.log(error.response.status);
            //storing it in a variable
            const errorCheck = (error.response.status)
            console.log(errorCheck);

        });
    };

    const ownerDetailViewedItems= (event) => {
        handleOwnerDetailViewedItems(event);
    }

    const ownerDetailsClicked = (event) => {
        ownerDetailsClickHandler(event)
    }




    return (

        <Fragment>
            <section className={classes.base} >
                <div className={classes.control}>
                    <p className={classes.success}>You have indicated interest in a {itemName}</p>
                    <p className={classes.success}>This is a {description}. </p>
                    <p>A photo of the actual object is here:</p>
                </div>
            </section>
            <div className={classes.photo}>
                <img src={photoURL} height={300} width={290}/>
            </div>
            <section className={classes.base} >
                <div className={classes.click}>
                    <div className={classes.actions}>
                        <button
                            className={classes.button}
                            onClick={(event) => ownerDetailsClicked(event)}
                            onChange={(event) => ownerDetailsSubmitHandler(event)}
                        >Click here to get in touch with owner</button>
                        <br/>
                        <br/>
                        <button
                            className={classes.button}
                            onClick={(event) => ownerDetailViewedItems(event)}
                        >All items you have checked out earlier are listed here</button>
                    </div>
                </div>
            </section>
        </Fragment>

    );
}

export default ItemLoanAction;